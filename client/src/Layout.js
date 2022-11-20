// import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { nanoid } from "nanoid";
import axios from "axios";

const Layout = (props) => {
  const newID = nanoid();

  async function getNewTable() {
    await axios.post("/api/tables/new", {
      ID: newID,
    });
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Entrance</Link>
          </li>

          <li>
            <Link to={`/tables/${newID}`} onClick={getNewTable}>
              New Table
            </Link>
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
