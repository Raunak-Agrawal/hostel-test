import React, { Component } from "react";
// import "./App.css";
import { Link } from "react-router-dom";
import firebase from "firebase";

var config = {
  apiKey: "AIzaSyAfYCHmHZMw-xC0I9NsU2pxlYRW83GgYmM",
  authDomain: "auth-7f72c.firebaseapp.com",
  databaseURL: "https://auth-7f72c.firebaseio.com",
  projectId: "auth-7f72c",
  storageBucket: "auth-7f72c.appspot.com",
  messagingSenderId: "356229365648"
};
firebase.initializeApp(config);
var db = firebase.firestore();
var outpassSubmitRef = db.collection("outpassSubmit");
var permission1 = db.collection("permission");

class Outpass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purpose: "",
      indate: "",
      outdate: "",
      intime: "",
      outtime: "",
      status: "",
      data: [],
      more: [],
      more1: []
    };
  }

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    // console.log(e.target.name);
  };

  handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    var value = "";
    var scope1 = this;
    var USN = "";
    if (this.state.data) {
      USN = this.state.data.usn;
      //console.log(uid1);
    } else {
      //console.log("data empty");
    }

    db.collection("outpassSubmit")
      .where("usn", "==", USN)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          value = doc.data();
        });
        if (value.usn) {
          alert("already submitted");
        } else {
          var newoutpassSubmitRef = outpassSubmitRef;
          newoutpassSubmitRef.add({
            username: scope1.state.data.username,
            usn: scope1.state.data.usn,
            room: scope1.state.data.roomNo,
            block: scope1.state.data.block,
            purpose: scope1.state.purpose,
            indate: scope1.state.indate,
            outdate: scope1.state.outdate,
            intime: scope1.state.intime,
            outtime: scope1.state.outtime,
            status: "Pending",
            comment: "",
            createdate: Date.now()
          });

          permission1.add({
            username: scope1.state.data.username,
            usn: scope1.state.data.usn,
            room: scope1.state.data.roomNo,
            block: scope1.state.data.block,
            purpose: scope1.state.purpose,
            indate: scope1.state.indate,
            outdate: scope1.state.outdate,
            intime: scope1.state.intime,
            outtime: scope1.state.outtime,
            status: "Pending",
            comment: "",
            createdate: Date.now()
          });
          scope1.setState({
            purpose: "",
            indate: "",
            outdate: "",
            intime: "",
            outtime: "",
            status: "Pending"
          });
        }
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  render() {
    var scope = this;
    var value;
    var db = firebase.firestore();
    var current = firebase.auth().currentUser;
    // console.log(current);
    var uid1 = "";
    if (current) {
      uid1 = current.email;
      //console.log(uid1);
    } else {
      console.log("data empty");
    }

    db.collection("Details")
      .where("email", "==", uid1)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          //console.log(doc.id, " => ", doc.data());
          //value = doc.data();
          //console.log(value);

          scope.setState({
            data: doc.data()
          });
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
    //console.log(this.state.data);
    return (
      <div>
        <div className="nav">
          <div className="nav-element">
            <div className="nav-element1">
              <Link to="home">
                <img
                  src={require("../../img/ustech1.png")}
                  alt="banner"
                  height="80"
                  width="80"
                />
              </Link>
            </div>
            <div className="nav-element2" />
            <div className="nav-element3">
              <div className="nav-element3-1">
                <div class="dropdown-content">
                  <hr />
                </div>
              </div>
              <div className="nav-element3-2" />
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <Link to="home" class=" backbtn btn btn-light">
                Go Back
              </Link>
              <h1 class="display-4 text-center">Fill Your Outpass</h1>
              <p class="lead text-center">Easy way to submit your outpass </p>
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-xs"
                    //placeholder="* First Name"
                    //onChange={this.onChange}
                    name={this.state.data.username}
                    value={this.state.data.username}
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-xs"
                    // placeholder="* USN"
                    name={this.state.data.usn}
                    value={this.state.data.usn}
                  />{" "}
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-xs"
                    // placeholder="* Block"
                    name={this.state.data.block}
                    value={this.state.data.block}
                  />{" "}
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-xs"
                    // placeholder="* Room No"
                    name={this.state.data.roomNo}
                    value={this.state.data.roomNo}
                  />
                </div>
                <h6>Out Date</h6>
                <div class="form-group">
                  <input
                    type="date"
                    class="form-control form-control-xs"
                    placeholder="Outdate"
                    onChange={this.onChange}
                    name="outdate"
                    value={this.state.outdate}
                  />
                </div>
                <h6>In Date</h6>
                <div class="form-group">
                  <input
                    type="date"
                    class="form-control form-control-xs"
                    placeholder="Indate"
                    onChange={this.onChange}
                    name="indate"
                    value={this.state.indate}
                  />
                </div>
                <h6>Out Time</h6>

                <div class="form-group">
                  <input
                    type="time"
                    class="form-control form-control-xs"
                    placeholder="Outtime"
                    onChange={this.onChange}
                    name="outtime"
                    value={this.state.outtime}
                  />
                </div>
                <h6>In Time</h6>

                <div class="form-group">
                  <input
                    type="time"
                    class="form-control form-control-xs"
                    placeholder="Intime"
                    onChange={this.onChange}
                    name="intime"
                    value={this.state.intime}
                  />
                </div>

                <div class="form-group">
                  <textarea
                    class="form-control form-control-xs"
                    placeholder="Purpose"
                    onChange={this.onChange}
                    name="purpose"
                    value={this.state.purpose}
                  />
                </div>
                <input type="submit" class="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Outpass;
