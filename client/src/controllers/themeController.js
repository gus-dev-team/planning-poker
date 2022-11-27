import axios from "axios";
import socket from "../utils/socket.js";

async function changeTheme(string) {
  await axios.put("/:roomID/theme", {
    theme: string,
  });
  socket.emit("update");
}

export default changeTheme;
