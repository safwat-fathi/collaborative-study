import React, { useState, useEffect, useContext } from "react";

import ChatMessage from "./ChatMessage";

import { RoomContext } from "../../context";
import style from "./Chat.module.css";

const Chat = () => {
  const roomCTX = useContext(RoomContext);

  const client = roomCTX.webSocketClient;

  const [name, setName] = useState("");
  const [lastMessage, setLastMessage] = useState({
    name: "",
    message: "",
    time: null,
    date: null,
  });

  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    client.onmessage = (e) => {
      let data = JSON.parse(e.data);

      if (data.type === "join") {
        console.log(`new user joined and his data is: ${data}`);
        return;
      }
    };
  }, []);

  useEffect(() => {
    client.onmessage = (e) => {
      let data = JSON.parse(e.data);

      try {
        if (data.type === "chatting") {
          let message = data.payload.message;
          let name = data.payload.name;
          let time = data.payload.time;
          let date = data.payload.date;
          setLastMessage({
            name,
            message,
            time,
            date,
          });
          setMessages([...messages, data.payload]);
        }
      } catch (err) {
        console.log(err);
      }
    };
  });

  const handleChange = (e) => {
    e.preventDefault();

    setLastMessage({
      name: name,
      message: e.target.value,
      time: `${new Date().getHours()}: ${new Date().getMinutes()}`,
      date: `${new Date().getDate()}`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(lastMessage.message);

    client.send(
      JSON.stringify({
        type: "chatting",
        room: room,
        payload: lastMessage,
      })
    );

    setLastMessage({
      name: name,
      message: "",
      time: null,
      date: null,
    });
    setMessages([...messages, lastMessage]);
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
              name={message.name}
              message={message.message}
              time={message.time}
              date={message.date}
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
