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
  SUBMIT_SIGNOUT_PENDING,
  SUBMIT_SIGNOUT_SUCCESS,
  SUBMIT_SIGNOUT_FAILED,
  OPEN_PROFILE_MODAL,
  CLOSE_PROFILE_MODAL,
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
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    age: "",
    pet: ""
  }
};

export const app = (state = initialStateApp, action = {}) => {
  switch (action.type) {
    case SUBMIT_REGISTER_SUCCESS:
    case SUBMIT_SIGNIN_SUCCESS:
    case AUTHORIZE_TOKEN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        user: { ...state.user, id: action.payload }
      };
    case SUBMIT_SIGNOUT_SUCCESS:
      return initialStateApp;
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
    case OPEN_PROFILE_MODAL:
      return { ...state, isProfileOpen: true };
    case CLOSE_PROFILE_MODAL:
      return { ...state, isProfileOpen: false };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        isProfileOpen: false
      };
    case GET_PROFILE_SUCCESS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const initialStateProfile = {
  name: "",
  age: "",
  pet: "",
  isPending: false,
  error: null
};

export const profile = (state = initialStateProfile, action = {}) => {
  switch (action.type) {
    case OPEN_PROFILE_MODAL:
      return { ...state, ...action.payload, error: null };
    case SET_PROFILE_NAME:
      return { ...state, name: action.payload };
    case SET_PROFILE_AGE:
      return { ...state, age: action.payload };
    case SET_PROFILE_PET:
      return { ...state, pet: action.payload };
    case UPDATE_PROFILE_PENDING:
      return { ...state, isPending: true, error: null };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, isPending: false, error: null };
    case UPDATE_PROFILE_FAILED:
      return { ...state, isPending: false, error: action.payload };
    default:
      return state;
  }
};
