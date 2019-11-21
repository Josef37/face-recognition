export const catchByStatus = errorMessage => response => {
  if (!String(response.status).startsWith("2")) throw new Error(errorMessage);
  return response;
};

export const parseJson = response => {
  return response.json();
};
