import React, { Component } from "react";
//import "./App.css";
import { Link } from "react-router-dom";
import firebase from "firebase";

var db = firebase.firestore();

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: [],
      search: ""
    };
    this.updateSearch = this.updateSearch.bind(this);
  }
  componentDidMount() {
    db.collection("permission")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          this.setState({
            permission: this.state.permission.concat(doc.data())
          });
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 20)
    });
  }

  render() {
    let fitteredData1 = this.state.permission.filter(data => {
      return data.usn.toLowerCase().indexOf(this.state.search) !== -1;
    });
    return (
      <div>
        <div class="dashboard">
          <div class="container">
            <div class="row">
              <Link to="/Warden" class=" backbtn btn btn-light">
                Go Back
              </Link>
              <br />
              <div class="col-md-12">
                <h1 class="display-4">Status /History</h1>
                <p class="lead text-muted">Welcome Warden</p>

                <div>
                  <h4 class="mb-2">Outpass History</h4>
                  <input
                    type="text"
                    class="form-control form-control-xs"
                    placeholder="Seach by usn "
                    width="20px"
                    onChange={this.updateSearch}
                    value={this.state.search}
                  />
                  <br />
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Usn</th>
                        <th>Purpose</th>
                        <th>Outdate</th>
                        <th>Indate</th>
                        <th>Status</th>
                        <th>Comment</th>

                        <th />
                      </tr>
                    </thead>
                    {fitteredData1.map(doc => (
                      <tbody>
                        <tr>
                          <td>{doc.usn}</td>

                          <td>{doc.purpose}</td>
                          <td>{doc.outdate}</td>
                          <td>{doc.indate}</td>
                          <td>{doc.status}</td>
                          <td>{doc.comment}</td>
                          <td>
                            {<button class="btn btn-danger">Delete</button>}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Status;
