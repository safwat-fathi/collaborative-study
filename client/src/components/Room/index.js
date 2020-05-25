import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// ---------------------
import Whiteboard from "../Whiteboard";
import Chat from "../Chat";
// ---------------------
import style from "./Room.module.css";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: null,
      userName: "Safwat",
      room: "bala7 amhat!",
    };
  }

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

    client.onmessage = (e) => {
      let data = JSON.parse(e.data);

      if (data.type === "user data") {
        this.setState({
          userID: data.message,
        });
      }
    };
  }

  render() {
    return (
      <div className={style.Room}>
        <Whiteboard userName={this.state.userName} />
        <Chat userName={this.state.userName} />
      </div>
    );
  }
}
