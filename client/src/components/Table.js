import "./styles/Table.css";

import Dealer from "./table-components/Dealer";
import Hand from "./table-components/Hand";
import Seats from "./table-components/Seats";

function Table() {
  return (
    <div>
      <h2>Table</h2>
      <Dealer />
      <Hand />
      <Seats />
    </div>
  );
}

export default Table;
