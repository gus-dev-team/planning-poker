import { Link } from "react-router-dom";

export default function Entrance(props) {
  return (
    <div className='entrance'>
      <div className='new-table-button' onClick={props.getNewTable}>
        <Link to={`/tables/${props.ID}`} onClick={props.getNewTable(props.ID)}>
          new
          <br></br>
          table
        </Link>
      </div>
    </div>
  );
}
