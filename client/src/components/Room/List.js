import Card from "./Card";

function List(props) {
  const seatedPlayers = props.seatedPlayers;
  const length = seatedPlayers && seatedPlayers.length;

  function computeAverage() {
    const playedCards = seatedPlayers
      // Get the card values.
      .map((player) => {
        if (player.card === "½") {
          return "0.5"; // For easier number conversion.
        }
        return player.card;
      })
      // Excludes the players that did not vote or voted on "?".
      .filter((card) => {
        switch (card) {
          case "":
          case "?":
            return false;

          default:
            return true;
        }
      })
      .map((string) => Number(string));
    return playedCards.reduce((a, b) => a + b, 0) / playedCards.length;
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
