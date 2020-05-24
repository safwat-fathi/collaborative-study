import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import ChatMessage from "./ChatMessage";

import "./Chat.css";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Safwat",
      lastMessage: {
        name: "",
        message: "",
        time: null,
        date: null,
      },
      messages: [],
    };
  }

  componentDidUpdate() {
    client.onmessage = (e) => {
      let data = JSON.parse(e.data);

      try {
        if (data.type === "chatting") {
          let message = data.message.message;
          let name = data.message.name;
          let time = data.message.time;
          let date = data.message.date;

          this.setState({
            lastMessage: {
              name,
              message,
              time,
              date,
            },
            messages: [...this.state.messages, data.message],
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
  }

  handleChange = (e) => {
    e.preventDefault();

    this.setState({
      // @ts-ignore
      lastMessage: {
        name: this.state.name,
        message: e.target.value,
        time: `${new Date().getHours()}: ${new Date().getMinutes()}`,
        date: `${new Date().getDate()}`,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    client.send(
      JSON.stringify({
        type: "chatting",
        room: this.state.room,
        message: this.state.lastMessage,
      })
    );

    this.setState({
      lastMessage: {
        name: this.state.name,
        message: "",
        time: null,
        date: null,
      },
      messages: [...this.state.messages, this.state.lastMessage],
    });
  };

  render() {
    return (
      <div className="chat">
        {/* messages container */}
        <div className="messages">
          {this.state.messages.map((message, index) => {
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
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Write your message..."
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}
