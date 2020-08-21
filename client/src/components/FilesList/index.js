import React, { useState, useContext, useEffect } from "react";

// context
import { RoomContext } from "../../context";

const FilesList = () => {
  const roomCTX = useContext(RoomContext);
  const [isEmpty, setIsEmpty] = useState(true);

  const { webSocketClient, currentRoom, files, setFiles } = roomCTX;

  useEffect(() => {
    if (files.length > 0) {
      setIsEmpty(false);
    }

    // console.log(files);
    // console.log(`isEmpty: ${isEmpty}`);
  });

  return (
    <div>
      <h2>files: {files.length}</h2>
      <ul>
        {files.map((file, i) => {
          return <li key={i}>{file.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default FilesList;
