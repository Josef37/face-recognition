import {
  SET_SIGNIN_EMAIL,
  SET_SIGNIN_PASSWORD,
  SUBMIT_SIGNIN_PENDING,
  SUBMIT_SIGNIN_SUCCESS,
  SUBMIT_SIGNIN_FAILED,
  SET_REGISTER_EMAIL,
  SET_REGISTER_NAME,
  SET_REGISTER_PASSWORD,
  SUBMIT_REGISTER_PENDING,
  SUBMIT_REGISTER_SUCCESS,
  SUBMIT_REGISTER_FAILED,
  SET_IMAGE_URL,
  SUBMIT_IMAGE_PENDING,
  SUBMIT_IMAGE_SUCCESS,
  SUBMIT_IMAGE_FAILED,
  SET_IMAGE_COUNT,
  CHANGE_ROUTE
} from "./constants";

const initialStateSignin = {
  isPending: false,
  signinFailed: false,
  signInEmail: "",
  signInPassword: ""
};

export const signin = (state = initialStateSignin, action = {}) => {
  switch (action.type) {
    case SET_SIGNIN_EMAIL:
      return { ...state, signInEmail: action.payload };
    case SET_SIGNIN_PASSWORD:
      return { ...state, signInPassword: action.payload };
    case SUBMIT_SIGNIN_PENDING:
      return { ...state, isPending: true, signinFailed: false };
    case SUBMIT_SIGNIN_SUCCESS:
      return initialStateSignin;
    case SUBMIT_SIGNIN_FAILED:
      return { ...state, isPending: false, signinFailed: true };
    default:
      return state;
  }
};

const initialStateRegister = {
  isPending: false,
  registerFailed: false,
  name: "",
  email: "",
  password: ""
};

export const register = (state = initialStateRegister, action = {}) => {
  switch (action.type) {
    case SET_REGISTER_NAME:
      return { ...state, name: action.payload };
    case SET_REGISTER_EMAIL:
      return { ...state, email: action.payload };
    case SET_REGISTER_PASSWORD:
      return { ...state, password: action.payload };
    case SUBMIT_REGISTER_PENDING:
      return { ...state, isPending: true, registerFailed: false };
    case SUBMIT_REGISTER_SUCCESS:
      return initialStateRegister;
    case SUBMIT_REGISTER_FAILED:
      return { ...state, isPending: false, registerFailed: true };
    default:
      return state;
  }
};

const initialStateApp = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

export const app = (state = initialStateApp, action = {}) => {
  switch (action.type) {
    case SUBMIT_REGISTER_SUCCESS:
    case SUBMIT_SIGNIN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        route: "home",
        user: action.payload
      };
    case SET_IMAGE_URL:
      return { ...state, input: action.payload };
    case SUBMIT_IMAGE_PENDING:
      return {
        ...state,
        isPending: true,
        isFailed: false,
        imageUrl: action.payload
      };
    case SUBMIT_IMAGE_SUCCESS:
      return { ...state, isPending: false, boxes: action.payload };
    case SUBMIT_IMAGE_FAILED:
      return { ...state, isPending: false, isFailed: true };
    case SET_IMAGE_COUNT:
      return { ...state, user: { ...state.user, entries: action.payload } };
    case CHANGE_ROUTE:
      const route = action.payload;
      if (route === "signin") return initialStateApp;
      return { ...state, route };
    default:
      return state;
  }
};
