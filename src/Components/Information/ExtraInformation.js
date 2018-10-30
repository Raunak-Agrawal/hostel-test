import React, { Component } from "react";
import firebase from "firebase";
import { withRouter } from "react-router-dom";

const Initial_state = {
  username: "",
  email: "",
  usn: "",
  image: "",
  block: "",
  roomNo: "",
  error: ""
};

var db = firebase.firestore();

class ExtraInformation extends Component {
  state = {
    Initial_state
  };

  handleChange = e => {
    const image = e.target.files[0];
    this.setState({ image });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    var scope = this;
    const { usn, image, block, roomNo } = this.state;
    const { history } = this.props;
    var user = firebase.auth().currentUser;
    var value = "";
    console.log(user.emailVerified);

    db.collection("Details")
      .where("usn", "==", usn)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          value = doc.data();
        });
        if (!value.usn) {
          if (user.emailVerified) {
            firebase
              .firestore()
              .collection("Details")
              // .orderBy("", timestamp)
              .add({
                username: user.displayName,
                usn: usn,
                email: user.email,
                block: block,
                roomNo: roomNo
              })
              .then(() => {
                scope.setState({ ...Initial_state });
                history.push("/home");
              })
              .catch(err => {
                console.log("Error getting documents", err);
              });

            var storageRef = firebase.storage().ref(`Photos ${image.name}`);
            storageRef.put(image);
          } else {
            user
              .sendEmailVerification()
              .then(function() {
                window.alert("Verification Sent to your link");
              })
              .catch(function(error) {
                window.alert("Error", +error.message);
              });
          }
        } else {
          alert("usn is already used");
        }
      });
  };

  render() {
    const { usn, image, block, roomNo } = this.state;

    var user = firebase.auth().currentUser;
    //console.log(user);

    const isInvalid = usn === "" || image === "";
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Hey{" "}
                <h1 style={{ marginLeft: "10px" }}>
                  {user ? user.displayName : ""}
                </h1>
              </h1>
              <p className="lead text-center">We're almost done!!</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="name"
                    name="username"
                    value={user ? user.displayName : ""}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="email"
                    value={user ? user.email : ""}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="usn"
                    name="usn"
                    type="text"
                    value={usn}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Room Number"
                    name="roomNo"
                    type="text"
                    value={roomNo}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="block"
                    name="block"
                    type="text"
                    value={block}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Front Photo"
                    name={image}
                    type="file"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  disabled={isInvalid}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ExtraInformation);
