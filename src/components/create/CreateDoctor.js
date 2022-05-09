import React, { useState } from "react";
import { connect } from "react-redux";
import { doctorRegistration } from "../../store/actions/userActions";
import Navbar from "../layout/Navbar";

const CreateDoctor = (props) => {
  const { authError, createError } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(createError);
  const handleSubmit = (e) => {
    e.preventDefault();

    const state = {
      email: email,
      password: password,
    };

    props.doctorRegistration(state, props.history);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative  px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:px-20 sm:py-16">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-600">
                    Utwórz nowe konto lekarza
                  </h2>
                  <p className="text-center">
                    Załóż konto lekarza, wpisując jego adres e-mail i hasło, z
                    których będzie korzystał.
                  </p>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true"></input>
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div className="grid gap-6">
                        <div className="col-span-12">
                          <label
                            htmlFor="email"
                            className="block text-base font-medium text-gray-700"
                          >
                            Adres email lekarza
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            // required
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-indigo-600 rounded-mdplaceholder-gray-500"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
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
                            // required
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md placeholder-gray-500"
                            placeholder="Hasło"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Rejestruj lekarza
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    createError: state.auth.createError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doctorRegistration: (doctor, history) =>
      dispatch(doctorRegistration(doctor, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDoctor);
