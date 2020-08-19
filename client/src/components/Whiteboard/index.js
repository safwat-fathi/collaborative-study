import React, { Component, useEffect, useState, useContext, useRef } from "react";
import draw ,{ writeText }from "../../utils/draw";
import TextModel from './TextModel';
import "./Whiteboard.css";

import { RoomContext } from "../../context";

const Whiteboard = () => {
  const roomCTX = useContext(RoomContext);

  const {
    currentRoom,
    webSocketClient,
    ctx,
    setCtx,
    drawing,
    setDrawing,
    x,
    setX,
    y,
    setY,
    color,
    setColor,
  } = roomCTX;

  // refs
  const canvas = useRef(null);
  const colorPicker = useRef(null);
  const btnUndo = useRef(null);

  // for text model 
  const [isModal, setIsModal] = useState(false);
  // for undo or redo history
  const [lastDrawings, setLastDrawings] = useState([]);
  const [storedDrawings, setStoredDrawings] = useState([]);

  useEffect(() => {
    setCtx(canvas.current.getContext("2d"));
  }, []);

  /* 
	/////////////////
	mouseDownHandler
	/////////////////
	*/
  const mouseDownHandler = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    setDrawing(true);
    setX(offsetX);
    setY(offsetY);
    setLastDrawings([]);
  };

  /* 
	/////////////////
	mouseUpHandler
	/////////////////
	*/
  const mouseUpHandler = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (!drawing) return;

    setDrawing(false);
    draw(
      ctx,
      x,
      y,
      offsetX,
      offsetY,
      color,
      currentRoom,
      webSocketClient,
      true
    );

    setStoredDrawings([...storedDrawings, lastDrawings]);
  };

  /* 
	/////////////////
	mouseMoveHandler
	/////////////////
	*/
  const mouseMoveHandler = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (!drawing) return;

    draw(
      ctx,
      x,
      y,
      offsetX,
      offsetY,
      color,
      currentRoom,
      webSocketClient,
      true
    );

    setX(offsetX);
    setY(offsetY);

    setLastDrawings([
      ...lastDrawings,
      { x0: x, y0: y, x1: offsetX, y1: offsetY },
    ]);
  };

  /* 
	/////////////////
	color picker change handler
	/////////////////
	*/
  const handleColorChange = ({ nativeEvent }) => {
    setColor(nativeEvent.target.value);
  };

  /* 
	/////////////////
	undo handler
	/////////////////
	*/
  const handleUndo = () => {
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

    if (!storedDrawings.length) {
      return;
    }

    console.log("undo");

    console.log("lastDrawings", lastDrawings);
    console.log("storedDrawings before", storedDrawings);

    setStoredDrawings(storedDrawings.slice(0, -1));

    console.log(storedDrawings.length);

    for (let i = 0; i < storedDrawings.length; i++) {
      for (let j = 0; j < storedDrawings[i].length; j++) {
        draw(
          ctx,
          storedDrawings[i][j].x0,
          storedDrawings[i][j].y0,
          storedDrawings[i][j].x1,
          storedDrawings[i][j].y1,
          color,
          currentRoom,
          webSocketClient,
          true,
          canvas,
          true
        );
      }
    }
    console.log("storedDrawings after", storedDrawings);
  };

  const [ text, setText] = useState('');

  const handleWriteText = (x,y,text) => {
    writeText(
      ctx,
      text,
      (x * 2),
      (y * 2),
      color,
      currentRoom,
      webSocketClient,
      true
    );
  }

  // const [equationList, setEquationList] = useState([]);
  // // handle click event of the Add button
  // const handleAddClick = (index) => {
  //   setEquationList([...equationList, { text : "" }]);
  //   handleWriteText(index)
  // };
  //   // handle input change
  //   const handleInputChange = (e, index) => {
  //     const { name, value } = e.target;
  //     const list = [...equationList];
  //     list[index][name] = value;
  //     setEquationList(list);
  //   };
  
  //   // handle click event of the Remove button
  //   const handleRemoveClick = index => {
  //     const list = [...equationList];
  //     list.splice(index, 1);
  //     setEquationList(list);
  //   };


    // const handleDrag = (e, ui) => {
    //   const {x, y} = drag.deltaPosition;
    //   setDrag({
    //   ...drag,
    //   deltaPosition: {
    //     x: x + ui.deltaX,
    //     y: y + ui.deltaY,
    //   }});
    // };
  
    // const onStart = () => {
    //   setDrag({...drag,activeDrags: ++drag.activeDrags});
    // };
  
    // const onStop = () => {
    //   setDrag({...drag,activeDrags: --drag.activeDrags});
    // };

    // const dragHandlers = {onStart: onStart, onStop: onStop};
    // const {deltaPosition} = drag;

  return (
    <div>
      <TextModel
        clicked={handleWriteText}
        isVisible={isModal}
        title="write equation"
        onClose={() => setIsModal(false)}
      />
      <canvas
        className="canvas"
        width="600"
        height="400"
        ref={canvas}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseOut={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
      ></canvas>

      <input onChange={handleColorChange} ref={colorPicker} type="color" />
      <button onClick={handleUndo} ref={btnUndo}>
        undo
      </button>

      <button onClick={()=>{ setIsModal(true); }} >
        model
      </button>

      <button onClick={()=>{ handleWriteText(); }} >
        write text
      </button>
      <div>
        {/* <DraggableComponent/> */}
        {/* { equationList && equationList.map((x, i) => {
          return (
            <div className="box">
              <input
                name="text"
                placeholder="Enter equation here "
                value={x.text}
                onChange={e => handleInputChange(e, i)}
              />
              <div className="btn-box">
                {equationList.length !== 1 && <button
                  className="mr10"
                  onClick={() => handleRemoveClick(i)}> Remove </button>}
                {equationList.length - 1 === i && <button onClick={()=>handleAddClick(i)}>Add</button>}
              </div>
            </div>
          );
        }) } */}
      </div>
    </div>
  );
};

