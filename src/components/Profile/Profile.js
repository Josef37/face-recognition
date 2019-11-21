import React from "react";
import { connect } from "react-redux";
import {
  setProfileName,
  setProfileAge,
  setProfilePet,
  submitProfileUpdate
} from "../../actions";
import "./Profile.css";

const Profile = ({
  name,
  age,
  pet,
  isPending,
  error,
  entries,
  joined,
  closeModal,
  setProfileName,
  setProfileAge,
  setProfilePet,
  submitProfileUpdate
}) => {
  return (
    <div className="profile-modal">
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            className="br-100 ba h3 w3 dib mb0"
            alt="avatar"
          />
          <h1>{name.trim().length ? name : "<anonymous>"}</h1>
          <h4>Images Submitted: {entries}</h4>
          <p>
            {`Member since: ${new Date(joined).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric"
            })}`}
          </p>
          <hr />
          <label className="mt2 fw6" htmlFor="name">
            Name:
          </label>
          <input
            onChange={setProfileName}
            className="pa2 ba w-100"
            type="text"
            name="name"
            id="name"
            placeholder="(new name)"
            value={name || ""}
          />
          <label className="mt2 fw6" htmlFor="age">
            Age:
          </label>
          <input
            onChange={setProfileAge}
            className="pa2 ba w-100"
            type="number"
            name="age"
            id="age"
            placeholder="(new age)"
            value={age || ""}
          />
          <label className="mt2 fw6" htmlFor="pet">
            Pet:
          </label>
          <input
            onChange={setProfilePet}
            className="pa2 ba w-100"
            type="text"
            name="pet"
            id="pet"
            placeholder="(new pet)"
            value={pet || ""}
          />
          <div
            className="mt4"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              onClick={submitProfileUpdate}
            >
              {isPending ? "Saving..." : "Save & Close"}
            </button>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
          {error && <p className="tc">Could not update profile...</p>}
        </main>
        <div className="modal-close" onClick={closeModal}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default connect(
  state => ({
    ...state.profile,
    entries: state.app.user.entries,
    joined: state.app.user.joined
  }),
  dispatch => ({
    setProfileName: event => dispatch(setProfileName(event.target.value)),
    setProfileAge: event => dispatch(setProfileAge(event.target.value)),
    setProfilePet: event => dispatch(setProfilePet(event.target.value)),
    submitProfileUpdate: () => dispatch(submitProfileUpdate())
  })
)(Profile);
