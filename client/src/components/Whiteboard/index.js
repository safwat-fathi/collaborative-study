import React, { useEffect, useState, useContext, useRef } from "react";
import draw from "../../utils/draw";

import "./Whiteboard.css";

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

    setDrawing(true);
    setX(offsetX);
    setY(offsetY);
    setLastDrawings([]);
  };

  /* 
	/////////////////
	mouseUpHandler
	/////////////////
	*/
  const mouseUpHandler = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (!drawing) return;

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
  };

  /* 
	/////////////////
	mouseMoveHandler
	/////////////////
	*/
  const mouseMoveHandler = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (!drawing) return;

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
    </div>
  );
};

export default Whiteboard;
