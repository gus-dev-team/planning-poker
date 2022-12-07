// import { Link } from "react-router-dom";
import axios from "axios";
// import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Entrance(props) {
  const navigate = useNavigate();
  return (
    <div className='entrance'>
      <div
        className='new-room-button'
        onClick={async () => {
          const res = await axios.get("/api/rooms/new");
          if (res.data.redirect) {
            console.log("Imma redirect!!");
            navigate(res.data.redirect);
          }
        }}
      >
        new room
      </div>
    </div>
  );
}
