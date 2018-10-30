import React, { Component } from "react";
import "../../css/style.css";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Jain Hostel</h1>
                <p className="lead"> A home like environment</p>
                <hr />
                <Link to="/signup" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/signin" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
