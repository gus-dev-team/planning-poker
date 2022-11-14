import "./styles/Hand.css";

export default function Hand() {
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

  const handOfCards = values.map((value) => {
    return <Card key={value} name={value} />;
  });

  return <div className="hand-of-cards">{handOfCards}</div>;
}

function Card(props) {
  return <button type="button">{props.name}</button>;
}
