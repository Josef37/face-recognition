import React from "react";
import { connect } from "react-redux";
import {
  setRegisterName,
  setRegisterEmail,
  setRegisterPassword,
  submitRegister
} from "../../actions";

class Register extends React.Component {
  render() {
    const {
      registerPending,
      registerFailed,
      onNameChange,
      onEmailChange,
      onPasswordChange,
      onSubmitRegister
    } = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80 w-100">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 center">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={onNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              {registerFailed ? (
                <p>Registering failed. You may choose another e-mail-adress</p>
              ) : (
                ""
              )}
              <input
                onClick={registerPending ? null : onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value={registerPending ? "Registering..." : "Register"}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default connect(
  state => ({
    name: state.register.name,
    email: state.register.email,
    password: state.register.password,
    registerPending: state.register.isPending,
    registerFailed: state.register.registerFailed
  }),
  dispatch => ({
    onNameChange: event => dispatch(setRegisterName(event.target.value)),
    onEmailChange: event => dispatch(setRegisterEmail(event.target.value)),
    onPasswordChange: event =>
      dispatch(setRegisterPassword(event.target.value)),
    onSubmitRegister: () => dispatch(submitRegister())
  })
)(Register);
