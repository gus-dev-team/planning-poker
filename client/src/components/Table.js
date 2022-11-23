import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import axios from "axios";
import io from "socket.io-client";
import Dealer from "./table-components/Dealer";
import Hand from "./table-components/Hand";
import Seats from "./table-components/Seats";

const socket = io("localhost:5000");
const userID = nanoid();
// userID is the current session's user ID
// is defined globally so it persists through renderization

function Table() {
  const { ID } = useParams(); // ID is the table ID

  console.log("this is the current user ID:", userID);

  const [userName, setUserName] = useState("");
  // 'userName' is the name set by the current user on the browser
  // and it is defined when the user first joins the current table

  // const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    setTable(ID);

    socket.on("connect", () => {
      // setIsConnected(true);
      setTable(ID);
    });

    socket.on("disconnect", () => {
      // setIsConnected(false);
    });

    socket.on("update", () => {
      setTable(ID);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("update");
    };
  }, [ID]);

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
      ID: userID,
      name: playerName,
      card: "",
    });
    socket.emit("update-players"); // update signal to the server
    setUserName(playerName);
  }

  async function play(playedCard) {
    console.log(`The card ${playedCard} was played...`);
    await axios.post(`/api/tables/${ID}/${userID}`, {
      ID: userID,
      name: userName,
      card: playedCard,
    });
    socket.emit("update-players"); // update signal to the server
  }

  return (
    <div>
      <Dealer
        issue={issue}
        setIssue={(string) => setIssue(string)}
        roundDuration={roundDuration}
      />
      <Seats seatedPlayers={seatedPlayers} joinTable={addPlayer} />
      <Hand play={play} />
    </div>
  );
}

export default Table;
