import { catchByStatus, parseJson } from "./fetchHelper";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const calculateFaceLocations = data => {
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

export const countImageEntries = user => () => {
  return fetch(BACKEND_URL + "/image", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.sessionStorage.getItem("token")
    },
    body: JSON.stringify({ id: user.id })
  })
    .then(catchByStatus("couldn't update image count"))
    .then(parseJson);
};