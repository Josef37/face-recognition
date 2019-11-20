import React from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../Profile/ProfileIcon";

const Navigation = ({ isSignedIn, onSubmitSignout }) => {
  if (isSignedIn) {
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px"
        }}
      >
        <ProfileIcon onSubmitSignout={onSubmitSignout} />
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/signin" className="f3 link dim black underline pa3 pointer">
          Sign In
        </Link>
        <Link
          to="/register"
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </Link>
      </nav>
    );
  }
};

export default Navigation;
