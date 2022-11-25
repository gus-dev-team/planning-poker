import axios from "axios";
import socket from "../utils/socket.js";

async function addPlayer(name, roomID, playerID) {
  await axios.post(`/api/rooms/${roomID}`, {
    ID: playerID,
    name: name,
    card: "",
  });
  socket.emit("update-players");
}

async function removePlayer(playerID) {
  // should use playerID only...
  // I'll use axios.delete for the first time!
  console.log(
    "I want to leave the room, but this functionality is not propertly set!"
  );
}

export { addPlayer, removePlayer };
