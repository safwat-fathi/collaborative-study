import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

// context
import { RoomContext } from "../../context";

const FileUpload = () => {
  const roomCTX = useContext(RoomContext);

  // file upload state
  const { webSocketClient, currentRoom, files, setFiles } = roomCTX;

  const uploadInputHandler = (e) => {
    // if (e.target.files.length > 1) {
    //   let currentFiles = files;
    //   currentFiles.push(...e.target.files);
    //   setFiles(currentFiles);
    //   return;
    // }

    // let currentFiles = files;
    // let savedFile = e.target.files[0];
    // currentFiles.push(savedFile);
    // setFiles(currentFiles);
    setFiles(e.target.files[0]);
  };

  const uploadBtnHandler = (e) => {
    e.preventDefault();

    console.log(files);

    const data = new FormData();
    data.append("file", files[0]);
    console.log(data);
    axios
      .post("http://localhost:4000/users/uploads", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="file" name="file" onChange={uploadInputHandler} multiple />
      <button onClick={uploadBtnHandler}>upload</button>
    </div>
  );
};

export default FileUpload;
