import io from "socket.io-client";

const ENDPOINT = "http://localhost:3333";

const socket = io(ENDPOINT);

export default socket;
