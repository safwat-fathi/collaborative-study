import React, { useEffect, useState, useContext, useRef } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import draw from "../../utils/draw";

import style from "./Whiteboard.module.css";

import { RoomContext } from "../../context";

const Whiteboard = () => {
  const roomCTX = useContext(RoomContext);

  const client = roomCTX.webSocketClient;

  const canvas = useRef(null);
  const colorPicker = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [ctx, setCtx] = useState(null);
  const [room, setRoom] = useState("");
  const [color, setColor] = useState("");
  const [drawingDataFromWS, setDrawingDataFromWS] = useState(null);

  useEffect(() => {
    setCtx(canvas.current.getContext("2d"));
    setRoom(roomCTX.currentRoom);
  }, []);

  useEffect(() => {
    client.onmessage = (e) => {
      let data = JSON.parse(e.data);
      const { type, payload } = data;

      try {
        if (type === "drawing") {
          setDrawingDataFromWS(payload);

          // now we can draw with the coordinations sent by websocket :)
          if (drawingDataFromWS === null) {
            console.log(`drawingDataFromWS: ${drawingDataFromWS}`);
          }
          draw(
            ctx,
            drawingDataFromWS.x0,
            drawingDataFromWS.y0,
            drawingDataFromWS.x1,
            drawingDataFromWS.y1,
            drawingDataFromWS.color
          );
        }
        return;
      } catch (err) {
        console.log(err);
      }
    };
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
    draw(ctx, x, y, offsetX, offsetY, color, room, client, true);
  };

  /* 
	/////////////////
	mouseMoveHandler
	/////////////////
	*/
  const mouseMoveHandler = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (!drawing) return;

    draw(ctx, x, y, offsetX, offsetY, color, room, client, true);

    setX(offsetX);
    setY(offsetY);
  };

  // color picker change handler
  const handleColorChange = ({ nativeEvent }) => {
    setColor(nativeEvent.target.value);
  };

  // console.log(roomCTX);

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
    </div>
  );
};

export default Whiteboard;
