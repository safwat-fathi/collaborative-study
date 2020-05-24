import React from "react";

export default ({ name, message, time, date }) => {
  return (
    <div className="message">
      <p>
        <strong>{name}</strong>: {message}
      </p>
      <span>
        {time} <b>{date}</b>
      </span>
    </div>
  );
};
