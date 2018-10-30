import React from "react";
import firebase from "firebase";
//import { auth } from "../firebase";
import { Link } from "react-router-dom";

const SignOutButton = () => (
  <Link to="/">
    <button
      type="button"
      className="btn btn-outline-none my-2 my-sm-0"
      onClick={() => {
        firebase.auth().signOut();
      }}
    >
      Sign Out
    </button>
  </Link>
);

export default SignOutButton;
