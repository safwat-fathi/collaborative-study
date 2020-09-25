import React, { useState, useContext, createContext } from "react";

export const RoomContext = createContext({
  canvas: null,
  ctx: null,
  drawing: false,
  erasing: false,
  x: 0,
  y: 0,
  color: "",
  drawingDataFromWS: null,
  setCanvas: () => {},
  setCtx: () => {},
  setDrawing: () => {},
  setErasing: () => {},
  setX: () => {},
  setY: () => {},
  setColor: () => {},
  setDrawingDataFromWS: () => {},
});

export const RoomProvider = ({ children }) => {
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [erasing, setErasing] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [color, setColor] = useState("");
  const [drawingDataFromWS, setDrawingDataFromWS] = useState(null);

  return (
    <RoomContext.Provider
      value={{
        canvas,
        setCanvas,
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
        drawingDataFromWS,
        setDrawingDataFromWS,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => useContext(RoomContext);
