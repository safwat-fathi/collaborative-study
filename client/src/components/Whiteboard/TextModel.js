import React,{ useEffect ,useState } from 'react';
import Draggable from 'react-draggable';
import "./textmodal.css";

export default function TextModel({ isVisible = false, title, onClose, clicked}) {

    const [ equation, setEquation ] = useState("");  
    const [ drag , setDrag ] = useState({
        activeDrags: 0,
        deltaPosition: {
          x: 0, y: 0
        }
    });

    useEffect(() => {
      document.addEventListener("keydown", keydownHandler);
      return () => document.removeEventListener("keydown", keydownHandler);
    });
  
    function keydownHandler({ key }) {
      resetState()
      switch (key) {
        case "Escape":
          onClose();
          break;
        default:
      }
    }
  
    const resetState = ()=>{

      setDrag({
        ...drag,
        deltaPosition: {
          x: 0,
          y: 0,
      }});
      setEquation('')
    }

    const handelSubmit=(e)=>{
      e.preventDefault();
      clicked( drag.deltaPosition.x.toFixed(0), drag.deltaPosition.y.toFixed(0), equation );
      resetState()
    }

    const handleDrag = (e, ui) => {
        const {x, y} = drag.deltaPosition;
        setDrag({
        ...drag,
        deltaPosition: {
          x: x + ui.deltaX,
          y: y + ui.deltaY,
        }});
    };

    const onStart = () => {
        setDrag({...drag,activeDrags: ++drag.activeDrags});
    };
    
    const onStop = () => {
        setDrag({...drag,activeDrags: --drag.activeDrags});
    };
  
    const dragHandlers = {onStart: onStart, onStop: onStop};
    const {deltaPosition} = drag;

    return !isVisible ? null : (
      <div className="modal" onClick={()=>{resetState();onClose()}}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <span className="modal-close" onClick={()=>{resetState();onClose()}}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            <div className="modal-content">
              <form onSubmit={ handelSubmit }>
                <div className="form-group">
                  <label className="col-form-label" htmlFor="name">
                    write equation here
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="f(x)=..."
                    id="name"
                    onChange={(e) => setEquation(e.target.value)}
                  />
                </div>
                <div className="form-group">
                    <label className="col-form-label" htmlFor="name">
                        sit position
                    </label>
                    <div className="box" style={{height: '170px', width: '100%', position: 'relative', overflow: 'auto', padding: '0'}}>
                        <div style={{height: '170px', width: '100%', padding: '5px'}}>
                            <Draggable onDrag={handleDrag} bounds="parent" {...dragHandlers}>
                                <div className="box">
                                <div>{equation}</div>
                                {/* <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div> */}
                                </div>
                            </Draggable>
                        </div>
                    </div>
                </div>
                <input
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                  value="write it"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }