import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import DoctorList from "../doctor/DoctorList";
import Navbar from "../layout/Navbar";

class AdminPanel extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="row">
          <DoctorList props={this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctors: state.firestore.ordered.users,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users", where: ["role", "==", "DOCTOR"] }])
)(AdminPanel);
