import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import firebase from "firebase";
import db from "./../../firebase";
import Message from "./../Message/Message";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import SendIcon from "@material-ui/icons/Send";
import "./Chat.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    fontSize: "25px",
    padding: "20px",
    width: "20%",
  },
}));

function Chat() {
  const classes = useStyles();
  const curRoom = useLocation().pathname.split(":")[1].split("/")[0];
  const curUsername = useLocation().pathname.split(":")[2];

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [gotoBottomIconVisibilty, setVisibilty] = useState("hidden");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  window.onscroll = () => {
    var yOffSet = window.pageYOffset;
    var clientHeight =
      window.document.body.offsetHeight - document.documentElement.clientHeight;

    if (yOffSet >= clientHeight - 800) setVisibilty("hidden");
    else setVisibilty("visible");
  };

  useEffect(() => {
    db.collection("rooms")
      .doc(curRoom)
      .collection("messages")
      .orderBy("time", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });

    scrollToBottom();
  }, [curRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (event) => {
    if (input) {
      db.collection("rooms").doc(curRoom).collection("messages").add({
        username: curUsername,
        content: input,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }
  };

  const handleKeyUp = (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      sendMessage(event);
    }
  };
  return (
    <div>
    <div style={{backgroundColor:"rgb(5, 41, 65)", minHeight:"90vh"}}>
      {messages.map(({ id, data }) => (
        <Message
          key={id}
          username={data.username}
          content={data.content}
          time={data.time}
        />
      ))}

      <div className="go-to-bottom">
          <ArrowDropDownCircleIcon
            color="secondary"
            visibility={gotoBottomIconVisibilty}
            fontSize="large"
            onClick={scrollToBottom}
          ></ArrowDropDownCircleIcon>
        </div>
    </div>

    <div className="chat-message-input">
        <input
          type="text"
          value={input}
          placeholder="Send a message"
          onKeyUp={handleKeyUp}
          onChange={(event) => setInput(event.target.value)}
        ></input>
        <Button
          variant="contained"
          disabled={!input}
          color="primary"
          className={classes.button}
          onClick={sendMessage}
          endIcon={<SendIcon />}
        />
       
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
export default Chat;
