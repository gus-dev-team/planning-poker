import "./App.css";
import Layout from "./Layout";
import Empty from "./components/Empty";
import Entrance from "./components/Entrance";
import Table from "./components/Table";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { nanoid } from "nanoid";

const ID = nanoid();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout ID={ID}/>}>
          <Route index element={<Entrance />}/>
          {/* <Route path="/table/new" element={<Table />}/> */}
          <Route path={`/tables/:ID`} element={<Table ID={ID}/>}/>
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="*" element={<Empty />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
