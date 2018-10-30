import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import SigninPage from "./Authentication/SigninPage";
import SignupPage from "./Authentication/SignupPage";
import LandingPage from "./Authentication/LandingPage";
import HomePage from "./Home/Homepage";
import Navigation from "./Authentication/Navigation";
import NavigationWarden from "./Authentication/NavigationWarden";
import Outpass from "./Outpass/Outpass";
import StudentProfile from "./Outpass/StudentProfile";
import Feeds from "./Feeds/Feeds";
import PasswordForgetPage from "./Authentication/PasswordForgetPage";
import ExtraInformation from "./Information/ExtraInformation";
import NotFound from "../NotFound";
import firebase from "firebase";
import Warden from "./Warden/Warden";
import Status from "./Warden/Status";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({ authUser });
      } else {
        this.setState({ authUser: null });
      }
    });
  }

  render() {
    var email;
    console.log(this.state.authUser);
    var warden = firebase.auth().currentUser;
    if (warden) {
      email = warden.email;
    }
    //const val = this.state.authUser.email;
    return (
      <BrowserRouter>
        <div>
          {email === "hari@warden.com" ? (
            <NavigationWarden authUser={this.state.authUser} />
          ) : (
            <Navigation authUser={this.state.authUser} />
          )}
          {/* <Navigation authUser={this.state.authUser} />
          <NavigationWarden authUser={this.state.authUser} /> */}
          <Route
            exact
            path="/signup"
            render={() =>
              this.state.authUser ? <Redirect to="/home" /> : <SignupPage />
            }
          />
          <Route
            exact
            path="/signin"
            render={() =>
              this.state.authUser && email !== "hari@warden.com" ? (
                <Redirect to="/home" />
              ) : (
                <SigninPage />
              )
            }
          />
          <Route exact path="/" component={LandingPage} />
          {/* <Route
            exact
            path="/home"
            render={() =>
              this.state.authUser ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/" />
              )
            }
          /> */}
          <Route
            exact
            path="/home"
            component={HomePage}
            user={this.state.authUser}
          />
          <Route
            exact
            path="/"
            render={() =>
              this.state.authUser ? <HomePage /> : <LandingPage />
            }
          />

          <Route exact path="/Outpass" component={Outpass} />
          <Route exact path="/Feeds" component={Feeds} />
          <Route exact path="/info" component={ExtraInformation} />
          <Route exact path="/NotFound" component={NotFound} />
          <Route exact path="/warden" component={Warden} />
          <Route exact path="/studentprofile" component={StudentProfile} />
          {/* <Route
            exact
            path="/info"
            render={() =>
            match.params ? (
                <Redirect to="/info" />
              ) : (
                <ExtraInformation />
              )
            }
          /> */}
          <Route exact path="/pw-forget" component={PasswordForgetPage} />

          {/* <Route
            exact
            path="/warden"
            render={() => (this.state.authUser ? <Warden /> : <NotFound />)}
          /> */}
          <Route exact path="/status" component={Status} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
