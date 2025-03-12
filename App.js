import React, { Component } from "react";
import Auth from "./app/common/Auth";
import Router from "./app/common/Router";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingAuth: false,
      isSignedIn: false
    };
  }

  componentWillMount() {
    Auth.isSignedIn()
      .then(res => {
        this.setState({
          isSignedIn: res,
          checkingAuth: true
        });
      })
      .catch(err => {
        alert("An error occurred");
      });
  }

  render() {
    if (!this.state.checkingAuth) {
      return null;
    }

    const Container = Router.initialize(this.state.isSignedIn);
    return <Container />;
  }
}
