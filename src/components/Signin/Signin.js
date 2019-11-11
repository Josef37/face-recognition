import React from "react";
import { connect } from "react-redux";
import { setSigninEmail, setSigninPassword, submitSignin } from "../../actions";
import { useHistory, Link } from "react-router-dom";

const Signin = props => {
  const history = useHistory();
  const {
    signInPending,
    signInFailed,
    onEmailChange,
    onPasswordChange,
    onSubmitSignIn
  } = props;
  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80 w-100">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
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
            {signInFailed ? <p>Signin failed. Please try again.</p> : ""}
            <input
              onClick={signInPending ? null : () => onSubmitSignIn(history)}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value={signInPending ? "Signing in..." : "Sign in"}
            />
          </div>
          <div className="lh-copy mt3">
            <Link to="/register" className="f6 link dim black db pointer">
              Register
            </Link>
          </div>
        </div>
      </main>
    </article>
  );
};

export default connect(
  state => ({
    signInPending: state.signin.isPending,
    signInFailed: state.signin.signinFailed
  }),
  dispatch => ({
    onEmailChange: event => dispatch(setSigninEmail(event.target.value)),
    onPasswordChange: event => dispatch(setSigninPassword(event.target.value)),
    onSubmitSignIn: history => dispatch(submitSignin(history))
  })
)(Signin);
