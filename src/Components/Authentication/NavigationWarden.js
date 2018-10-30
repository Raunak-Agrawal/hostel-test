import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import firebase from "firebase";

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);
const NavigationAuth = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link to="/home" className="navbar-brand">
      Jain Hostel Warden
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
      onClick={_ => {
        var toggle = document.getElementById("navbarSupportedContent");
        if (toggle.style.display === "block") {
          toggle.style.display = "none";
        } else {
          toggle.style.display = "block";
        }
      }}
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div
      className="navbar-collapse"
      id="navbarSupportedContent"
      style={{ display: "none" }}
    >
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            GO HOME WARDEN
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/Feeds">
            News Feeds
          </Link>
        </li> */}
        <li className="nav-item">
          <img
            className="rounded-circle"
            style={{ width: "35px", marginRight: "5px" }}
            src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
            alt=""
            title="You must have a Gravatar connected to your email to display an image"
          />
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
  </nav>
);

const NavigationNonAuth = () => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <Link to="/" className="navbar-brand">
        Jain Hostel
      </Link>
    </div>
  </nav>
);

export default Navigation;
