import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../pages/Auth/Auth";
import { NavLink } from "react-router-dom";
function Header() {
  const user = JSON.parse(localStorage.getItem("username"));

  const navigate = useNavigate();
  const auth = useAuth();

  const hanldeLogout = () => {
    auth.logout();
    localStorage.removeItem("username");
    alert("Do you want to Logout");
    navigate("/"); // Call the logout function from the authentication context
  };

  return (
    <div className="header-list">
      <div className="nav-username">
        <NavLink
          style={{ textDecoration: "none", color: "white" }}
          to={"/watchlist"}
        >
          Watchlist
        </NavLink>
        <div className="orders-nav">
        <NavLink
          style={{ textDecoration: "none", color: "white" }}
          to={"/orders"}
        >
          Orders
        </NavLink>
        </div>
      </div>

      {/* Conditionally display the admin username */}
      <div>{user}</div>

      <NavLink
        onClick={hanldeLogout} // Attach a click event to trigger logout
        style={{ textDecoration: "none", color: "white" }}
        className="log-out"
        to={"/"}
      >
        Logout
      </NavLink>
    </div>
  );
}
export default Header;
