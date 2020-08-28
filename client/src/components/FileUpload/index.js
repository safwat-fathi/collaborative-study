import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

// context
import { RoomContext } from "../../context";

const FileUpload = () => {
  const roomCTX = useContext(RoomContext);

  const { webSocketClient, currentRoom, files, setFiles } = roomCTX;

  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const changeHandler = (e) => {
    setFiles(e.target.files);
    setFilename(e.target.files[0].name);
    // for (let i = 0; i < e.target.files.length; i++) {
    //   let fileName = "";
    //   fileName += `${e.target.files[i].name} `;
    //   setFileName(fileName);
    // }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("submitted");
    // sending files through uploading to server
    // -----------------------------------
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    // formData.append("file", files[0]);
    // axios
    //   .post("http://localhost:4000/rooms/uploads", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     const { fileName, filePath } = res.data;
    //     setUploadedFile({ fileName, filePath });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="custom-file mb-4">
          <input
            className="custom-file-input"
            id="customFile"
            type="file"
            name="file"
            onChange={changeHandler}
          />
          <label htmlFor="customFile" className="custom-file-label">
            {filename}
          </label>
        </div>
        <input type="submit" value="Upload" onClick={submitHandler} />
      </form>
    </div>
  );
};

export default FileUpload;
