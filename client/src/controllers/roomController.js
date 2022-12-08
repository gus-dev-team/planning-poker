import axios from "axios";
import socket from "../utils/socket.js";

function joinRoom(roomID) {
  socket.emit("join room", roomID);
}

async function resetTable(roomID) {
  await axios.put(`/api/rooms/${roomID}/reset`, {});
  socket.emit("update", roomID);
}

export { joinRoom, resetTable };
