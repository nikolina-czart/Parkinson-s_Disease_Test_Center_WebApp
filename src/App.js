import React from "react";
import { connect } from "react-redux";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/auth/SignIn";
import HomePage from "./components/dashboard/HomePage";
import CreatePatient from "./components/create/CreatePatient";
import PatientDetails from "./components/patient/PatientDetails";
import AdminSignIn from "./components/auth/AdminSignIn";
import AdminPanel from "./components/dashboard/AdminPanel";
import CreateDoctor from "./components/create/CreateDoctor";

const App = ({ auth, profile }) => {
  const { uid } = auth;
  const { role } = profile;
  console.log(uid);
  console.log(role);

  function GetRole() {
    if (role === "ADMIN") {
      return (
        <Switch>
          <Route exact path="/dashboard" component={AdminPanel} />
          <Route path="/create" component={CreateDoctor} />
          <Route path="*" render={() => <Redirect to="/dashboard" />} />
        </Switch>
      );
    }
    return (
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/patient/:id" component={PatientDetails} />
        <Route path="/create" component={CreatePatient} />
        <Route path="*" render={() => <Redirect to="/dashboard" />} />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        {uid ? (
          <GetRole />
        ) : (
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/signin" component={SignIn} />
            <Route path="/admin" component={AdminSignIn} />
            <Route path="*" render={() => <Redirect to="/home" />} />
          </Switch>
        )}
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(App);
