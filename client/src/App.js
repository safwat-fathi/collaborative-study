import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import Whiteboard from "./components/Whiteboard";
import Chat from "./components/Chat";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: null,
      room: "bala7 amhat!",
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
        case "drawing":
          console.log(data.type);
          break;
        default:
          console.log(`😁 from App`);
      }
    };
  }

  render() {
    console.log(this.state.userID);

    return (
      <div className="App">
        <h1>Welcome Ya 7alawa</h1>
        <Whiteboard />
        <Chat />
      </div>
    );
  }
}
