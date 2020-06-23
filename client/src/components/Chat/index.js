import React, { Component } from "react";

import ChatMessage from "./ChatMessage";

import style from "./Chat.module.css";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.client = this.props.client;

    this.state = {
      name: this.props.roomData.userName,
      lastMessage: {
        name: "",
        message: "",
        time: null,
        date: null,
      },
      messages: [],
      room: this.props.roomData.room,
      userID: this.props.roomData.userID,
    };
  }

  componentDidMount() {
    this.client.onmessage = (e) => {
      let data = JSON.parse(e.data);

      if (data.type === "join") {
        console.log(`new user joined and his data is: ${data}`);
        return;
      }
    };
  }

  componentDidUpdate() {
    this.client.onmessage = (e) => {
      let data = JSON.parse(e.data);

      try {
        if (data.type === "chatting") {
          let message = data.payload.message;
          let name = data.payload.name;
          let time = data.payload.time;
          let date = data.payload.date;

          this.setState({
            lastMessage: {
              name,
              message,
              time,
              date,
            },
            messages: [...this.state.messages, data.payload],
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
    console.log(this.state.lastMessage.message);

    this.client.send(
      JSON.stringify({
        type: "chatting",
        room: this.state.room,
        payload: this.state.lastMessage,
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
      <div className={style.chat}>
        {/* messages container */}
        <div className={style.messages}>
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
