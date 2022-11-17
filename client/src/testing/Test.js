import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("localhost:5000");

function Test() {
  const [state, setState] = useState([]);

  useEffect(() => {
    (async function() {
      const { data } = await axios.get("api/tests");
      setState(data);
    })();
  }, []);

  async function getTest() {
    const { data } = await axios.get("/api/tests");
    console.log(data);
  }

  async function postTest() {
    await axios.post("/api/tests", {
      name: "Daniel",
      age: 23,
      status: "UNKNOWN",
    });
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
          return <li key={subject.age}>{subject.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Test;
