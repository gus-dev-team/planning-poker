import List from "./List.js";
import Bouncer from "./Bouncer.js";
import { resetTable, setIsHidden } from "../../controllers/roomController.js";

export default function Table(props) {
  return (
    <div id='table'>
      <List seatedPlayers={props.seatedPlayers} showResults={!props.isHidden} />

      {!props.disabled && (
        <Admin roomID={props.roomID} isHidden={props.isHidden} />
      )}

      <Bouncer
        roomID={props.roomID}
        playerID={props.playerID}
        lock={props.lock}
      />
    </div>
  );
}

function Admin(props) {
  function handleReset() {
    setIsHidden(props.roomID, true);
    resetTable(props.roomID);
  }

  function handleReveal() {
    setIsHidden(props.roomID, !props.isHidden);
  }

  return (
    <div>
      <button className='table-buttons' onClick={handleReveal}>
        {props.isHidden ? (
          <span className='material-symbols-outlined'>visibility</span>
        ) : (
          <span className='material-symbols-outlined'>visibility_off</span>
        )}
      </button>

      <button className='table-buttons' onClick={handleReset}>
        <span className='material-symbols-rounded'>refresh</span>
        <span>reset</span>
      </button>
    </div>
  );
}
