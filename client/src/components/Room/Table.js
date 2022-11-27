import "../../App.css";
import React, { useEffect, useState } from "react";
import {
  addPlayer,
  removePlayer,
} from "../../controllers/playersController.js";
// import axios from "axios";
// import socket from "../../utils/socket.js";

export default function Seats(props) {
  return (
    <div className='seats'>
      <List seatedPlayers={props.seatedPlayers} />

      <Bouncer roomID={props.roomID} playerID={props.playerID} />
    </div>
  );
}

function Bouncer(props) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSeated, setIsSeated] = useState(false);
  const [name, setName] = useState("");

  // Focus on the input field after clicking "join table".
  useEffect(() => {
    if (isFormVisible && document.getElementById("name-input")) {
      (function () {
        document.getElementById("name-input").focus();
      })();
    }
  }, [isFormVisible]);

  function handleChange(e) {
    setName(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault(); // Prevents page redirection.
    addPlayer(name, props.roomID, props.playerID);
    setName("");
    setIsFormVisible(!isFormVisible);
    setIsSeated(!isSeated);
  }

  function handleReset() {
    setName("");
    setIsFormVisible(!isFormVisible);
  }

  function handleClick() {
    removePlayer(props.roomID, props.playerID);
    setIsSeated(!isSeated);
  }

  return (
    <div>
      {isFormVisible ? (
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <label htmlFor='name-input'>player name</label>
          <input
            type='text'
            id='name-input'
            name='name'
            autoComplete='off'
            placeholder='enter your username'
            value={name}
            onChange={handleChange}
          />
          <br></br>
          <button type='submit'>join</button>
          <button type='reset'>cancel</button>
        </form>
      ) : (
        <div>
          {isSeated ? (
            <button onClick={handleClick}>
              <span className='material-icons'>logout</span>
              <span>leave table</span>
            </button>
          ) : (
            <button onClick={() => setIsFormVisible(!isFormVisible)}>
              <span className='material-icons'>login</span>
              <span>join table</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function List(props) {
  return (
    <ul>
      {props.seatedPlayers.length < 1 ? (
        <div>empty table</div>
      ) : (
        <div>players seated</div>
      )}

      {props.seatedPlayers.length >= 1 && // See 'conditional rendering' in javascript.
        props.seatedPlayers.map((player) => {
          return (
            <li
              className={"player" + (player.card ? "-ready" : "")}
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
