import "./App.css";
import Layout from "./Layout";
import Empty from "./components/Empty";
import Entrance from "./components/Entrance";
import Table from "./components/Table";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { nanoid } from "nanoid";
import axios from "axios";

function App() {
  const instanceID = nanoid();

  async function getNewTable() {
    await axios.post("/api/tables/new", {
      ID: instanceID,
    });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Entrance ID={instanceID} getNewTable={getNewTable}/>}/>
          <Route path={`/tables/:ID`} element={<Table />}/>
          <Route path="*" element={<Empty />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/* <Route path="/table/new" element={<Table />}/> */
/* <Route path="/test" element={<Test />} /> */