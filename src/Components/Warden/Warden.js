import React, { Component } from "react";
//import "./App.css";
import * as firebase from "firebase";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
// import status from "./Warden/status";
var db = firebase.firestore();

class Warden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      accept: "accept",
      reject: "reject",
      // comment:"",
      search: ""
    };
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    db.collection("outpassSubmit")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          this.setState({
            data: this.state.data.concat(doc.data())
          });
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  accept(e) {
    console.log(e);

    swal({
      title: "Are you sure you want to accept?",
      text: "You won't be able to revert this!",
      input: "text",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!"
    }).then(result => {
      console.log(result.value);
      if (result.value) {
        swal("Accepted!", "The outpass is accepted.", "success");

        // var data=this.state.data;
        //   var item=data.indexOf(e);
        //   var item1=item;
        //   // console.log(x);
        //   var temp=data[item1];
        //   temp.status='1';
        //     this.setState(state=>{
        //       state.data=data
        //     })
        // this.setState({
        //   comment:result.value,
        // })
        // var outpassSubmitRef=db.collection('outpasshistory');
        // outpassSubmitRef.add({
        // comment:this.state.comment,
        // })
        db.collection("permission")
          .where("usn", "==", e.usn)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              db.collection("permission")
                .doc(doc.id)
                .update({ status: "Accepted", comment: result.value });
            });
          });
        this.setState({
          comment: ""
        });
        db.collection("outpassSubmit")
          .where("usn", "==", e.usn)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(function(doc) {
              db.collection("outpassSubmit")
                .doc(doc.id)
                .delete();
            });
          });
        var data = this.state.data;
        // var item=data.indexOf(e);
        var items = data.filter(item => item.usn !== e.usn);
        this.setState({ data: items });
        // var x=data.filter((e)=>e.usn!==data.usn)
        //  console.log(x);
        //  this.setState({ data:x });
      }
    });
  }

  reject(e) {
    console.log(e);
    swal({
      title: "Are you sure you want to reject?",
      text: "You won't be able to revert this!",
      input: "text",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!"
    }).then(result => {
      console.log(result.value);
      if (result.value) {
        swal("Rejected!", "The outpass is rejected.", "success");
        // this.setState({
        //   comment:result.value,
        // })
        // var outpassSubmitRef=db.collection('outpasshistory');
        // outpassSubmitRef.add({
        //   comment:this.state.comment,
        //   // usn:e.target.value
        // })
        db.collection("permission")
          .where("usn", "==", e.usn)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              db.collection("permission")
                .doc(doc.id)
                .update({ status: "Rejected", comment: result.value });
            });
          });
        this.setState({
          comment: ""
        });
        db.collection("outpassSubmit")
          .where("usn", "==", e.usn)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(function(doc) {
              db.collection("outpassSubmit")
                .doc(doc.id)
                .delete();
            });
          });
        var data = this.state.data;
        // var item=data.indexOf(e);
        var items = data.filter(item => item.usn !== e.usn);
        this.setState({ data: items });
        // var x=data.filter((e)=>e.usn!==data.usn)
        //  console.log(x);
        //  this.setState({ data:x });
      }
    });
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 20)
    });
  }

  render() {
    let fitteredData = this.state.data.filter(data => {
      return (
        data.usn.toLowerCase().indexOf(this.state.search) !== -1 ||
        data.fname.toLowerCase().indexOf(this.state.search) !== -1
      );
    });
    // console.log(this.state.data);
    return (
      <div>
        <div className="profiles">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Outpass</h1>
                <p className="lead text-center">Accept/ Reject outpass</p>
                <input
                  type="text"
                  class="form-control form-control-xs"
                  placeholder="Seach by usn or fname"
                  width="20px"
                  onChange={this.updateSearch}
                  value={this.state.search}
                />
                <br />
                <Link to="/status" className="btn btn-info">
                  History
                </Link>
                {fitteredData.map((doc, i) => (
                  <div key={i}>
                    {/* { console.log(doc.fname)} */}

                    <div className="card card-body bg-light mb-3">
                      <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2">
                          {/* <img
                            className="rounded-circle"
                            src={require("../../img/DSCN0034 (2).JPG")}
                            alt=""
                            width="100px"
                            height="100px"
                          /> */}
                        </div>

                        <div className="col-lg-5 col-md-5 col-sm-5">
                          <h3>{doc.username}</h3>
                          <p>{doc.usn}</p>
                          <a
                            href="#"
                            className="btn btn-info"
                            onClick={() => this.accept(doc)}
                          >
                            Accept
                          </a>
                          <br />
                          <br />
                          <a
                            href="#"
                            className="btn btn-info"
                            onClick={() => this.reject(doc)}
                          >
                            Reject
                          </a>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5">
                          <h4>Details</h4>
                          <ul className="list-group">
                            <li className="list-group-item">
                              <i className="fa fa-check pr-1" />
                              Room No: {doc.room}
                            </li>
                            <li className="list-group-item">
                              <i className="fa fa-check pr-1" />
                              Block: {doc.block}
                            </li>
                            <li className="list-group-item">
                              <i className="fa fa-check pr-1" />
                              Outdate:
                              {doc.outdate} <br /> Indate: {doc.indate}
                            </li>
                            <li className="list-group-item">
                              <i className="fa fa-check pr-1" />
                              Outtime:
                              {doc.outtime} <br /> Intime: {doc.intime}
                            </li>
                            <li className="list-group-item">
                              <i className="fa fa-check pr-1" />
                              Purpose: {doc.purpose}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Warden;
