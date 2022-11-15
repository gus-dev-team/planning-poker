import { useState } from "react";
import "./styles/Table.css";

import Dealer from "./table-components/Dealer";
import Hand from "./table-components/Hand";
import Seats from "./table-components/Seats";

function Table() {
  const [seatStatus, setSeatStatus] = useState(false);

  function ToggleSeatStatus() {
    setSeatStatus(true);
    // Also needs to send POST request to the database.
  }

  return (
    <div>
      <h2>Table</h2>
      <Dealer seatStatus={seatStatus} />
      <Hand />
      <Seats seatStatus={seatStatus} toggleSeatStatus={ToggleSeatStatus} />
    </div>
  );
}

export default Table;
