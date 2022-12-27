import Card from "./Card";

function List(props) {
  const seatedPlayers = props.seatedPlayers;
  const length = seatedPlayers && seatedPlayers.length;

  function isValid(card) {
    switch (card) {
      case "":
      case "?":
        return false;

      default:
        return true;
    }
  }

  function computeAverage() {
    const playedCards = seatedPlayers.reduce(
      (accumulator, value) => {
        if (isValid(value.card)) {
          accumulator.valid += 1;

          if (value.card === "½") {
            accumulator.total += 0.5;
          } else {
            accumulator.total += Number(value.card);
          }
        }
        return { total: accumulator.total, valid: accumulator.valid };
      },
      { total: 0, valid: 0 }
    );

    return playedCards.total / playedCards.valid;
  }

  return (
    <ul>
      <div>players seated</div>
      {props.showResults && <div>average: {computeAverage()}</div>}
      {length < 1 && <div>empty table</div>}

      {length >= 1 &&
        props.seatedPlayers.map((player) => {
          return (
            <li
              className={"player" + (player.card ? "-ready" : "")}
              key={player.ID}
            >
              {player.card ? (
                // <span className='material-icons'>check_circle</span>
                <Card
                  key={player.ID}
                  value={player.card}
                  owner={player.name}
                  revealOwner={true}
                  isFacingUp={props.showResults}
                  isSelected={true}
                  onClick={() => {}}
                  width='44px'
                  height='66px'
                />
              ) : (
                <div>
                  <div className='still-choosing'></div>
                  <div className='owner'>{player.name}</div>
                </div>
              )}
            </li>
          );
        })}
    </ul>
  );
}

export default List;
