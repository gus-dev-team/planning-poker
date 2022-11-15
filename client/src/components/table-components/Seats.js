import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./styles/Seats.css";

export default function Seats(props) {
  const [seatedPlayers, setSeatedPlayers] = useState([]);

  useEffect(() => {}, [seatedPlayers]);

  const sitPlayerDown = (name) => {
    setSeatedPlayers([...seatedPlayers, { name: name, UUID: nanoid() }]);
    props.toggleSeatStatus();
  };

  return (
    <div>
      {seatedPlayers.length < 1 ? (
        <p>Nobody is here...</p>
      ) : (
        <p>Players seated...</p>
      )}

      <SeatedPlayers list={seatedPlayers} />

      <Form onConfirmation={sitPlayerDown} />
    </div>
  );
}

function SeatedPlayers(props) {
  return (
    <ul>
      {props.list.map((player) => {
        return <li key={player.UUID}>{player.name}</li>;
      })}
    </ul>
  );
}

function Form(props) {
  // If formStatus is 'false', then the form is hidden.
  const [formStatus, setFormStatus] = useState(false);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    if (formStatus) {
      (function () {
        document.getElementById("name-input").focus();
      })();
    }
  });

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
            <label htmlFor="name-input">label</label>
            <input
              type="text"
              id="name-input"
              name="name"
              autoComplete="off"
              placeholder="enter your username"
              value={playerName}
              onChange={handleChange} // Pede um parâmetro onChange ou readOnly.
            />
            <button type="submit">sit</button>
          </form>
        </div>
      ) : (
        <button onClick={() => setFormStatus(!formStatus)}>join</button>
      )}
    </div>
  );
}
