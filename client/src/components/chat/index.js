import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./Chat.css";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: null,
      room: "bala7 amhat!",
      message: "",
    };
  }

  componentDidMount() {
    client.onopen = () => {
      client.send(
        JSON.stringify({
          type: "join",
          room: this.state.room,
          message: "new user joined",
        })
      );
    };
  }

  componentDidUpdate() {
    client.onmessage = (e) => {
      let data = JSON.parse(e.data);

      switch (data.type) {
        case "user data":
          this.setState({
            userID: data.message,
          });
          break;
        case "chatting":
          console.log(data.type);
          break;
        default:
          console.log(data.type);
      }
    };
  }

  handleChange = (e) => {
    e.preventDefault();

    this.setState({
      message: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    client.send(
      JSON.stringify({
        type: "chatting",
        room: this.state.room,
        message: this.state.message,
      })
    );

    this.setState({
      message: "",
    });
  };

  render() {
    return (
      <div className="chat">
        {/* messages container */}
        <div className="messages">
          <div className="message in">
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <span>
              12:01 <b>Today</b>
            </span>
          </div>

          <div className="message out">
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <span>
              12:01 <b>Today</b>
            </span>
          </div>
        </div>

        {/* form */}
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Write your message..."
            value={this.state.message}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}
