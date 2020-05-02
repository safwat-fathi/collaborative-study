import React, { useRef, useState } from "react";
import socketIO from "socket.io-client";

import draw from "./utils/draw";

import "./Whiteboard.css";

const endpoint = "http://localhost:4000s";

function WhitBoard() {
  const canvas = useRef();

  const socket = socketIO(endpoint);

  const [drawing, setDrawing] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const mouseDownHandler = (e) => {
    console.log(canvas.current.getContext("2d"), socket.id);
  };

  return (
    <canvas
      width="600"
      height="400"
      ref={canvas}
      onMouseDown={mouseDownHandler}
    ></canvas>
  );
}

export default WhitBoard;
