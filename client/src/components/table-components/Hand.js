import "../../App.css";

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

  const cards = values.map((value) => {
    return (
      <Card
        key={value}
        name={value}
        play={props.play}
        played={value === props.playedCard ? true : false}
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
        props.play(props.name);
      }}
    >
      {props.name}
    </button>
  );
}
