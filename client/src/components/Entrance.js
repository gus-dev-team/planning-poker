import { Link } from "react-router-dom";

export default function Entrance(props) {
  return (
    <div className='entrance'>
      <div className='new-room-button'>
        <Link to={`/rooms/${props.ID}`} onClick={() => props.getNewRoom()}>
          new
          <br></br>
          room
        </Link>
      </div>
    </div>
  );
}
