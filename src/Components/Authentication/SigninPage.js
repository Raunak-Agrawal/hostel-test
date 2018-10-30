import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import "../../css/style.css";
import { Link } from "react-router-dom";

const SigninPage = ({ history }) => (
  <div>
    <SignInForm history={history} />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      more2: []
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    var scope = this;
    var value;
    const { email, password } = this.state;
    var user = firebase.auth().currentUser;
    //var emailVerified = user.emailVerified;
    //const emailVerified = user.emailVerified;
    console.log(user);

    const { history } = this.props;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        if (email === "hari@warden.com") {
          // this.setState({ ...INITIAL_STATE });

          history.push("/Warden");
        } else {
          firebase
            .firestore()
            .collection("Details")
            .where("email", "==", email)

            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                // console.log(doc.id, " => ", doc.data());
                value = doc.data();
                console.log(value);
              });
              console.log(value);
              if (!value) {
                history.push("/info");
              } else {
                this.setState({ ...INITIAL_STATE });

                history.push("/home");
              }
            })

            .catch(err => {
              console.log("Error getting documents", err);
            });
          console.log(this.state.more2);
        }
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign In</h1>
              <p className="lead text-center">Sign In to your Hostel account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  disabled={isInvalid}
                />
                {error && <p>{error.message}</p>}
                <p>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
                <p>
                  <Link to="/pw-forget">Forgot Password?</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SigninPage);

export { SignInForm };
