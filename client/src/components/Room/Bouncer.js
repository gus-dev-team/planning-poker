import { useState, useEffect } from "react";
import { addPlayer, removePlayer } from "../../controllers/playerController.js";
import { checkEmptyness } from "../../controllers/roomController.js";

function Bouncer(props) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSeated, setIsSeated] = useState(false);
  const [name, setName] = useState("");

  // Focus on the input field after clicking "join table".
  useEffect(() => {
    const nameInput = document.getElementById("name-input");

    if (isFormVisible && nameInput) {
      (function () {
        nameInput.focus();
      })();
    }
  }, [isFormVisible]);

  function handleChange(e) {
    setName(e.target.value);
  }

  async function handleJoin(e) {
    e.preventDefault(); // Prevents page redirection.
    addPlayer(name, props.roomID, props.playerID);
    setName("");
    setIsFormVisible(!isFormVisible);
    setIsSeated(!isSeated);
    props.lock();
  }

  function handleCancelation() {
    setName("");
    setIsFormVisible(!isFormVisible);
  }

  function handleLeave() {
    removePlayer(props.roomID, props.playerID);
    checkEmptyness(props.roomID, props.seatedPlayers);
    setIsSeated(!isSeated);
    props.lock();
  }

  return (
    <div>
      {isFormVisible ? (
        <form onSubmit={handleJoin} onReset={handleCancelation}>
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
            <div>
              <button className='table-buttons' onClick={handleLeave}>
                <span className='material-icons'>logout</span>
                <span>leave</span>
              </button>
            </div>
          ) : (
            <button
              id='join-table-button'
              className='table-buttons'
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              <span>join table</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Bouncer;
