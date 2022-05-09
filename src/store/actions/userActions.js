import secondaryApp from "../../config/regConfig";

export const userRegistration = (newPatient, history) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    const patientTests = newPatient.checkedTests;

    const patientData = {
      doctorID: authorId,
      email: newPatient.email,
      role: "PATIENT",
    };

    secondaryApp
      .auth()
      .createUserWithEmailAndPassword(newPatient.email, newPatient.password)
      .then((resp) => {
        firestore.collection("users").doc(resp.user.uid).set(patientData);

        patientTests.forEach((test) => {
          const testName = { name: test.name };

          firestore
            .collection("users")
            .doc(resp.user.uid)
            .collection("tests")
            .doc(test.id)
            .set(testName);

          firestore
            .collection("users")
            .doc(resp.user.uid)
            .collection("testsHistory")
            .doc(test.id)
            .set(testName);
        });
      })
      .then(() => {
        secondaryApp.auth().signOut();
        dispatch({ type: "CREATE_USER_SUCCESS" });
        history.push("/");
      })
      .catch((err) => {
        dispatch({ type: "CREATE_USER_ERROR", err });
      });
  };
};

export const doctorRegistration = (newDoctor, history) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let isError = false;

    const doctorData = {
      doctorEmail: newDoctor.email,
      role: "DOCTOR",
    };

    secondaryApp
      .auth()
      .createUserWithEmailAndPassword(newDoctor.email, newDoctor.password)
      .then((resp) => {
        firestore.collection("users").doc(resp.user.uid).set(doctorData);
      })
      .then(() => {
        secondaryApp.auth().signOut();
        dispatch({ type: "CREATE_DOCTOR_SUCCESS" });
        history.push("/");
      })
      .catch((err) => {
        isError = true;
        dispatch({ type: "CREATE_DOCTOR_ERROR", err });
      });

    if (isError) {
      dispatch({ type: "CREATE_DOCTOR_ERROR" });
    }
  };
};
