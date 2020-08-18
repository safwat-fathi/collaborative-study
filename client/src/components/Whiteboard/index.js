import React, { useEffect, useState, useContext, useRef } from "react";
import draw from "../../utils/draw";
import erase from "../../utils/erase";

import "./Whiteboard.css";
import eraserImg from "./eraser.png";
import brushImg from "./brush.png";

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

  // for undo or redo history
  const [lastDrawings, setLastDrawings] = useState([]);
  const [storedDrawings, setStoredDrawings] = useState([]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    setCtx(canvas.current.getContext("2d"));
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
  const handleUndo = () => {
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

  // pen logic
  const handlePen = (e) => {
    e.preventDefault();

    canvas.current.style.cursor = `url(${brushImg}) 1 10, auto`;

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
    <div>
      <canvas
        className="canvas"
        width="600"
        height="400"
        ref={canvas}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseOut={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
      ></canvas>
      <input onChange={handleColorChange} ref={colorPicker} type="color" />
      <button onClick={handleUndo} ref={btnUndo}>
        undo
      </button>
      <button onClick={handleEraser} ref={btnUndo}>
        erase
      </button>
      <button onClick={handlePen} ref={btnUndo}>
        pen
      </button>
      <button onClick={handleSave} ref={btnUndo}>
        save
      </button>
    </div>
  );
};

export default Whiteboard;
