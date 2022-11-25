import io from "socket.io-client";

const socket = io("localhost:5000");
// Se eu começar a ter problemas com o socket.id mudando,
// comece a averiguar o problema nessa constante.
// Uma ideia seria passar o socket como props.

export default socket;
