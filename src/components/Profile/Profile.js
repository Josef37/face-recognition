import React from "react";
import "./Profile.css";

const Profile = ({ toggleModal }) => {
  return (
    <div className="profile-modal">
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            className="br-100 ba h3 w3 dib mb0"
            alt="avatar"
          />
          <h1>John Doe</h1>
          <h4>Images Submitted: 5</h4>
          <p>Member since: January</p>
          <hr />
          <label className="mt2 fw6" htmlFor="name">
            Name:
          </label>
          <input
            // onChange={onNameChange}
            className="pa2 ba w-100"
            placeholder="John"
            type="text"
            name="name"
            id="name"
          />
          <label className="mt2 fw6" htmlFor="email">
            E-Mail:
          </label>
          <input
            // onChange={onEmailChange}
            placeholder="56"
            className="pa2 ba w-100"
            type="email"
            name="email-address"
            id="email-address"
          />
          <label className="mt2 fw6" htmlFor="pet">
            Pet:
          </label>
          <input
            // onChange={onPasswordChange}
            placeholder="Dragon"
            className="pa2 ba w-100"
            type="text"
            name="pet"
            id="pet"
          />
          <div
            className="mt4"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">
              Save
            </button>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </main>
        <div className="modal-close" onClick={toggleModal}>&times;</div>
      </article>
    </div>
  );
};

export default Profile;
