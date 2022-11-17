import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import io from "socket.io-client";

const socket = io("localhost:5000");

function Test() {
  const [state, setState] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    // (async function() {
    //   const { data } = await axios.get("api/tests");
    //   setState(data);
    // })(); // VOU DEIXAR ESSA FUNÇÃO SER CHAMADA ON USER CONNECT NO SOCKETIO
    socket.on("connect", () => {
      renderList();
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("message", (msg) => {
      // console.log(data);
      // setLastMessage(data);
      console.log(msg);
      renderList();
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  async function renderList() {
    const { data } = await axios.get("api/tests");
    setState(data);
  }

  async function getTest() {
    const { data } = await axios.get("/api/tests");
    console.log(data);
  }

  async function postTest() {
    await axios.post("/api/tests", {
      name: `${nanoid()}`,
      age: 1,
      status: `${socket.id}`,
    });
    socket.emit("post!");
  }

  return (
    <div>
      <button className="create-new-table" type="submit" onClick={getTest}>
        Test GET
      </button>
      <button className="create-new-table" type="submit" onClick={postTest}>
        Test POST
      </button>

      <ul>
        {state.map((subject) => {
          return <li key={subject.name}>{subject.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Test;
