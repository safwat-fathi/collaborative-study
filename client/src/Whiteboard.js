import React, { useRef, useState, useEffect } from "react";
import socketIO from "socket.io-client";

import draw from "./utils/draw";

import "./Whiteboard.css";

const endpoint = "http://localhost:4000";

function Whiteboard() {
  const canvas = useRef();

  useEffect(() => {
    // @ts-ignore
    setCtx(canvas.current.getContext("2d"));
  }, []);

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

    draw(ctx, x, y, e.nativeEvent.offsetX, e.nativeEvent.offsetY, socket, true);
  };

  const onMouseMove = (e) => {
    if (!drawing) return;

    draw(ctx, x, y, e.nativeEvent.offsetX, e.nativeEvent.offsetY, socket, true);
    setX(e.nativeEvent.offsetX);
    setY(e.nativeEvent.offsetY);
  };

  let enableCall = true;
  console.log(enableCall);

  const throttleMouseMove = (e) => {
    if (!enableCall) return;

    enableCall = false;

    onMouseMove(e);
    setTimeout(() => (enableCall = true), 1000);
    console.log(enableCall);
  };

  // const throttle = () => {

  // }

  socket.on("drawing", (data) => {
    // draw(ctx, data.x0, data.y0, data.x1, data.y2, socket);
    // console.log(ctx);
  });

  return (
    <canvas
      width="600"
      height="400"
      ref={canvas}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseOut={mouseUpHandler}
      onMouseMove={throttleMouseMove}
    ></canvas>
  );
}

export default Whiteboard;
