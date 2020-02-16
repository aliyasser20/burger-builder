import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: token,
  userId
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const auth = (email, password, isSignup) => dispatch => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzIVc-IG3sW8oVY68QbLTqc3bhD96UNGM";

  if (!isSignup)
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzIVc-IG3sW8oVY68QbLTqc3bhD96UNGM";

  axios
    .post(url, authData)
    .then(resp => {
      console.log(resp);
      dispatch(authSuccess(resp.data.idToken, resp.data.localId));
    })
    .catch(err => {
      dispatch(authFail(err.response.data.error));
    });
};
