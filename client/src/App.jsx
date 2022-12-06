import "./App.css";
import Layout from "./Layout";
import Empty from "./components/Empty";
import Entrance from "./components/Entrance";
import Room from "./components/Room";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
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
