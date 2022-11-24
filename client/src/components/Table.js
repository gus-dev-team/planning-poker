import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import axios from "axios";
import io from "socket.io-client";
import Dealer from "./table-components/Dealer";
import Hand from "./table-components/Hand";
import Seats from "./table-components/Seats";

const socket = io("localhost:5000");
// Se eu começar a ter problemas com o socket.id mudando,
// comece a averiguar o problema nessa constante.
// Uma ideia seria passar o socket como props.

const playerID = nanoid();
// playerID is the current session's user ID
// is defined globally so it persists through renderization

function Table(props) {
  const { tableID } = useParams(); // ID is the table ID

  //TENTANDO FAZER SEM USAR userName e playedCard

  // const [userName, setUserName] = useState("");
  // const [playedCard, setPlayedCard] = useState("");
  // 'userName' is the name set by the current user on the browser
  // and it is defined when the user first joins the current table
  // same for playedCard...

  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [issue, setIssue] = useState("");
  const [roundDuration, setRoundDuration] = useState(0);
  const [seatedPlayers, setSeatedPlayers] = useState([]);

  useEffect(() => {
    setTable(tableID);

    socket.on("connect", () => {
      // setIsConnected(true);
      setTable(tableID);
    });

    socket.on("disconnect", () => {
      // setIsConnected(false);
    });

    socket.on("update", () => {
      setTable(tableID);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("update");
    };
  }, [
    tableID,
    // playedCard
  ]);

  async function setTable(tableID) {
    const { data } = await axios.get(`/api/tables/${tableID}`);
    setIssue(data.issue);
    setRoundDuration(data.time);
    setSeatedPlayers(data.players);
  }

  async function addPlayer(playerName) {
    await axios.post(`/api/tables/${tableID}`, {
      ID: playerID,
      name: playerName,
      card: "",
    });
    socket.emit("update-players"); // update signal to the server
  }

  async function play(newCard) {
    await axios.post(`/api/tables/${tableID}/${playerID}`, {
      card: newCard,
    });
    socket.emit("update-players"); // update signal to the server
    // setPlayedCard(newCard);
  }

  return (
    <div className='table'>
      <Dealer
        issue={issue}
        setIssue={(string) => setIssue(string)}
        roundDuration={roundDuration}
      />
      <Seats seatedPlayers={seatedPlayers} joinTable={addPlayer} />
      <Hand
        play={play}
        // playerInfo={seatedPlayers.find((player) => player.ID === playerID)}
        // playedCard={playedCard}
        seatedPlayers={seatedPlayers}
        playerID={playerID}
      />
    </div>
  );
}

export default Table;
