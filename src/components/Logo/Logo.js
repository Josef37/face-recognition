import React from "react";
import Tilt from "react-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div
          className="Tilt-inner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            paddingBottom: "5px"
          }}
        >
          <img style={{ width: "75%" }} src={brain} alt="Logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
