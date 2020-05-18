import React, { Component, createRef } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import draw from "../../utils/draw";

import "./Whiteboard.css";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

class Whiteboard extends Component {
  constructor(props) {
    super(props);

    this.canvas = createRef();
    this.colorPicker = createRef();

    this.state = {
      drawing: false,
      x: 0,
      y: 0,
      ctx: null,
      color: "black",
      // recieved data from websocket
      drawingDataFromWS: null,
    };
  }

  componentDidMount() {
    this.setState({
      ctx: this.canvas.current.getContext("2d"),
    });
  }

  componentDidUpdate() {
    client.onmessage = (e) => {
      let data = JSON.parse(e.data);
      try {
        if (data.type === "drawing") {
          this.setState({
            drawingDataFromWS: data.message,
          });

          // now we can draw with the sent coordinations by websocket :)
          draw(
            this.state.ctx,
            this.state.drawingDataFromWS.x0,
            this.state.drawingDataFromWS.y0,
            this.state.drawingDataFromWS.x1,
            this.state.drawingDataFromWS.y1,
            this.state.drawingDataFromWS.color
          );
        }
        return;
      } catch (err) {
        console.log(err);
      }
    };
  }

  /* 
	/////////////////
	mouseDownHandler
	/////////////////
	*/
  mouseDownHandler = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    this.setState({
      drawing: true,
      x: offsetX,
      y: offsetY,
    });
  };

  /* 
	/////////////////
	mouseUpHandler
	/////////////////
	*/
  mouseUpHandler = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (!this.state.drawing) return;

    this.setState({
      drawing: false,
    });

    draw(
      this.state.ctx,
      this.state.x,
      this.state.y,
      offsetX,
      offsetY,
      this.state.color,
      this.state.room,
      client,
      true
    );
  };

  /* 
	/////////////////
	mouseMoveHandler
	/////////////////
	*/
  mouseMoveHandler = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (!this.state.drawing) return;

    draw(
      this.state.ctx,
      this.state.x,
      this.state.y,
      offsetX,
      offsetY,
      this.state.color,
      this.state.room,
      client,
      true
    );

    this.setState({
      x: offsetX,
      y: offsetY,
    });
  };

  // color picker change handler
  handleColorChange = ({ nativeEvent }) => {
    this.setState({
      color: nativeEvent.target.value,
    });
  };

  render() {
    return (
      <>
        <canvas
          width="600"
          height="400"
          ref={this.canvas}
          onMouseDown={this.mouseDownHandler}
          onMouseUp={this.mouseUpHandler}
          onMouseOut={this.mouseUpHandler}
          onMouseMove={this.mouseMoveHandler}
        ></canvas>
        <input
          onChange={this.handleColorChange}
          ref={this.colorPicker}
          type="color"
        />
      </>
    );
  }
}

export default Whiteboard;
