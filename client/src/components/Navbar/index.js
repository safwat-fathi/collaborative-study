import React from 'react'
import { Link } from "react-router-dom";

export default function index(props) {
    return (
        <nav className="navbar col navbar-expand-sm navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          collaborative-study
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className={`navbar-nav ${ props.exit || props.edit ?'ml-auto':'mr-auto'}`}>
            {props.model && (
                <li className="nav-item" onClick={() => props.model(true)}>
                    <span className="nav-link"> Create Room </span>
                </li>
            )}
            {  (props.model || props.exit) && (
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                        edit Profile
                    </Link>
                </li>
            )}
            { (props.exit || props.edit) && (
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        {props.edit ? 'back' : 'exit room'}
                    </Link>
                </li>
                  )
            }
            <li className="nav-item">
                <Link className="nav-link" to="/logout">
                    logout
                </Link>
            </li>
          </ul>
          { (!props.exit && !props.edit) && (
            <form className="form-inline my-2 my-lg-0">
                <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="serach room by room name"
                />
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
                </button>
            </form>
          )}
        </div>
      </nav>
    )
}
