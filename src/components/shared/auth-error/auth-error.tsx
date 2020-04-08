import React from "react";
import "./auth-error.scss";

function getFirebaseErrorMsg(errorCode: string): string {

  switch (errorCode) {
    case "auth/invalid-email": 
      return "Please enter a valid email address.";

    case "auth/wrong-password":
      return "Please check your email or password.";

    case "register/field-validation-email":
      return "Please make sure that your email matches the confirmation field.";

    case "register/field-validation-password":
      return "Please make sure that your password matches confirmation field.";

    case "register/blank-field":
      return "Please do not leave any of the fields blank.";

    case "auth/weak-password":
      return "Please make sure your password is at least 6 characters."
  
    case "auth/email-already-in-use":
      return "Looks like you are already registered. Please login instead.";

    default:
      return "There was an error. Please try your request again."
  }
}

function LoginError(props: any) {
  return (
    <div className="error alert alert-danger">
      {getFirebaseErrorMsg(props.errorCode)}
    </div>
  );
}

export default LoginError;
