import {
  SET_SIGNIN_EMAIL,
  SET_SIGNIN_PASSWORD,
  SUBMIT_SIGNIN_PENDING,
  SUBMIT_SIGNIN_SUCCESS,
  SUBMIT_SIGNIN_FAILED,
  SET_REGISTER_NAME,
  SET_REGISTER_EMAIL,
  SET_REGISTER_PASSWORD,
  SUBMIT_REGISTER_PENDING,
  SUBMIT_REGISTER_SUCCESS,
  SUBMIT_REGISTER_FAILED,
  SET_IMAGE_URL,
  SUBMIT_IMAGE_PENDING,
  SUBMIT_IMAGE_SUCCESS,
  SUBMIT_IMAGE_FAILED,
  SET_IMAGE_COUNT,
  SUBMIT_SIGNOUT_PENDING,
  SUBMIT_SIGNOUT_SUCCESS,
  SUBMIT_SIGNOUT_FAILED,
  CLOSE_PROFILE_MODAL,
  OPEN_PROFILE_MODAL,
  SET_PROFILE_NAME,
  SET_PROFILE_AGE,
  SET_PROFILE_PET,
  UPDATE_PROFILE_PENDING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  GET_PROFILE_PENDING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  AUTHORIZE_TOKEN_PENDING,
  AUTHORIZE_TOKEN_SUCCESS,
  AUTHORIZE_TOKEN_FAILED
} from "./constants";

import { catchByStatus, parseJson } from "./helper/fetchHelper";
import {
  calculateFaceLocations,
  countImageEntries
} from "./helper/imageHelper";
import { getAuthHeader, setAuthToken, getAuthToken, removeAuthToken } from "./helper/authHelper"

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

/* _____________________________________________________________________________________
  SIGNIN
*/

export const setSigninEmail = email => ({
  type: SET_SIGNIN_EMAIL,
  payload: email
});

export const setSigninPassword = password => ({
  type: SET_SIGNIN_PASSWORD,
  payload: password
});

export const submitSignin = history => (dispatch, getState) => {
  dispatch({ type: SUBMIT_SIGNIN_PENDING });
  const { signInEmail, signInPassword } = getState().signin;
  fetch(BACKEND_URL + "/signin", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: signInEmail,
      password: signInPassword
    })
  })
    .then(catchByStatus("wrong credentials"))
    .then(parseJson)
    .then(({ id, token }) => {
      setAuthToken(token);
      dispatch({ type: SUBMIT_SIGNIN_SUCCESS, payload: id });
      dispatch(getUserProfile(id));
      history.push("/home");
    })
    .catch(err => {
      dispatch({ type: SUBMIT_SIGNIN_FAILED, payload: err });
    });
};

/* _____________________________________________________________________________________
  REGISTER
*/

export const setRegisterEmail = email => ({
  type: SET_REGISTER_EMAIL,
  payload: email
});

export const setRegisterPassword = password => ({
  type: SET_REGISTER_PASSWORD,
  payload: password
});

export const setRegisterName = name => ({
  type: SET_REGISTER_NAME,
  payload: name
});

