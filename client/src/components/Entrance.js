import { Link } from "react-router-dom";

export default function Entrance(props) {
  return (
    <div className='entrance'>
      <div className='new-table-button'>
        <Link to={`/tables/${props.ID}`} onClick={() => props.getNewTable()}>
          new
          <br></br>
          table
        </Link>
      </div>
    </div>
  );
}
