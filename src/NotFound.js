import React, { Component } from "react";
import firebase from "firebase";
export default class NotFound extends Component {
  componentDidMount() {
    firebase.auth().signOut();
  }
  render() {
    return (
      <div>
        <h2>You dont have access to it</h2>
      </div>
    );
  }
}
