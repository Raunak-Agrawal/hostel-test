import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var config = {
  apiKey: "AIzaSyAfYCHmHZMw-xC0I9NsU2pxlYRW83GgYmM",
  authDomain: "auth-7f72c.firebaseapp.com",
  databaseURL: "https://auth-7f72c.firebaseio.com",
  projectId: "auth-7f72c",
  storageBucket: "auth-7f72c.appspot.com",
  messagingSenderId: "356229365648"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
