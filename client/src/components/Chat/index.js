import React, { useState, useEffect, useContext } from "react";
import ChatMessage from "./ChatMessage";

import { RoomContext } from "../../context";

import style from "./Chat.module.css";

const Chat = () => {
  const roomCTX = useContext(RoomContext);

  const {
    webSocketClient,
    userName,
    setUserName,
    userID,
    currentRoom,
  } = roomCTX;

  const [chatting, setChatting] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setChatting(true);
  });

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    webSocketClient.send(
      JSON.stringify({
        type: "chatting",
        room: currentRoom,
        payload: {
          user: userName,
          message: newMessage,
        },
      })
    );

    setMessages([...messages, newMessage]);
  };

  webSocketClient.onmessage = (e) => {
    let data = JSON.parse(e.data);
    const { type, payload } = data;

    try {
      if (type === "chatting") {
        const { user, message } = payload;

        setMessages([...messages, message]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.chat}>
      {/* messages container */}
      <div className={style.messages}>
        {messages.map((message, index) => {
          return (
            <ChatMessage
              // index is not ideal for keys in react
              key={index}
              userName={userName}
              message={message}
            />
          );
        })}
      </div>

      {/* form */}
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Write your message..."
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Chat;
