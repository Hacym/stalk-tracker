import React from "react";
import Header from "../shared/header/header";
import firebase from "../shared/firebase/firebase";

import "./register.scss";
import AuthError from "../shared/auth-error/auth-error";

class Register extends React.Component {
  state: {
    email: string;
    password: string;
    confirmEmail: string;
    confirmPassword: string;
    couldNotRegister: false;
    friendCode: string;
    errorCode: null;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmEmail: "",
      confirmPassword: "",
      couldNotRegister: false,
      friendCode: "",
      errorCode: null,
    };

    this.handleEvent = this.handleEvent.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  handleEvent = (key: string) => (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({[key]: event.currentTarget.value });
  }

  validateForm(): boolean {
    if (!(this.state.email === this.state.confirmEmail)) {
      this.setState({
        couldNotRegister: true,
        errorCode: "register/field-validation-email",
      });

      return false;
    }

    if (!(this.state.confirmPassword === this.state.password)) {
      this.setState({
        couldNotRegister: true,
        errorCode: "register/field-validation-password",
      });

      return false;
    }

    if (
      this.state.confirmPassword.length === 0 ||
      this.state.confirmEmail.length === 0 ||
      this.state.email.length === 0 ||
      this.state.password.length === 0 ||
      this.state.friendCode.length === 0
    ) {
      this.setState({
        couldNotRegister: true,
        errorCode: "register/blank-field",
      });

      return false;
    }

    return true;
  }

  registerUser(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.setState({ couldNotRegister: false, errorCode: null });
    if (this.validateForm()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.email,
          this.state.confirmPassword
        )
        .then(async () => {
          const user = firebase.auth().currentUser;

          if (user) {
            await firebase.database().ref('users/' + user.uid).set({
              friendCode: this.state.friendCode
            });

            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ couldNotRegister: true, errorCode: error.code });
        });
    }
  }

  render() {
    return (
      <div className="Register">
        <Header></Header>
        <div className="justify-content-center form">
          <form className="d-flex flex-column">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={this.handleEvent('email')}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="confirm-email">Confirm E-mail</label>
              <input
                type="email"
                className="form-control"
                id="confirm-email"
                onChange={this.handleEvent('confirmEmail')}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={this.handleEvent('password')}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={this.handleEvent('confirmPassword')}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="friend-code">Friend Code</label>
              <input
                type="text"
                className="form-control"
                id="friend-code"
                onChange={this.handleEvent('friendCode')}
              ></input>
            </div>
            <div>
              {this.state.couldNotRegister ? (
                <AuthError errorCode={this.state.errorCode} />
              ) : null}
            </div>
            <button
              type="submit"
              className="btn btn-primary float-right"
              onClick={this.registerUser}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
