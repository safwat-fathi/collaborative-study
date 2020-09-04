import React, { useContext } from "react";

import Rooms from "../Rooms/index";

import { UserContext } from "../../context";
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
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex hic
          repellendus eum provident ea facilis, maxime omnis eveniet quae,
          consequatur, commodi libero consequuntur porro modi. Quos alias
          assumenda atque quae.
        </div>

        <Rooms />
      </div>
    </>
  );
};

export default App;
