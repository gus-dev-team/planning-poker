import socket from "../utils/socket.js";

function joinSocketIORoom(roomID) {
  console.log("User successfully joined Socket.io room...");
  socket.emit("join socket.io room", roomID);
}

export default joinSocketIORoom;
