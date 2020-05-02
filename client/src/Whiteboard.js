import React, { useRef, useState, useEffect } from "react";
import socketIO from "socket.io-client";

import draw from "./utils/draw";

import "./Whiteboard.css";

const endpoint = "http://localhost:4000";

function WhitBoard() {
  const canvas = useRef();

  useEffect(() => {
    setCtx(canvas.current.getContext("2d"));
  });

  const socket = socketIO(endpoint);

  const [drawing, setDrawing] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [ctx, setCtx] = useState(null);

  const mouseDownHandler = (e) => {
    setDrawing(true);

    setX(e.nativeEvent.offsetX);
    setY(e.nativeEvent.offsetY);
  };

  const mouseUpHandler = (e) => {
    if (!drawing) return;

    setDrawing(false);

    draw(ctx, x, y, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const mouseMoveHandler = (e) => {
    if (!drawing) return;

    draw(ctx, x, y, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setX(e.nativeEvent.offsetX);
    setY(e.nativeEvent.offsetY);
  };

  return (
    <canvas
      width="600"
      height="400"
      ref={canvas}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseOut={mouseUpHandler}
      onMouseMove={mouseMoveHandler}
    ></canvas>
  );
}

export default WhitBoard;
