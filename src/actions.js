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
  SUBMIT_SIGNOUT,
  TOGGLE_PROFILE_MODAL
} from "./constants";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const setSigninEmail = email => ({
  type: SET_SIGNIN_EMAIL,
  payload: email
});

export const setSigninPassword = password => ({
  type: SET_SIGNIN_PASSWORD,
  payload: password
});

export const submitSignin = history => (dispatch, getState) => {
  const { signInEmail, signInPassword } = getState().signin;
  dispatch({ type: SUBMIT_SIGNIN_PENDING });
  fetch(BACKEND_URL + "/signin", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: signInEmail,
      password: signInPassword
    })
  })
    .then(response => {
      if (!String(response.status).startsWith("2"))
        throw new Error("wrong credentials");
      else return response.json();
    })
    .then(user => {
      dispatch({ type: SUBMIT_SIGNIN_SUCCESS, payload: user, history });
      history.push("/home");
    })
    .catch(err => {
      dispatch({ type: SUBMIT_SIGNIN_FAILED, payload: err });
    });
};

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
    .then(response => {
      if (!String(response.status).startsWith("2"))
        throw new Error("unable to register");
      else return response.json();
    })
    .then(user => {
      dispatch({ type: SUBMIT_REGISTER_SUCCESS, payload: user });
      history.push("/home");
    })
    .catch(err => {
      dispatch({ type: SUBMIT_REGISTER_FAILED, payload: err });
    });
};

export const submitSignout = () => ({
  type: SUBMIT_SIGNOUT
});

export const setImageUrl = url => ({
  type: SET_IMAGE_URL,
  payload: url
});

export const submitImage = () => (dispatch, getState) => {
  const { input: imageUrl, user } = getState().app;
  dispatch({ type: SUBMIT_IMAGE_PENDING, payload: imageUrl });
  fetch(BACKEND_URL + "/imageurl", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: imageUrl })
  })
    .then(response => response.json())
    .then(calculateFaceLocations)
    .then(faceBoxes =>
      dispatch({ type: SUBMIT_IMAGE_SUCCESS, payload: faceBoxes })
    )
    .then(() => {
      fetch(BACKEND_URL + "/image", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id })
      })
        .then(response => response.json())
        .then(imageCount =>
          dispatch({ type: SET_IMAGE_COUNT, payload: imageCount })
        )
        .catch(console.log);
    })
    .catch(err => dispatch({ type: SUBMIT_IMAGE_FAILED, payload: err }));
};

const calculateFaceLocations = data => {
  const clarifaiFaces = data.outputs[0].data.regions.map(
    region => region.region_info.bounding_box
  );
  const image = document.getElementById("inputImage");
  const width = Number(image.width);
  const height = Number(image.height);
  return clarifaiFaces.map(face => ({
    leftCol: face.left_col * width,
    topRow: face.top_row * height,
    rightCol: width - face.right_col * width,
    bottomRow: height - face.bottom_row * height
  }));
};

export const toggleProfileModal = () => ({ type: TOGGLE_PROFILE_MODAL });
