import axios from "axios";
import socket from "../utils/socket.js";

async function addPlayer(name, roomID, playerID) {
  await axios.put(`/api/rooms/${roomID}`, {
    ID: playerID,
    name: name,
  });
  socket.emit("update");
}

async function removePlayer(roomID, playerID) {
  await axios.delete(`/api/rooms/${roomID}`, {
    data: { ID: playerID }, // For the method axios.delete, use config.data to pass the body in the request.
  });
  socket.emit("update");
}

async function updateCard(roomID, playerID, card) {
  await axios.put(`/api/rooms/${roomID}/${playerID}`, {
    card: card,
  });
  socket.emit("update");
}

export { addPlayer, removePlayer, updateCard };
