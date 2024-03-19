import { NavLink } from "react-router-dom";
import { useAuth } from "../../security/AuthProvider";
import "./navHeader.css";

export default function NavHeader() {
  const auth = useAuth();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/cinemas">Cinemas</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
        {!auth.isLoggedIn() && (
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
        )}
        {auth.isLoggedIn() && (
          <li>
            <NavLink to="/logout">Log Out</NavLink>
          </li>
        )}
        {auth.isLoggedIn() && (
          <li>
            <NavLink to="/add">Edit users</NavLink>
          </li>
        )}
        <li>
          <img
            className="popping"
            src="src/assets/popcorn.png"
            alt="popcorn logo"
          />
        </li>
      </ul>
    </nav>
  );
}
