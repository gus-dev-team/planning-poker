import socket from "../utils/socket.js";

function joinRoom(roomID) {
  console.log("Controller function 'joinRoom' was called!");
  socket.emit("join socket.io room", roomID);
}

export default joinRoom;
