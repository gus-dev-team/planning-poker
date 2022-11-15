import { Outlet, Link } from "react-router-dom";

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
          <li>
            <Link to="/test">Test</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
