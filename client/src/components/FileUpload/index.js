import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

// context
import { RoomContext } from "../../context";

const FileUpload = () => {
  const roomCTX = useContext(RoomContext);

  const { files, setFiles } = roomCTX;

  const [fileNames, setFileNames] = useState([]);

  const uploadInputHandler = (e) => {
    setFiles(e.target.files);
  };

  useEffect(() => {
    if (files !== null) {
      for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
      }

      // console.log(fileNames);
    }
  });

  const uploadBtnHandler = (e) => {
    e.preventDefault();
    console.log(files);
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }

    axios
      .post("http://localhost:4000/rooms/uploads", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="file" name="file" onChange={uploadInputHandler} multiple />
      <button onClick={uploadBtnHandler}>upload</button>

      <>
        {fileNames.map((fileName) => {
          return (
            <a
              download={`${fileName}`}
              href={`./uploads/${fileName}`}
            >{`${fileName}`}</a>
          );
        })}
      </>
    </div>
  );
};

export default FileUpload;
