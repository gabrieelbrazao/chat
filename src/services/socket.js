import io from "socket.io-client";
import { API_URI } from "react-native-dotenv";

const socket = io(API_URI);

export default socket;
