import React, { useState, useEffect, useContext, useRef } from "react";

import { RoomContext } from "../../context";

import "./Chat.css";

const Chat = () => {
  const chatArea = useRef(null);
  const roomCTX = useContext(RoomContext);

  const {
    webSocketClient,
    userName,
    userID,
    currentRoom,
    newMessage,
    setNewMessage,
    messages,
    setMessages,
  } = roomCTX;

  const [content, setContent] = useState("");

  // format time for chat message
  const formatTime = (timestamp) => {
    const d = new Date(timestamp);

    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;

    return time;
  };

  const handleChange = (e) => {
    setContent(e.target.value);
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // data object we send by WS
      let chatData = {
        userID: userID,
        user: userName,
        message: newMessage,
        timestamp: formatTime(Date.now()),
      };
      // sending chat data
      webSocketClient.send(
        JSON.stringify({
          type: "chatting",
          room: currentRoom,
          payload: chatData,
        })
      );
      // updating messages state
      setMessages([...messages, chatData]);
      // set input value to none
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  // clear messages on new join to room
  useEffect(() => {
    setMessages([]);
  }, []);

  // scroll chat area to fit chat message
  useEffect(() => {
    chatArea.current.scrollBy(0, chatArea.current.scrollHeight);
  }, [messages]);

  return (
    <div className="chat">
      {/* messages container */}
      <div className="messages" ref={chatArea}>
        {messages.map((message, index) => {
          return (
            // index is not ideal for keys in react
            <p
              key={index}
              className={`chat-bubble ${
                userID === message.userID ? "current-user" : "user"
              }`}
            >
              <strong>
                {userID === message.userID ? "You" : message.user}
              </strong>
              <br />
              {message.message}
              <br />
              <span className="chat-time">{message.timestamp}</span>
            </p>
          );
        })}
      </div>

      {/* form */}
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Write your message..."
          value={content}
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Chat;
