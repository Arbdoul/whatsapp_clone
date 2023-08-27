import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import db from "../firbase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const SidebarChat = ({ addNewChat, id, name }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      const messagesCollectionRef = collection(db, "rooms", id, "messages");
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
  }, [id]);

  const createChat = async () => {
    const roomName = prompt("please enter name for chat");

    if (roomName) {
      //do some clever db stuff
      try {
        const myCollection = collection(db, "rooms");
        await addDoc(myCollection, {
          name: roomName,
        });
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
    console.log("this is the new room", roomName);
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="sidebarChat_info">
          <h2>{name}</h2>
          {messages.length > 0 && <p>{messages[0].message}</p>}
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChar">
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;
