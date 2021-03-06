import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { userRegistration } from "../../store/actions/userActions";
import Checkbox from "../layout/Checkbox";
import Navbar from "../layout/Navbar";
import firebase from "../../config/fbConfig";

const CreateUser = (props) => {
  const { authError } = props;
  const db = firebase.firestore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tests, setTests] = useState([]);

  useEffect(() => {
    if (db) {
      db.collection("tests")
        .get()
        .then((querySnapshot) => {
          const testData = [];
          querySnapshot.forEach((doc) => {
            testData.push({ ...doc.data(), id: doc.id, checked: false });
          });
          setTests(testData);
        });
    }
  }, [db]);

  function toggleDate(e) {
    const { name } = e.target;
    const tempTests = [...tests];

    tests.forEach((date) => {
      if (date.name === name) {
        date.checked = !date.checked;
      }
    });

    setTests(tempTests);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const tempTest = [];
    tests
      .filter((test) => test.checked)
      .forEach((test) => {
        tempTest.push({ ...test });
      });

    const state = {
      email: email,
      password: password,
      checkedTests: tempTest,
    };

    props.userRegistration(state, props.history);
  };

  // if (!auth.uid) return <Redirect to="/dashboard" />;
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
                    Utw??rz nowe konto pacjenta
                  </h2>
                  <p className="text-center">
                    Za?????? konto dla nowego pacjenta. E-mail jest kombinacj?? 3
                    pierwszych liter imienia i 3 pierwszych liter nazwiska oraz
                    @ z domen?? e-mail. Ustaw has??o pacjenta i wybierz badania,
                    do kt??rych ma dost??p.
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
                            Adres email pacjenta
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            // required
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-indigo-600 rounded-md placeholder-gray-500"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                          ></input>
                        </div>

                        <div class="col-span-12">
                          <label
                            htmlFor="password"
                            className="block text-base font-medium text-gray-700"
                          >
                            Has??o
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            // required
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md placeholder-gray-500"
                            placeholder="Has??o"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h1 className="block text-base font-medium text-gray-700">
                        {" "}
                        Select tests:{" "}
                      </h1>
                      <div className="p-4">
                        {tests.length > 0 ? (
                          <div>
                            {tests.map((date) => (
                              <Checkbox
                                key={date.id}
                                label={date.name}
                                isSelected={date.checked}
                                onCheckboxChange={toggleDate}
                              />
                            ))}
                          </div>
                        ) : (
                          <div>Brak danych</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Zarejestruj pacjenta
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
  console.log(state);
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userRegistration: (patient, history) =>
      dispatch(userRegistration(patient, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
