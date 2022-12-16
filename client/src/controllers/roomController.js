import axios from "axios";
import socket from "../utils/socket.js";

function joinServerRoom(roomID) {
  socket.emit("join room", roomID);
}

async function resetTable(roomID) {
  await axios.put(`/api/rooms/${roomID}/reset`, {});
  socket.emit("update", roomID);
}

async function setIsHidden(roomID, boolean) {
  await axios.put(`/api/rooms/${roomID}/hidden`, {
    isHidden: boolean,
  });
  socket.emit("update", roomID);
}

function autoRevealer(roomID, seatedPlayers) {
  const playersChoosing = () => {
    return seatedPlayers.filter((player) => player.card === "").length;
  };
  console.log(playersChoosing());
  if (!playersChoosing() && seatedPlayers.length) {
    setIsHidden(roomID, false);
  }
  socket.emit("update", roomID);
}

function checkEmptyness(roomID, seatedPlayers) {
  if (typeof seatedPlayers === "undefined" || seatedPlayers.length < 1)
    setIsHidden(roomID, true);
  socket.emit("update", roomID);
}

export {
  joinServerRoom,
  resetTable,
  setIsHidden,
  autoRevealer,
  checkEmptyness,
};
