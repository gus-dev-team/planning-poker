// import { Link } from "react-router-dom";
import axios from "axios";
// import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Entrance(props) {
  const navigate = useNavigate();
  return (
    <div className='entrance'>
      <div className='new-room-button'>
        <button // Era um Link
          // to={`/rooms/${props.ID}`}
          onClick={async () => {
            const res = await axios.get("/api/rooms/new");
            if (res.data.redirect) {
              console.log("Imma redirect!!");
              // return redirect(res.data.redirect);
              navigate(res.data.redirect);
            }
          }}
        >
          new
          {/* <br></br> */}
          room
        </button>
      </div>
    </div>
  );
}
