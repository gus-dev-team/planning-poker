import { nanoid } from "nanoid";

const playerID = nanoid();
// playerID is the current session's user ID
// is defined globally so it persists through renderization

export default playerID;
