import React from "react";
import "./styles/Dealer.css";

function Dealer() {
  const [issue, setIssue] = React.useState(
    "Click/Tap here to set table's issue..."
  );
  const [timer, setTimer] = React.useState("00:00:00");
  return (
    <div>
      <h3>{issue}</h3>
      <div>
        <strong>Time left</strong> {timer}
      </div>
    </div>
  );
}

export default Dealer;
