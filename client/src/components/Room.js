import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import io from "socket.io-client";
// import Dealer from "./Room/Dealer";
import Theme from "./Room/Theme";
import Hand from "./Room/Hand";
import Table from "./Room/Table";
import socket from "../utils/socket.js";
import playerID from "../utils/playerID.js";

function Room(props) {
  const { roomID } = useParams();

  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [description, setDescription] = useState("");
  // const [roundDuration, setRoundDuration] = useState(0);
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
    setDescription(data.theme);
    // setRoundDuration(data.time);
    setSeatedPlayers(data.players);
  }

  return (
    <div className='room'>
      {/* <Dealer issue={issue} roundDuration={roundDuration} /> */}
      <Theme description={description} />
      <Table
        roomID={roomID}
        playerID={playerID}
        seatedPlayers={seatedPlayers}
      />
      <Hand
        // play={play}
        // playerInfo={seatedPlayers.find((player) => player.ID === playerID)}
        // playedCard={playedCard}
        roomID={roomID}
        playerID={playerID}
        seatedPlayers={seatedPlayers}
      />
    </div>
  );
}

export default Room;
