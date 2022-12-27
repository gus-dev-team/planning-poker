import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Theme from "./Room/Theme";
import Hand from "./Room/Hand";
import Table from "./Room/Table";
import socket from "../utils/socket.js";
import { joinServerRoom } from "../controllers/roomController.js";
import { nanoid } from "nanoid";

function Room() {
  const { roomID } = useParams();

  const [playerID] = useState(nanoid());
  console.log(playerID); // For some reason, when the user first hits the page, they receive a first nanoid, then a second overwrites it and does not change after.

  const [disabled, setDisabled] = useState(true);
  const [theme, setTheme] = useState("");
  const [seatedPlayers, setSeatedPlayers] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [roundDuration, setRoundDuration] = useState(0);

  useEffect(() => {
    joinServerRoom(roomID);
    setRoom(roomID);

    socket.on("connect", () => {
      // setIsConnected(true);
      setRoom(roomID);
    });

    socket.on("disconnect", () => {
      // setIsConnected(false);
      // removePlayer(roomID, playerID); // TEM QUE SER FEITO A NÍVEL DO SERVIDOR.
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
    setIsHidden(data.isHidden);
    // setRoundDuration(data.time);
  }

  return (
    <div className='room'>
      <Theme theme={theme} roomID={roomID} disabled={disabled} />

      <Table
        roomID={roomID}
        playerID={playerID}
        seatedPlayers={seatedPlayers}
        disabled={disabled}
        lock={() => setDisabled(!disabled)}
        isHidden={isHidden}
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
