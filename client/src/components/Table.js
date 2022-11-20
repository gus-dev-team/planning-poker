import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import "./styles/Table.css";
import axios from "axios";
import io from "socket.io-client";
import Dealer from "./table-components/Dealer";
import Hand from "./table-components/Hand";
import Seats from "./table-components/Seats";

const socket = io("localhost:5000");

// const anotherID = "023";

function Table() {
  const { ID } = useParams();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    setTable(ID);

    socket.on("connect", () => {
      setIsConnected(true);
      setTable(ID);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("update", () => {
      setTable(ID);
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

  async function setTable(ID) {
    const { data } = await axios.get(`/api/tables/${ID}`);
    setIssue(data.issue);
    setRoundDuration(data.time);
    setSeatedPlayers(data.players);
  }

  async function addPlayer(playerName) {
    await axios.post(`/api/tables/${ID}`, {
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
