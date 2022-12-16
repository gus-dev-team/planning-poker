import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Entrance(props) {
  const navigate = useNavigate();

  const createNewRoom = async function () {
    const res = await axios.get("/api/rooms/new");
    if (res.data.redirect) {
      navigate(res.data.redirect);
    }
  };

  return (
    <div className='entrance'>
      <div className='new-room-button' onClick={createNewRoom}>
        new room
      </div>
    </div>
  );
}
