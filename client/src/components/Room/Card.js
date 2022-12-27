function Card(props) {
  return (
    <div>
      <div
        className={
          "card" +
          (props.isFacingUp ? "-facingUp" : "-facingDown") +
          (props.isSelected ? "-selected" : "")
        }
        onClick={props.onClick}
        disabled={props.isFacingUp}
        style={{ width: props.width, height: props.height }}
      >
        <div>
          <div className='inner-border'>{props.isFacingUp && props.value}</div>
        </div>
      </div>
      {props.revealOwner ? (
        <div className='owner'>{props.owner}</div>
      ) : (
        <div style={{ display: "none" }}></div>
      )}
    </div>
  );
}

export default Card;
