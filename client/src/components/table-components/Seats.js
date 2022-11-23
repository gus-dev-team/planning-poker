import "../../App.css";
import React, { useEffect, useState } from "react";

export default function Seats(props) {
  const [seatStatus, setSeatStatus] = useState(false);
  // 'true' means 'occupied' by the current user

  // useEffect(() => {}, [props.seatedPlayers]);

  function leaveTable() {
    //
  }

  return (
    <div className='seats'>
      <SeatedPlayers
        list={props.seatedPlayers || []}
        seatedPlayers={props.seatedPlayers}
      />

      {seatStatus ? (
        <button onClick={leaveTable}>
          <span className='material-icons'>logout</span>
          {/* <span>leave</span> */}
        </button>
      ) : (
        <JoinTable
          onConfirmation={props.joinTable}
          toggleSeatStatus={() => setSeatStatus(!seatStatus)}
        />
      )}
    </div>
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
    props.toggleSeatStatus();
  }

  return (
    <div>
      {formStatus ? (
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
      ) : (
        <button onClick={() => setFormStatus(!formStatus)}>
          <span className='material-icons'>login</span>
          {/* <span>join table</span> */}
        </button>
      )}
    </div>
  );
}

function SeatedPlayers(props) {
  return (
    <ul>
      {!props.seatedPlayers || props.seatedPlayers.length < 1 ? (
        <div>This table is empty...</div>
      ) : (
        <div>players seated</div>
      )}

      {/* This is called conditional rendering... */}
      {/* It works because in JavaScript,
      true && expression always evaluates to expression,
      and false && expression always evaluates to false. */}
      {(props.seatedPlayers || props.seatedPlayers.length >= 1) &&
        props.list.map((player) => {
          return (
            <li
              // className={"player" + (player.card ? "-ready" : "")} // not currently in use
              key={player.ID}
            >
              {player.card ? (
                <span className='material-icons'>check_circle</span>
              ) : (
                <span className='material-icons'>radio_button_unchecked</span>
              )}
              {player.name}
            </li>
          );
        })}
    </ul>
  );
}
