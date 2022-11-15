import { useState } from "react";
import { nanoid } from "nanoid";
import "./styles/Table.css";

import Dealer from "./table-components/Dealer";
import Hand from "./table-components/Hand";
import Seats from "./table-components/Seats";

function Table() {
  // The avatar is to differentiate 'you' from the other players.
  // Veja que posso retirar o setSeatStatus... e trocar por algo que use o avatar.
  const [avatar, setAvatar] = useState(null);
  const [issue, setIssue] = useState("set the table's issue");

  const [duration, setDuration] = useState(3600);

  const [seatStatus, setSeatStatus] = useState(false);
  const [seatedPlayers, setSeatedPlayers] = useState([]);

  function toggleSeatStatus() {
    setSeatStatus(true);
    // Also needs to send POST request to the database.
  }

  function sitPlayerDown(name) {
    const newPlayer = { name: name, UUID: nanoid(), card: "" };
    setSeatedPlayers([...seatedPlayers, newPlayer]);
    setAvatar(newPlayer);
    toggleSeatStatus();
  }

  function changeStatus(card) {}

  return (
    <div>
      <h2>Table</h2>
      <Dealer
        issue={issue}
        setIssue={(string) => setIssue(string)}
        seatStatus={seatStatus}
        duration={duration}
      />
      <Hand changeStatus={changeStatus} />
      <Seats
        seatStatus={seatStatus}
        seatedPlayers={seatedPlayers}
        sitPlayerDown={sitPlayerDown}
      />
    </div>
  );
}

export default Table;
