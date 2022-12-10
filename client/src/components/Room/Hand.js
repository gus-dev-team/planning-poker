import { updateCard } from "../../controllers/playerController.js";
import Card from "./Card.js";

function Hand(props) {
  // List of the value of each card in hand.
  const values = [
    "0",
    "½",
    "1",
    "2",
    "3",
    "5",
    "8",
    "13",
    "20",
    "40",
    "99",
    "?",
  ];

  const seatedPlayers = props.seatedPlayers;
  const player =
    seatedPlayers &&
    seatedPlayers.find((player) => player.ID === props.playerID);
  const playerCard = player && player.card;
  const playerName = player && player.name;

  const cards = values.map((value) => {
    return (
      <Card
        key={value}
        value={value}
        owner={playerName}
        revealOwner={false}
        isFacingUp={!props.disabled}
        isSelected={value === playerCard ? true : false}
        onClick={() => updateCard(props.roomID, props.playerID, value)}
        width='66px'
        height='99px'
      />
    );
  });

  return <div className='hand'>{cards}</div>;
}

export default Hand;
