import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import PatientList from "../patient/PatientList";
import Navbar from "../layout/Navbar";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="row">
          <PatientList props={this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patients: state.firestore.ordered.users,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users", where: ["role", "==", "PATIENT"] }])
)(Dashboard);
