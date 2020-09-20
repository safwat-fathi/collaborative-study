import React, { useState, useEffect } from "react";
import api from "../../helpers/api";

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesNames, setFilesNames] = useState("");

  useEffect(() => {
    console.log(uploadedFiles);
    console.log(filesNames);
  }, [uploadedFiles]);

  const changeHandler = (e) => {
    setUploadedFiles(e.target.files);

    for (let file of uploadedFiles) {
      setFilesNames(`${filesNames} ${file.name}`);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("submitted");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    // sending files through uploading to server
    // -----------------------------------
    const formData = new FormData();

    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("uploads", uploadedFiles[i]);
    }

    api
      .post("/rooms/5ef4bd84a4f4b01b51b52344/uploads", formData, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="custom-file mb-4">
          <input
            className="custom-file-input"
            id="customFile"
            type="file"
            name="uploads"
            onChange={changeHandler}
            multiple
          />
          <label htmlFor="customFile" className="custom-file-label">
            {filesNames}
          </label>
        </div>
        <input type="submit" value="Upload" onClick={submitHandler} />
      </form>
    </div>
  );
};

export default FileUpload;
