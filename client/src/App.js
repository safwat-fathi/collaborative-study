import React, { Component } from "react";
// import { w3cwebsocket as W3CWebSocket } from "websocket";

import Whiteboard from "./components/Whiteboard";
import Chat from "./components/chat";

// const client = new W3CWebSocket("ws://127.0.0.1:8000");

export default class App extends Component {
  componentDidMount() {
    // client.onopen = () => {
    //   client.send(
    //     JSON.stringify({
    //       type: "join",
    //       room: this.state.room,
    //       message: "new user joined",
    //     })
    //   );
    // };
  }

  componentDidUpdate() {
    // client.onmessage = (e) => {
    //   let data = JSON.parse(e.data);
    //   switch (data.type) {
    //     case "user data":
    //       this.setState({
    //         userID: data.message,
    //       });
    //       break;
    //     case "chatting":
    //       console.log(data.type, this.state.message);
    //       break;
    //     default:
    //       console.log(data.type);
    //   }
    // };
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome Ya 7alawa</h1>
        <Whiteboard />
        <Chat />
      </div>
    );
  }
}
