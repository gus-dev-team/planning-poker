import "./App.css";
import { Link, Outlet } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
      <header
      // style={
      //   document.URL === "http://localhost:3000/"
      //     ? { height: "50vh" }
      //     : { height: "auto" }
      // }
      >
        <div>
          <h1 style={{ textDecoration: "underline" }}>
            <Link to='/'>PlanningP&diams;ker</Link>
          </h1>
          {/* <div
            style={
              document.URL === "http://localhost:3000/"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            0 ½ 1 2 3 5 8 13 21 34 &infin; ?
          </div> */}
        </div>

        {/* <nav>
          <ul>
            <li>
              <Link to="/">Entrance</Link>
            </li>
            <li>
              <Link
                to={`/tables/${newID}`}
                onClick={props.getNewTable(props.ID)}
              >
                New Table
              </Link>
            </li>
            <li>
              <Link to={"/empty"}>Empty</Link>
            </li>
          </ul>
        </nav> */}
      </header>

      <main>
        <Outlet />
      </main>

      {/* <footer>Footer</footer> */}
    </>
  );
};

export default Layout;
