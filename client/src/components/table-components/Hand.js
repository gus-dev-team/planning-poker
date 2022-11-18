import "./styles/Hand.css";

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
    return <Card key={value} name={value} play={props.play} />;
  });

  return <div className="cards">{cards}</div>;
}

function Card(props) {
  return (
    <button
      type="button"
      onClick={() => props.play(props.name)}
      className="card"
    >
      {props.name}
    </button>
  );
}
