import React, { useEffect, useState } from "react";
import { addPlayer, removePlayer } from "../../controllers/playerController.js";

export default function Table(props) {
  // const [showResults, setShowResults] = useState(false);

  return (
    <div id='table'>
      {/* {showResults && <div>average: </div>} */}
      <List seatedPlayers={props.seatedPlayers} />

      <Bouncer
        roomID={props.roomID}
        playerID={props.playerID}
        lock={props.lock}
      />
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
    props.lock();
  }

  function handleReset() {
    setName("");
    setIsFormVisible(!isFormVisible);
  }

  // Removes the player.
  function handleClick() {
    removePlayer(props.roomID, props.playerID);
    setIsSeated(!isSeated);
    props.lock();
  }

  return (
    <div>
      {isFormVisible ? (
        <form onSubmit={handleSubmit} onReset={handleReset}>
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
          <button className='table-buttons' type='submit'>
            join
          </button>
          <button className='table-buttons' type='reset'>
            cancel
          </button>
        </form>
      ) : (
        <div>
          {isSeated ? (
            <button className='table-buttons' onClick={handleClick}>
              <span className='material-icons'>logout</span>
              <span>leave table</span>
            </button>
          ) : (
            <button
              id='join-table-button'
              className='table-buttons'
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              {/* <span className='material-icons'>login</span> */}
              <span>join table</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function List(props) {
  const seatedPlayers = props.seatedPlayers;
  const length = seatedPlayers && seatedPlayers.length;
  return (
    <ul>
      <div>players seated</div>
      {length < 1 && <div>empty table</div>}

      {length >= 1 && // See 'conditional rendering' in javascript.
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
              {player.name} {player.card && <span>{player.card}</span>}
            </li>
          );
        })}
    </ul>
  );
}

// Ideia para o futuro...
// function MiniCard(props) {
//   return (
//     <button
//       className={
//         "card" +
//         (props.played ? "-selected" : "") +
//         (props.disabled ? "-disabled" : "")
//       }
//       onClick={() => {
//         updateCard(props.roomID, props.playerID, props.name);
//       }}
//       disabled={props.disabled}
//     >
//       {!props.disabled && props.name}
//     </button>
//   );
// }