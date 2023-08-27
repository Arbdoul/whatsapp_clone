import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import db from "../firbase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { useStateValue } from "../StateProvider";
import { firebase } from "firebase/app";

const Chat = () => {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const myCollection = collection(db, "rooms");

  useEffect(() => {
    if (roomId) {
      const roomDocRef = doc(myCollection, roomId);
      onSnapshot(roomDocRef, (snapshot) => {
        setRoomName(snapshot.data().name);
      });

      const messagesCollectionRef = collection(db, "rooms", roomId, "messages");
      const messagesQuery = query(
        messagesCollectionRef,
        orderBy("timestamp", "asc")
      );

      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      });

      return () => {
        unsubscribeMessages();
      };
    }
  }, [roomId, myCollection]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("you typed >>>>", input);

    if (roomId) {
      const messagesCollection = collection(db, "rooms", roomId, "messages");

      try {
        await addDoc(messagesCollection, {
          message: input,
          name: user.displayName,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setInput("");
    }
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen {""}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button type="submit" onClick={sendMessage}>
            send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
