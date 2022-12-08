import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Theme from "./Room/Theme";
import Hand from "./Room/Hand";
import Table from "./Room/Table";
import socket from "../utils/socket.js";
import playerID from "../utils/playerID.js";
import { joinRoom } from "../controllers/roomController.js";

function Room() {
  const { roomID } = useParams();

  const [disabled, setDisabled] = useState(true);
  const [theme, setTheme] = useState("");
  const [seatedPlayers, setSeatedPlayers] = useState([]);
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [roundDuration, setRoundDuration] = useState(0);

  useEffect(() => {
    joinRoom(roomID);
    setRoom(roomID);

    socket.on("connect", () => {
      // setIsConnected(true);
      setRoom(roomID);
    });

    socket.on("disconnect", () => {
      // setIsConnected(false);
      // removePlayer(roomID, playerID); // TEM QUE SER FEITO A NÍVEL DO SERVIDOR. TENHO QUE IMPLEMENTAR socket.io 'ROOMS' ...
    });

    socket.on("update", () => {
      setRoom(roomID);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("update");
    };
  }, [roomID]);

  async function setRoom(roomID) {
    const { data } = await axios.get(`/api/rooms/${roomID}`);
    setTheme(data.theme);
    setSeatedPlayers(data.players);
    // setRoundDuration(data.time);
  }

  return (
    <div className='room'>
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
