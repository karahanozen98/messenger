import React from "react";
import { useLocation } from "react-router-dom";
import "./Message.css";

function Message({ username, content, time }) {
  const name = useLocation().pathname.split(":")[2];
  if (time) {
    const tmphrs =
      time.toDate().getHours() < 10
        ? "0" + time.toDate().getHours().toString()
        : time.toDate().getHours().toString();
    const tmpmns =
      time.toDate().getMinutes() < 10
        ? "0" + time.toDate().getMinutes().toString()
        : time.toDate().getMinutes().toString();
    var messageTime = tmphrs + ":" + tmpmns;
  }

  return (
    <div className="messageContainer">
      {username === name ? (
        <div className="message-right">
          <p className="message-username">{username}</p>
          <p className="message-content">{content}</p>
          <p className="message-timestamp-left">{messageTime}</p>
        </div>
      ) : (
        <div className="message-left">
          <p className="message-username">{username}</p>
          <p className="message-content">{content}</p>
          <p className="message-timestamp-left">{messageTime}</p>
        </div>
      )}
    </div>
  );
}
export default Message;
