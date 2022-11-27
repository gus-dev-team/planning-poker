import "../../App.css";
import { updateCard } from "../../controllers/playerController.js";

export default function Hand(props) {
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

  const seatedPlayers = props.seatedPlayers.find(
    (player) => player.ID === props.playerID
  );
  const playerCard = seatedPlayers && seatedPlayers.card;

  const cards = values.map((value) => {
    return (
      <Card
        key={value}
        name={value}
        played={value === playerCard ? true : false}
        roomID={props.roomID}
        playerID={props.playerID}
      />
    );
  });

  return <div className='hand'>{cards}</div>;
}

function Card(props) {
  return (
    <button
      className={"card" + (props.played ? "-selected" : "")}
      onClick={() => {
        updateCard(props.roomID, props.playerID, props.name);
      }}
    >
      {props.name}
    </button>
  );
}
