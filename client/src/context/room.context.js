import { useState, useContext, createContext } from "react";

export const RoomContext = createContext();

// {
//   // whiteboard state
//   canvas: null,
//   setCanvas: () => {},
//   ctx: null,
//   setCtx: () => {},
//   drawing: false,
//   setDrawing: () => {},
//   erasing: false,
//   setErasing: () => {},
//   x: 0,
//   setX: () => {},
//   y: 0,
//   setY: () => {},
//   color: "",
//   setColor: () => {},
//   drawingDataFromWS: null,
//   setDrawingDataFromWS: () => {},
//   // chat state
//   newMessage: "",
//   setNewMessage: () => {},
//   messages: [],
//   setMessages: () => {},
//   // join room state
//   rooms: [],
//   setRooms: () => {},
//   currentRoom: "",
//   setCurrentRoom: () => {},
//   userID: "",
//   setUserID: () => {},
//   userName: "",
//   setUserName: () => {},
//   userEmail: "",
//   setUserEmail: () => {},
//   webSocketClient: null,
//   setWebSocketClient: () => {},
// }

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
