import { connected, disconnected, newMessage } from "./wsSlice";

const webSocketMiddleware = ({ dispatch }) => {
  let socket = null;

  const onOpen = (payload) => {
    dispatch(connected(payload));
  };

  const onClose = (payload) => {
    /* need to send userID to server */
    dispatch(disconnected(payload));
  };

  const onMessage = (payload) => {
    console.log("from onMessage");
    // dispatch(newMessage(payload));
  };

  return (next) => (action) => {
    const { type, payload } = action;

    switch (type) {
      case "websocket/connect":
        const { host, data, msg } = payload;

        if (socket !== null) {
          socket.close();
        }

        socket = new WebSocket(host);

        socket.onopen = (e) => {
          console.log(e.type);

          socket.send(
            JSON.stringify({
              type: "join",
              room: "CS500",
              payload: data,
            })
          );
          onOpen(true);
        };

        socket.onmessage = (e) => {
          console.log(e.type);
        };

        socket.onclose = (e) => {
          console.log(e.type);
          onClose(false);
        };
        // cannot use socket.send()function here where websocket is still in CONNECTING state
        break;
      case "websocket/disconnect":
        if (socket !== null) {
          socket.send(payload);
          socket.close();
        }
        socket = null;
        break;
      case "websocket/send":
        socket.send(payload);
        break;
      default:
        return next(action);
    }
  };
};

export default webSocketMiddleware;
