import React, { useEffect, useState } from "react";
import "./styles/Seats.css";

export default function Seats(props) {
  useEffect(() => {}, [props.seatedPlayers]);

  return (
    <div>
      {props.seatedPlayers.length < 1 ? (
        <p>Nobody is here...</p>
      ) : (
        <p>Players seated...</p>
      )}

      <SeatedPlayers list={props.seatedPlayers} />

      <JoinTable onConfirmation={props.sitPlayerDown} />
    </div>
  );
}

function SeatedPlayers(props) {
  return (
    <ul className="player-list">
      {props.list.map((player) => {
        return (
          <li
            className={"player" + (player.card ? "-ready" : "")}
            key={player.UUID}
          >
            {player.name}
          </li>
        );
      })}
    </ul>
  );
}

function JoinTable(props) {
  // If formStatus is 'false', then the form is hidden.
  const [formStatus, setFormStatus] = useState(false);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    if (formStatus && document.getElementById("name-input")) {
      (function () {
        document.getElementById("name-input").focus();
      })();
    }
    // When the timer is running, the page renders every second.
    // The second parameter here is to prevent the focus being stuck on the input element.
  }, [formStatus]);

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevents page redirection.
    props.onConfirmation(playerName);
    setPlayerName("");
    setFormStatus(false);
  }

  return (
    <div>
      {formStatus ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name-input">player name</label>
            <input
              type="text"
              id="name-input"
              name="name"
              autoComplete="off"
              placeholder="enter your username"
              value={playerName}
              onChange={handleChange}
            />
            <button type="submit">sit</button>
          </form>
        </div>
      ) : (
        <button onClick={() => setFormStatus(!formStatus)}>join table</button>
      )}
    </div>
  );
}
