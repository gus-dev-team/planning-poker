import axios from "axios";
import socket from "../utils/socket.js";

async function updateTheme(roomID, string) {
  await axios.put(`/api/rooms/${roomID}/theme`, {
    theme: string,
  });
  socket.emit("update");
}

export default updateTheme;
