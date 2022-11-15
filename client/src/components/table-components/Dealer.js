import React, { useState, useEffect } from "react";
import convertSecondstoTime from "../../utils/timeConversor.js";
import "./styles/Dealer.css";

export default function Dealer(props) {
  const [issue, setIssue] = useState("set the table's issue");
  const [timer, setTimer] = useState(3600);

  useEffect(() => {
    if (props.seatStatus) {
      const timerID = setInterval(() => setTimer(timer - 1), 1000);
      return function cleanup() {
        clearInterval(timerID);
      };
    }
  }, [timer, props.seatStatus]);

  function resetTimer() {
    setTimer(3600);
  }

  function changeIssue(string) {
    setIssue(string);
  }

  return (
    <div>
      <Form
        onConfirmation={changeIssue}
        issue={issue}
        isDisabled={!props.seatStatus}
      />

      <div>
        <strong>Time left</strong> {convertSecondstoTime(timer)}
        <button onClick={resetTimer}>reset</button>
      </div>
    </div>
  );
}

function Form(props) {
  const [formStatus, setFormStatus] = useState(false);
  const [issue, setIssue] = useState("");

  useEffect(() => {
    if (formStatus) {
      (function () {
        document.getElementById("issue-input").focus();
      })();
    }
  });

  function handleChange(e) {
    setIssue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevents page redirection.
    props.onConfirmation(issue);
    setIssue("");
    setFormStatus(false);
  }

  return (
    <div>
      {formStatus ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="issue-input">new issue</label>
            <input
              type="text"
              id="issue-input"
              name="name"
              autoComplete="off"
              placeholder="Enter the proposed issue..."
              value={issue}
              onChange={handleChange} // Pede um parâmetro onChange ou readOnly.
            />
            <button type="submit">ok</button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setFormStatus(!formStatus)}
          disabled={props.isDisabled}
        >
          {props.issue}
        </button>
      )}
    </div>
  );
}
