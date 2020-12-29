import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import db from "./../../firebase";
import Button from "@material-ui/core/Button";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (room.includes("/") || room.includes(":")) {
      setRoom("");
      alert(
        "Name of the room can't include special characters like (/,:, etc.)"
      );

    } else {
      db.collection("rooms")
        .doc(room.toString())
        .set({ room })
        .then(() => {
          history.push("/chat/room:" + room + "/username:" + username);
        });
    }
  };

  return (
    <div className="login-div">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Room"
          onChange={(event) => setRoom(event.target.value)}
        ></input>
        <br></br>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!username}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </form>
    </div>
  );
}
