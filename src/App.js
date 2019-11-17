import React from "react";
import { connect } from "react-redux";
import { setImageUrl, submitImage, submitSignout } from "./actions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Particles from "react-particles-js";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 300
      }
    }
  }
};

class App extends React.Component {
  render() {
    const {
      isSignedIn,
      boxes,
      imageUrl,
      user,
      onInputChange,
      onButtonSubmit,
      onSubmitSignout
    } = this.props;
    return (
      <Router>
        <div className="App">
          <Particles className="particles" params={particlesOptions} />
          <Navigation
            isSignedIn={isSignedIn}
            onSubmitSignout={onSubmitSignout}
          />
          <Switch>
            <Route
              path="/home"
              render={() =>
                !isSignedIn ? (
                  <Redirect to="/signin" />
                ) : (
                  <React.Fragment>
                    <Logo />
                    <Rank name={user.name} entries={user.entries} />
                    <ImageLinkForm
                      onInputChange={onInputChange}
                      onButtonSubmit={onButtonSubmit}
                    />
                    <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
                  </React.Fragment>
                )
              }
            ></Route>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => state.app,
  dispatch => ({
    onInputChange: event => dispatch(setImageUrl(event.target.value)),
    onButtonSubmit: () => dispatch(submitImage()),
    onSubmitSignout: history => {
      dispatch(submitSignout(history));
    }
  })
)(App);
