import React,{ useState , useEffect } from 'react';
import './style.css';

function Modal({ isVisible = false, title, content, footer, onClose }) {
    useEffect(() => {
      document.addEventListener('keydown', keydownHandler);
      return () => document.removeEventListener('keydown', keydownHandler);
    });
  
    function keydownHandler({ key }) {
      switch (key) {
        case 'Escape':
          onClose();
          break;
        default:
      }
    }
  
    return !isVisible ? null : (
      <div className="modal" onClick={onClose}>
        <div className="modal-dialog" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <span className="modal-close" onClick={onClose}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            <div className="modal-content">{content}</div>
          </div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    );
  }

export default function () {

    const [isModal, setModal] = useState(false);
    const [name, setName] = useState("");
    const [descriptiont, setDescriptiont] = useState("");

    // useEffect(() => {
    //     console.log('name',name),
    //     console.log("descriptiont",descriptiont)
    // });

    const createRoom = (e) => {
        e.preventDefault();
        console.log('name',name);
        console.log("descriptiont",descriptiont);
    }

    const modalContent = (
                            
                            <form onSubmit={createRoom}>
                                <div className="form-group" >
                                    <label className="col-form-label" for="name">room name</label>
                                    <input type="text" className="form-control" placeholder="please write Room name" id="name" onChange={ (e) => setName(e.target.value) } />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label" for="descriptiont">room descriptiont</label>
                                    <input type="text" className="form-control" placeholder="please write desc" id="descriptiont" onChange={ (e) => setDescriptiont(e.target.value) }/>
                                </div>
                                <input class="btn btn-primary btn-lg btn-block" type="submit" value="create room"/>
                            </form>
                         )

    return (
    <>
            <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                <a className="navbar-brand" href="#" >collaborative-study</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active" onClick={() => setModal(true)}>
                        <a className="nav-link" href="javascript:void(0)"> Create Room </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="serach room by room name"/>
                        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <div className="card text-white bg-primary mt-3">
                            <div className="card-header">your profile</div>
                            <div className="card-body">
                                <h4 className="card-title">name :- abdelrahman</h4>
                                <p className="card-text">email :- aaaa@aa.aa</p>
                            </div>
                        </div>  
                    </div>
                    <div className="col-8">
                        <div className="card bg-light mt-3">
                            <div className="card-header">public room</div>
                            <div className="card-body">
                                <h4 className="card-title">room name : javascript</h4>
                                <h4 className="card-text">creator name: john</h4>
                                <h4 className="card-text">room descriptiont: how to master js</h4>
                                <p className="card-text">members : 5</p>
                                <p className="card-text">
                                    <button type="button" className="btn btn-primary btn-lg btn-block">join room</button>
                                </p>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
                
            <Modal
                isVisible={ isModal }
                title="create room"
                content={ modalContent }
                footer={<button>Cancel</button>}
                onClose={() => setModal(false)}
            />    
    </>
    )
}