export const submitRegister = history => (dispatch, getState) => {
  const { name, email, password } = getState().register;
  dispatch({ type: SUBMIT_REGISTER_PENDING });
  fetch(BACKEND_URL + "/register", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
    .then(catchByStatus("unable to register"))
    .then(parseJson)
    .then(({ id, token }) => {
      setAuthToken(token);
      dispatch({ type: SUBMIT_REGISTER_SUCCESS, payload: id });
      dispatch(getUserProfile(id));
      history.push("/home");
    })
    .catch(err => {
      dispatch({ type: SUBMIT_REGISTER_FAILED, payload: err });
    });
};

/* _____________________________________________________________________________________
  SIGNOUT
*/

export const submitSignout = () => dispatch => {
  dispatch({ type: SUBMIT_SIGNOUT_PENDING });
  const token = getAuthToken();
  if (!token) {
    dispatch({ type: SUBMIT_SIGNOUT_SUCCESS });
    return;
  }
  fetch(BACKEND_URL + "/signout", {
    method: "post",
    headers: { Authorization: getAuthHeader() }
  })
    .then(catchByStatus("error signing out"))
    .then(() => {
      removeAuthToken();
      dispatch({ type: SUBMIT_SIGNOUT_SUCCESS });
    })
    .catch(err => dispatch({ type: SUBMIT_SIGNOUT_FAILED, payload: err }));
};

/* _____________________________________________________________________________________
  IMAGE
*/

export const setImageUrl = url => ({
  type: SET_IMAGE_URL,
  payload: url
});

export const submitImage = () => (dispatch, getState) => {
  const { input: imageUrl, user } = getState().app;
  dispatch({ type: SUBMIT_IMAGE_PENDING, payload: imageUrl });
  fetch(BACKEND_URL + "/imageurl", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader()
    },
    body: JSON.stringify({ input: imageUrl })
  })
    .then(catchByStatus("couldn't submit image"))
    .then(parseJson)
    .then(calculateFaceLocations)
    .then(faceBoxes =>
      dispatch({ type: SUBMIT_IMAGE_SUCCESS, payload: faceBoxes })
    )
    .then(countImageEntries(user))
    .then(imageCount =>
      dispatch({ type: SET_IMAGE_COUNT, payload: imageCount })
    )
    .catch(err => dispatch({ type: SUBMIT_IMAGE_FAILED, payload: err }));
};

/* _____________________________________________________________________________________
  PROFILE
*/

export const closeProfileModal = () => ({ type: CLOSE_PROFILE_MODAL });
export const openProfileModal = () => (dispatch, getState) => {
  const { name, age, pet } = getState().app.user;
  dispatch({ type: OPEN_PROFILE_MODAL, payload: { name, age, pet } });
};
export const setProfileName = profileName => ({
  type: SET_PROFILE_NAME,
  payload: profileName
});
export const setProfileAge = profileAge => ({
  type: SET_PROFILE_AGE,
  payload: profileAge
});
export const setProfilePet = profilePet => ({
  type: SET_PROFILE_PET,
  payload: profilePet
});

export const submitProfileUpdate = () => (dispatch, getState) => {
  dispatch({ type: UPDATE_PROFILE_PENDING });
  const userId = getState().app.user.id;
  const { name, age, pet } = getState().profile;
  fetch(BACKEND_URL + "/profile/" + userId, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader()
    },
    body: JSON.stringify({ formInput: { name, age, pet } })
  })
    .then(catchByStatus("unable to update profile"))
    .then(() => {
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: { name, age, pet } });
    })
    .catch(err => dispatch({ type: UPDATE_PROFILE_FAILED, payload: err }));
};

export const getUserProfile = userId => dispatch => {
  dispatch({ type: GET_PROFILE_PENDING });
  fetch(BACKEND_URL + "/profile/" + userId, {
    headers: { Authorization: getAuthHeader() }
  })
    .then(catchByStatus("unable to get profile"))
    .then(parseJson)
    .then(user => dispatch({ type: GET_PROFILE_SUCCESS, payload: user }))
    .catch(err => dispatch({ type: GET_PROFILE_FAILED, payload: err }));
};

/* _____________________________________________________________________________________
  AUTHORIZATION
*/

export const authorizeToken = () => dispatch => {
  dispatch({ type: AUTHORIZE_TOKEN_PENDING });
  const token = getAuthToken();
  if (!token) {
    dispatch({
      type: AUTHORIZE_TOKEN_FAILED,
      payload: new Error("no token found")
    });
    return;
  }
  fetch(BACKEND_URL + "/signin", {
    method: "post",
    headers: { Authorization: getAuthHeader() }
  })
    .then(catchByStatus("invalid token"))
    .then(parseJson)
    .then(({ id }) => {
      dispatch({ type: AUTHORIZE_TOKEN_SUCCESS, payload: id });
      dispatch(getUserProfile(id));
    })
    .catch(err => {
      dispatch({ type: AUTHORIZE_TOKEN_FAILED, payload: err });
    });
};
