import React from "react";

import Rooms from "../Rooms/index";

import splashimage from "./splash.jpeg";

import "./App.css";

const App = () => {
  return (
    <>
      {/* splash screen */}
      {/* <div>
          <img src={splashimage} alt="splash image" id="icon" />
        </div> */}
      <div className="container">
        <Rooms />
      </div>
    </>
  );
};

export default App;
