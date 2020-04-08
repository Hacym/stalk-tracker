import React from "react";
import Header from "../shared/header/header";
import AuthError from "../shared/auth-error/auth-error";
import firebase from "../shared/firebase/firebase";

import "./login.scss";

class Login extends React.Component {
  state: {
    email: string;
    password: string;
    couldNotLogin: false,
    errorCode: null
  };

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      couldNotLogin: false,
      errorCode: null
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  handleEmailChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ email: event.currentTarget.value });
  }

  handlePasswordChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ password: event.currentTarget.value });
  }

  loginUser(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    this.setState({couldNotLogin: false});

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
          window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        this.setState({couldNotLogin: true, errorCode: error.code});
      });
  }

  render() {
    return (
      <div className="Login">
        <Header></Header>
        <div className="justify-content-center form">
          <form className="d-flex flex-column">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={this.handleEmailChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={this.handlePasswordChange}
              ></input>
            </div>
            <div>
                {this.state.couldNotLogin ? <AuthError errorCode={this.state.errorCode}/> : null}
            </div>
            <button
              className="btn btn-primary float-right"
              onClick={this.loginUser}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
