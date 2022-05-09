const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_USER_SUCCESS":
      console.log("create user success");
      return {
        ...state,
        authError: null,
      };
    case "CREATE_USER_ERROR":
      console.log("create user error");
      return {
        ...state,
        authError: "Nie udało się stworzyć pacjenta",
      };

    case "CREATE_DOCTOR_SUCCESS":
      console.log("create user success");
      return {
        ...state,
        authError: null,
      };
    case "CREATE_DOCTOR_ERROR":
      console.log("create user error");
      return {
        ...state,
        authError: "Nie udało się stworzyć lekarza",
      };

    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        authError: "Logowanie nieudane",
      };

    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null,
      };

    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return {
        ...state,
        authError: null,
      };

    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null,
      };

    case "SIGNUP_ERROR":
      console.log("signup error");
      return {
        ...state,
        authError: action.err.message,
      };

    default:
      return state;
  }
};

export default authReducer;
