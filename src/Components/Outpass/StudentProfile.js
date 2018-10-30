import React, { Component } from "react";
//import "./App.css";
import { Link } from "react-router-dom";
import firebase from "firebase";

var db = firebase.firestore();
var current = "";
var uid1 = "";
class StudentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: ""
    };
  }
  componentDidMount() {
    //   var scope =  this;
    //     // console.log(this.data.state.historyTable)
    //     current = firebase.auth().currentUser;
    //     // console.log(current);
    //    if (current) {
    //      uid1 = current.email;
    //    console.log(uid1);
    //    } else {
    //      console.log("data empty");
    //    }
    //      db.collection("studentstatus").where("email", "==", uid1)
    //      .get()
    //      .then(snapshot => {
    //        snapshot.forEach(doc => {
    //         console.log(doc.id, "=>", doc.data());
    //          scope.setState({
    //            statusTable: this.state.statusTable.concat(doc.data())
    //          });
    //          console.log(this.state.statusTable)
    //        });
    //      })
    //      .catch(err => {
    //        console.log("Error getting documents", err);
    //      });
    const images = firebase
      .storage()
      .ref()
      .child("Photos");
    const image = images.child("image");
    image.getDownloadURL().then(url => console.log(url));
  }

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
      //console.log("data empty");
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
    return (
      <div>
        <div class="row">
          <Link to="/Home" class=" backbtn btn btn-light">
            Go Back
          </Link>
          <div class="col-md-12">
            <div class="card card-body bg-info text-white mb-3">
              <div class="row">
                <div class="col-4 col-md-3 m-auto">
                  <img
                    class="rounded-circle"
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                    alt=""
                  />
                </div>
              </div>
              <div class="text-center">
                <h1 class="display-4 text-center">
                  {this.state.data.username}
                </h1>
                <p class="lead text-center">{this.state.data.usn}</p>
                <p>Seattle, WA</p>
                <p>
                  <a class="text-white p-2" href="#">
                    <i class="fas fa-globe fa-2x" />
                  </a>
                  <a class="text-white p-2" href="#">
                    <i class="fab fa-twitter fa-2x" />
                  </a>
                  <a class="text-white p-2" href="#">
                    <i class="fab fa-facebook fa-2x" />
                  </a>
                  <a class="text-white p-2" href="#">
                    <i class="fab fa-linkedin fa-2x" />
                  </a>
                  <a class="text-white p-2" href="#">
                    <i class="fab fa-instagram fa-2x" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card card-body bg-light mb-3">
              <h3 class="text-center text-info">
                {this.state.data.username}
                's Bio
              </h3>
              <p class="lead">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Provident fuga cum necessitatibus blanditiis vel, officia facere
                porro esse numquam assumenda doloremque saepe aliquam nemo
                excepturi aliquid maiores! Excepturi, libero repudiandae.
              </p>
              <hr />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            {/* <h3 class="text-center text-info">Experience</h3>
            <ul class="list-group">
              <li class="list-group-item">
                <h4>Microsoft</h4>
                <p>Oct 2011 - Current</p>
                <p>
                  <strong>Position:</strong> Senior Developer
                </p>
                <p>
                  <strong>Description:</strong> Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Unde doloribus dicta enim
                  excepturi laborum voluptatem nam provident quisquam facere.
                  Quae?
                </p>
              </li>
              
            </ul> */}
          </div>
        </div>
      </div>
    );
  }
}

export default StudentProfile;
