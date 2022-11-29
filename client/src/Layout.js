import "./App.css";
import { Link, Outlet } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
      <header>
        <div>
          <h1>
            <Link to='/'>
              Planning<br></br>&diams; Poker &diams;
            </Link>
          </h1>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      {/* Footer */}
    </>
  );
};

export default Layout;
