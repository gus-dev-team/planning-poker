import "../../App.css";
import React, { useEffect, useState } from "react";

export default function Seats(props) {
  useEffect(() => {}, [props.seatedPlayers]);

  return (
    <div className='seats'>
      {!props.seatedPlayers || props.seatedPlayers.length < 1 ? (
        <p>Nobody is here...</p>
      ) : (
        <p>Players seated...</p>
      )}

      <SeatedPlayers list={props.seatedPlayers || []} />

      <JoinTable onConfirmation={props.joinTable} />
    </div>
  );
}

function SeatedPlayers(props) {
  return (
    <ul className='player-list'>
      {props.list.map((player) => {
        return (
          <li
            className={"player" + (player.card ? "-ready" : "")}
            key={player.ID}
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
            <label htmlFor='name-input'>player name</label>
            <input
              type='text'
              id='name-input'
              name='name'
              autoComplete='off'
              placeholder='enter your username'
              value={playerName}
              onChange={handleChange}
            />
            <button type='submit'>sit</button>
          </form>
        </div>
      ) : (
        <button onClick={() => setFormStatus(!formStatus)}>join table</button>
      )}
    </div>
  );
}
