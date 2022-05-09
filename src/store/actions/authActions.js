export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    console.log("SIGN IN");
    firebase
      .firestore()
      .collection("users")
      .where("role", "==", "DOCTOR")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().doctorEmail === credentials.email) {
            firebase
              .auth()
              .signInWithEmailAndPassword(
                credentials.email,
                credentials.password
              )
              .then(() => {
                dispatch({ type: "LOGIN_SUCCESS" });
              })
              .catch((err) => {
                dispatch({ type: "LOGIN_ERROR", err });
              });
          }
        });
      });
  };
};

export const adminSignIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    if (credentials.email === "admin@gmail.com") {
      firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
          dispatch({ type: "LOGIN_SUCCESS" });
        })
        .catch((err) => {
          dispatch({ type: "LOGIN_ERROR", err });
        });
    } else {
      console.log("Niepoprawne logowanie");
      dispatch({ type: "LOGIN_ERROR" });
    }
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    console.log("signOut started");
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          doctorEmail: newUser.email,
          role: "DOCTOR",
        });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
