import React, { Component } from "react";
import { connect } from "react-redux";
import { adminSignIn } from "../../store/actions/authActions";
import logo from "./logo.svg";

class AdminSignIn extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.adminSignIn(this.state);
  };
  render() {
    const { authError } = this.props;
    return (
      <div className="min-h-screen bg-white py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <a href="/home">
                  <img src={logo} alt="Logo" class="h-16 sm:h-20" />
                </a>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-600">
                    Administratorze zaloguj się do swojego konta
                  </h2>
                  <p className="text-center">
                    Po zalogowaniu możesz przystąpić do zarządzania bazą
                    aplikacji.
                  </p>
                  <form className="space-y-4" onSubmit={this.handleSubmit}>
                    <input type="hidden" name="remember" value="true"></input>
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div className="grid gap-6">
                        <div className="col-span-12">
                          <label
                            htmlFor="email"
                            className="block text-base font-medium text-gray-700"
                          >
                            Email adres
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            required
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-indigo-600 rounded-md placeholder-gray-500 placeholder-gray-500"
                            placeholder="Email"
                            onChange={this.handleChange}
                          ></input>
                        </div>

                        <div class="col-span-12">
                          <label
                            htmlFor="password"
                            className="block text-base font-medium text-gray-700"
                          >
                            Hasło
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            autocomplete="current-password"
                            // required
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md placeholder-gray-500"
                            placeholder="Hasło"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="mt-2 flex items-center">
                        <input
                          id="remember_me"
                          name="remember_me"
                          type="checkbox"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember_me"
                          class="ml-2 block text-sm text-gray-900"
                        >
                          Zapamiętaj mnie
                        </label>
                      </div>

                      <div className="mt-2 text-sm">
                        <a
                          href="/"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Zapomniałeś hasła?
                        </a>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Zaloguj
                      </button>

                      <div>
                        {authError ? (
                          <div
                            class="mt-6 bg-red-100 border border-red-400 text-base text-center text-red-700 px-4 py-1 rounded relative"
                            role="alert"
                          >
                            <p>{authError}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adminSignIn: (creds) => dispatch(adminSignIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSignIn);
