import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Theme from "./Room/Theme";
import Hand from "./Room/Hand";
import Table from "./Room/Table";
import socket from "../utils/socket.js";
import playerID from "../utils/playerID.js";

function Room(props) {
  const { roomID } = useParams();

  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [disabled, setDisabled] = useState(true);
  const [theme, setTheme] = useState("");
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
    setTheme(data.theme);
    // setRoundDuration(data.time);
    setSeatedPlayers(data.players);
  }

  return (
    <div className='room'>
      {/* <Dealer issue={issue} roundDuration={roundDuration} /> */}
      <Theme theme={theme} roomID={roomID} disabled={disabled} />
      <Table
        roomID={roomID}
        playerID={playerID}
        seatedPlayers={seatedPlayers}
        lock={() => setDisabled(!disabled)}
      />
      <Hand
        roomID={roomID}
        playerID={playerID}
        seatedPlayers={seatedPlayers}
        disabled={disabled}
      />
    </div>
  );
}

export default Room;
