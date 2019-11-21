const AUTH_TOKEN_KEY = "token"

export const getAuthToken = () => {
  return window.sessionStorage.getItem(AUTH_TOKEN_KEY);
};

export const setAuthToken = token => {
  window.sessionStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const removeAuthToken = () => {
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
}

export const getAuthHeader = () => {
  return `Bearer ${getAuthToken()}`;
};
