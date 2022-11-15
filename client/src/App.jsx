import "./App.css";

import Layout from "./Layout";

import Empty from "./components/Empty";
import Entrance from "./components/Entrance";
import Table from "./components/Table";
import Test from "./components/Test";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Entrance />}/>
          <Route path="/table" element={<Table />}/>
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<Empty />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
