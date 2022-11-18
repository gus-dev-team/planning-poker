import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./styles/Table.css";

import axios from "axios";
import io from "socket.io-client";

import Dealer from "./table-components/Dealer";
import Hand from "./table-components/Hand";
import Seats from "./table-components/Seats";

const socket = io("localhost:5000");

const fixedTemporaryID = "023";

function Table() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    setTable();

    socket.on("connect", () => {
      setIsConnected(true);
      setTable();
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("update", () => {
      setTable();
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("update");
    };
  }, []);

  const [issue, setIssue] = useState("");
  const [roundDuration, setRoundDuration] = useState(3600);
  const [seatedPlayers, setSeatedPlayers] = useState([]);

  async function setTable() {
    const { data } = await axios.get(
      `/api/tables/${fixedTemporaryID}` // temporary
    );
    setIssue(data.issue);
    setRoundDuration(data.time);
    setSeatedPlayers(data.players);
  }

  async function addPlayer(playerName) {
    await axios.post(`/api/tables/${fixedTemporaryID}`, {
      ID: `${nanoid()}`,
      name: playerName,
      card: "",
    });
    socket.emit("update-players"); // update signal to the server
  }

  function play(card) {
    console.log(`The card ${card} was played...`);
  }

  return (
    <div>
      <h2>Table</h2>
      <button onClick={addPlayer}>testing</button>
      <Dealer
        issue={issue}
        setIssue={(string) => setIssue(string)}
        roundDuration={roundDuration}
      />
      <Hand play={play} />
      <Seats seatedPlayers={seatedPlayers} joinTable={addPlayer} />
    </div>
  );
}

export default Table;