export default Whiteboard;

// export class DraggableComponent extends Component {

//   //  const [ drag ,setDrag ] = useState({
//   //   activeDrags: 0,
//   //   deltaPosition: {
//   //     x
//   // });

//   state = {
//     activeDrags: 0,
//     deltaPosition: {
//       x: 0, y: 0
//     }
//     // ,
//     // controlledPosition: {
//     //   x: -400, y: 200
//     // }
//   };

//   const handleDrag = (e, ui) => {
//     const {x, y} = this.state.deltaPosition;
//     this.setState({
//       deltaPosition: {
//         x: x + ui.deltaX,
//         y: y + ui.deltaY,
//       }
//     });
//   };

//   const onStart = () => {
//     this.setState({activeDrags: ++this.state.activeDrags});
//   };

//   const onStop = () => {
//     this.setState({activeDrags: --this.state.activeDrags});
//   };

//   // For controlled component
//   // adjustXPos = (e) => {
//   //   e.preventDefault();
//   //   e.stopPropagation();
//   //   const {x, y} = this.state.controlledPosition;
//   //   this.setState({controlledPosition: {x: x - 10, y}});
//   // };

//   // adjustYPos = (e) => {
//   //   e.preventDefault();
//   //   e.stopPropagation();
//   //   const {controlledPosition} = this.state;
//   //   const {x, y} = controlledPosition;
//   //   this.setState({controlledPosition: {x, y: y - 10}});
//   // };

//   // onControlledDrag = (e, position) => {
//   //   const {x, y} = position;
//   //   this.setState({controlledPosition: {x, y}});
//   // };

//   // onControlledDragStop = (e, position) => {
//   //   this.onControlledDrag(e, position);
//   //   this.onStop();
//   // };

//   render() {
//     const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
//     const {deltaPosition, controlledPosition} = this.state;
//     return (
//       <div className="box" style={{height: '500px', width: '500px', position: 'relative', overflow: 'auto', padding: '0'}}>
//         <div style={{height: '500px', width: '500px', padding: '10px'}}>
//           <Draggable onDrag={this.handleDrag} bounds="parent" {...dragHandlers}>
//             <div className="box">
//               <div>I track my deltas</div>
//               <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
//             </div>
//           </Draggable>
//         </div>
//       </div>
//     )
//   }
// }

