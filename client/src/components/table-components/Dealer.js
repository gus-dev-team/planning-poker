import React, { useState, useEffect } from "react";
import convertSecondstoTime from "../../utils/timeConversor.js";
import "./styles/Dealer.css";

export default function Dealer() {
  const [issue, setIssue] = useState("Click/Tap here to set table's issue...");
  const [timer, setTimer] = useState(3600 * 13 - 1);

  useEffect(() => {
    const timerID = setInterval(() => setTimer(timer - 1), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [timer]);

  return (
    <div>
      <h3>{issue}</h3>
      <div>
        <strong>Time left</strong> {convertSecondstoTime(timer)}
      </div>
    </div>
  );
}
