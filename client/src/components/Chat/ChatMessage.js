import React from "react";

import style from "./Chat.module.css";

export default ({ name, message, time, date }) => {
  return (
    <div className={style.message}>
      <p>
        <strong>{name}</strong>: {message}
      </p>
      <span>
        {time} <b>{date}</b>
      </span>
    </div>
  );
};
