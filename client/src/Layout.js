import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
// import { nanoid } from "nanoid";

// async function generateNewTable() {
//   console.log("Reserving a new table...");
//   await axios.post(`/api/tables/${socket.id}`, {
//     ID: `${fixedTemporaryID}`,
//   });
//   socket.emit("new table");
// }

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Entrance</Link>
          </li>
          <li>
            <Link to="/table">New Table</Link>
          </li>
          {/* <li>
            <Link to="/test">Test</Link>
          </li> */}
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
