import socket from "../utils/socket.js";

function joinRoom(roomID) {
  socket.emit("join room", roomID);
}

export default joinRoom;
