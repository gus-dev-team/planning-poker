import "./App.css";
import Layout from "./Layout";
import Empty from "./components/Empty";
import Entrance from "./components/Entrance";
import Room from "./components/Room";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { nanoid } from "nanoid";
// import axios from "axios";

function App() {
  // const instanceID = nanoid();

  // async function getNewRoom() {
  //   await axios.post("/api/rooms/new", {
  //     ID: instanceID,
  //   });
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
          <Entrance 
            // ID={instanceID}
            // getNewRoom={getNewRoom}
          />}/>
          <Route path={`/rooms/:roomID`} element={<Room />}/>
          <Route path="*" element={<Empty />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/* <Route path="/room/new" element={<Room />}/> */
/* <Route path="/test" element={<Test />} /> */