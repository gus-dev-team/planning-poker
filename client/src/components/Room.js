import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import axios from "axios";
// import io from "socket.io-client";
import Dealer from "./Room/Dealer";
import Hand from "./Room/Hand";
import Seats from "./Room/Table";
import socket from "../utils/socket.js";

const playerID = nanoid();
// playerID is the current session's user ID
// is defined globally so it persists through renderization

function Room(props) {
  const { roomID } = useParams(); // ID is the room ID

  //TENTANDO FAZER SEM USAR userName e playedCard

  // const [userName, setUserName] = useState("");
  // const [playedCard, setPlayedCard] = useState("");
  // 'userName' is the name set by the current user on the browser
  // and it is defined when the user first joins the current room
  // same for playedCard...

  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [issue, setIssue] = useState("");
  const [roundDuration, setRoundDuration] = useState(0);
  const [seatedPlayers, setSeatedPlayers] = useState([]);

  useEffect(() => {
    setRoom(roomID);

    socket.on("connect", () => {
      // setIsConnected(true);
      setRoom(roomID);
    });

    socket.on("disconnect", () => {
      // setIsConnected(false);
    });

    socket.on("update", () => {
      setRoom(roomID);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("update");
    };
  }, [
    roomID,
    // playedCard
  ]);

  async function setRoom(roomID) {
    const { data } = await axios.get(`/api/rooms/${roomID}`);
    setIssue(data.issue);
    setRoundDuration(data.time);
    setSeatedPlayers(data.players);
  }

  // async function addPlayer(playerName) {
  //   await axios.post(`/api/rooms/${roomID}`, {
  //     ID: playerID,
  //     name: playerName,
  //     card: "",
  //   });
  //   socket.emit("update-players"); // update signal to the server
  // }

  async function play(newCard) {
    await axios.post(`/api/rooms/${roomID}/${playerID}`, {
      card: newCard,
    });
    socket.emit("update-players"); // update signal to the server
    // setPlayedCard(newCard);
  }

  return (
    <div className='room'>
      <Dealer
        issue={issue}
        setIssue={(string) => setIssue(string)}
        roundDuration={roundDuration}
      />
      <Seats
        roomID={roomID}
        playerID={playerID}
        seatedPlayers={seatedPlayers}
      />
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

export default Room;
