import React, { useEffect, useState, useContext, useRef } from "react";
import draw from "../../utils/draw";

import style from "./Whiteboard.module.css";

import { RoomContext } from "../../context";

const Whiteboard = () => {
  const roomCTX = useContext(RoomContext);

  const { currentRoom, webSocketClient } = roomCTX;

  // refs
  const canvas = useRef(null);
  const colorPicker = useRef(null);
  const btnUndo = useRef(null);

  // state
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [color, setColor] = useState("");
  const [drawingDataFromWS, setDrawingDataFromWS] = useState(null);
  const [room, setRoom] = useState("");
  // const [pathStart, setPathStart] = useState(null);
  // const [pathEnd, setPathEnd] = useState(null);

  // for undo or redo history
  const [lastDrawings, setLastDrawings] = useState([]);
  const [storedDrawings, setStoredDrawings] = useState([]);

  useEffect(() => {
    setCtx(canvas.current.getContext("2d"));
  }, []);

  useEffect(() => {
    setRoom(currentRoom);
  });

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
    draw(ctx, x, y, offsetX, offsetY, color, room, webSocketClient, true);

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

    draw(ctx, x, y, offsetX, offsetY, color, room, webSocketClient, true);

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
          room,
          webSocketClient,
          true,
          canvas,
          true
        );
      }
    }
    console.log("storedDrawings after", storedDrawings);
  };

  /* 
	//////////////////////////////
	sending data through websocket
	//////////////////////////////
	*/
  webSocketClient.onmessage = (e) => {
    let data = JSON.parse(e.data);
    const { type, payload } = data;

    try {
      if (type === "drawing") {
        setDrawingDataFromWS(payload);
        // now we can draw with the coordinations sent by websocket :)
        const { x0, y0, x1, y1, color } = drawingDataFromWS;
        draw(ctx, x0, y0, x1, y1, color);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <canvas
        className={style.canvas}
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
