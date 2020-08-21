import React, {
  Component,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";

import FileUpload from "../FileUpload";
import TextModel from "./TextModel";

import draw, { writeText } from "../../utils/draw";
import axios from "axios";
import erase from "../../utils/erase";

// styles & images
import "./Whiteboard.css";
import plateColor from "./plateColor.svg";
import undoIcon from "./undoIcon.svg";
import pencil from "./pencil.svg";
import eraserIcon from "./eraser.svg";
import eraserImg from "./eraser.png";
import brushImg from "./brush.png";
import saveIcon from "./saveIcon.png";

// context
import { RoomContext } from "../../context";

const Whiteboard = () => {
  const roomCTX = useContext(RoomContext);

  const {
    currentRoom,
    webSocketClient,
    ctx,
    setCtx,
    drawing,
    setDrawing,
    erasing,
    setErasing,
    x,
    setX,
    y,
    setY,
    color,
    setColor,
  } = roomCTX;

  // refs
  const canvas = useRef(null);
  const colorPicker = useRef(null);
  const btnUndo = useRef(null);

  // for text model
  const [isModal, setIsModal] = useState(false);
  // for undo or redo history
  const [lastDrawings, setLastDrawings] = useState([]);
  const [storedDrawings, setStoredDrawings] = useState([]);
  // drawing or erasing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  // set width & height canves
  const [width, setWidth] = useState(false);
  const [height, setheight] = useState(false);
  // file upload state
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setCtx(canvas.current.getContext("2d"));
  }, []);

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth - 280);
    setheight(window.innerHeight - 65);
  };

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  /* 
	/////////////////
	mouseDownHandler
	/////////////////
	*/
  const mouseDownHandler = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setX(offsetX);
    setY(offsetY);

    if (isErasing) {
      setErasing(true);
    } else if (isDrawing) {
      setDrawing(true);
    }
  };

  /* 
	/////////////////
	mouseUpHandler
	/////////////////
	*/
  const mouseUpHandler = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (isDrawing && drawing) {
      setDrawing(false);
      draw(
        ctx,
        x,
        y,
        offsetX,
        offsetY,
        color,
        currentRoom,
        webSocketClient,
        true
      );

      setStoredDrawings([...storedDrawings, lastDrawings]);
      return;
    }

    if (isErasing && erasing) {
      setErasing(false);
      return;
    }
  };

  /* 
	/////////////////
	mouseMoveHandler
	/////////////////
	*/
  const mouseMoveHandler = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (isDrawing && drawing) {
      draw(
        ctx,
        x,
        y,
        offsetX,
        offsetY,
        color,
        currentRoom,
        webSocketClient,
        true
      );

      setX(offsetX);
      setY(offsetY);

      setLastDrawings([
        ...lastDrawings,
        { x0: x, y0: y, x1: offsetX, y1: offsetY },
      ]);
    }

    if (isErasing && erasing) {
      erase(ctx, offsetX, offsetY, currentRoom, webSocketClient, true);
    }

    return;
  };

  /* 
	/////////////////
	color picker change handler
	/////////////////
	*/
  const handleColorChange = ({ nativeEvent }) => {
    setColor(nativeEvent.target.value);
  };

  /* 
	/////////////////
	undo handler
	/////////////////
	*/
  const handleUndo = (e) => {
    e.preventDefault();

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

    if (!storedDrawings.length) {
      return;
    }

    console.log("undo");

    console.log("lastDrawings", lastDrawings);
    console.log("storedDrawings before", storedDrawings);

    setStoredDrawings(storedDrawings.slice(0, -1));

    console.log(storedDrawings.length);

    for (let i = 0; i < storedDrawings.length; i++) {
      for (let j = 0; j < storedDrawings[i].length; j++) {
        draw(
          ctx,
          storedDrawings[i][j].x0,
          storedDrawings[i][j].y0,
          storedDrawings[i][j].x1,
          storedDrawings[i][j].y1,
          color,
          currentRoom,
          webSocketClient,
          true,
          canvas,
          true
        );
      }
    }
    console.log("storedDrawings after", storedDrawings);
  };

  const handleWriteText = (x, y, text) => {
    writeText(
      ctx,
      text,
      x * 2,
      y * 2,
      color,
      currentRoom,
      webSocketClient,
      true
    );
  };

  const handlePen = (e) => {
    e.preventDefault();

    canvas.current.style.cursor = `crosshair`;

    setIsDrawing(true);
    setIsErasing(false);
    setLastDrawings([]);
  };

  // eraser logic
  const handleEraser = (e) => {
    e.preventDefault();

    canvas.current.style.cursor = `url(${eraserImg}) 1 10, auto`;

    setIsErasing(true);
    setIsDrawing(false);
  };

  // saving button
  const handleSave = (e) => {
    e.preventDefault();

    const image = canvas.current
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    console.log(image);
    window.location.href = image;
  };

  return (
    <div className="whiteboard">
      <TextModel
        clicked={handleWriteText}
        isVisible={isModal}
        title="write equation"
        onClose={() => setIsModal(false)}
      />
      <canvas
        className="canvas"
        width={width}
        height={height}
        ref={canvas}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseOut={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
      ></canvas>
      <ul className="tools">
        <li className="tools_item">
          <div className="tools_item-button" title="Color">
            <img src={plateColor} alt="Color" />
            <input
              className="plate-color"
              onChange={handleColorChange}
              ref={colorPicker}
              type="color"
            />
            <div
              className="packed__color"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </li>
        <li className="tools_item" title="Undo">
          <img
            src={undoIcon}
            alt="undoIcon"
            onClick={handleUndo}
            ref={btnUndo}
          />
        </li>
        <li className="tools_item" title="Write text">
          <button
            onClick={() => {
              setIsModal(true);
            }}
          >
            A-a
          </button>
        </li>
        <li className="tools_item" title="Eraser">
          <img src={eraserIcon} alt="Eraser" onClick={handleEraser} />
        </li>
        <li className="tools_item" title="Draw">
          <img src={brushImg} alt="pencil" onClick={handlePen} />
        </li>
        <li className="tools_item" title="Save Board">
          <img src={saveIcon} alt="saveicon" onClick={handleSave} />
        </li>
      </ul>

      <div className="upload" title="upload file on Board">
        <FileUpload />
      </div>
    </div>
  );
};

export default Whiteboard;
