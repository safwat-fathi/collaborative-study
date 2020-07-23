import React from "react";

import style from "./Chat.module.css";

export default ({ userName, message }) => {
  return (
    <div className={style.message}>
      <p>
        <strong>{userName}</strong>: {message}
      </p>
    </div>
  );
};
