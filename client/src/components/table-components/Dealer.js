import "../../App.css";
import React, { useState, useEffect } from "react";
import convertSecondstoTime from "../../utils/timeConversor.js";
import "./styles/Dealer.css";

export default function Dealer(props) {
  return (
    <div className='dealer'>
      <Issue
        onConfirmation={props.setIssue}
        issue={props.issue}
        // isDisabled={!props.seatStatus}
      />

      <Timer
        duration={props.roundDuration}
        // status={props.seatStatus}
      />
    </div>
  );
}

function Issue(props) {
  const [formStatus, setFormStatus] = useState(false);
  const [issue, setIssue] = useState("");

  useEffect(() => {
    if (formStatus && document.getElementById("issue-input")) {
      (function () {
        document.getElementById("issue-input").focus();
      })();
    }
    // When the timer is running, the page renders every second.
    // The second parameter here is to prevent the focus being stuck on the input element.
  }, [formStatus]);

  function handleChange(e) {
    setIssue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevents page redirection.
    props.onConfirmation(issue);
    setIssue("");
    setFormStatus(false);
  }

  function toggleForm() {
    if (!formStatus) {
      setFormStatus(!formStatus);
    }
  }

  return (
    <div className='issue' onClick={toggleForm}>
      {formStatus ? (
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor='issue-input'>new issue</label> */}
          <input
            type='text'
            id='issue-input'
            name='name'
            autoComplete='off'
            placeholder='Enter the proposed issue...'
            value={issue}
            onChange={handleChange}
          />
          <button type='submit' style={{ display: "none" }}>
            ok
          </button>
        </form>
      ) : (
        <div>{props.issue}</div>
      )}
    </div>
  );
}

function Timer(props) {
  const [timer, setTimer] = useState(props.duration);

  useEffect(() => {
    if (props.status) {
      const timerID = setInterval(() => setTimer(timer - 1), 1000);
      return function cleanup() {
        clearInterval(timerID);
      };
    }
  }, [timer, props.status]);

  function toggleTimer() {}

  function resetTimer() {
    setTimer(props.duration);
  }

  return (
    <div className='timer'>
      <div>{convertSecondstoTime(timer)}</div>
      <div>
        <button onClick={toggleTimer}>
          <span class='material-icons'>play_arrow</span>
        </button>
        <button onClick={resetTimer}>
          <span class='material-icons'>replay</span>
        </button>
      </div>
    </div>
  );
}
