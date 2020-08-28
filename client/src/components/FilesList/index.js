import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

// context
import { RoomContext } from "../../context";

const FilesList = () => {
  const roomCTX = useContext(RoomContext);
  const [isEmpty, setIsEmpty] = useState(true);

  const { files, setFiles } = roomCTX;

  useEffect(() => {
    axios
      .get("http://localhost:4000/rooms/5ef4bd84a4f4b01b51b52344/uploads")
      .then((res) => {
        console.log(res.data);
        setFiles(res.data);
        setIsEmpty(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {!isEmpty ? (
        <div>
          <h2>files uplaoded: {files.length}</h2>
          <ul>
            {files.map((file, i) => {
              return (
                <li key={i}>
                  <a
                    href={`data:${file.mimetype};base64,${file.data}`}
                    download={`${file.name}`}
                  >
                    {file.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        "Loading files..."
      )}
    </div>
  );
};

export default FilesList;
