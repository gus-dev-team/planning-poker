import "./App.css";
import { Link, Outlet } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
      <header>
        <div>
          <h1 style={{ textDecoration: "underline" }}>
            <Link to='/'>PlanningP&diams;ker</Link>
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
