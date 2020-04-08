import React from 'react';
import { Link } from 'react-router-dom';

function LoginButton() {
    return (
        <div className="LoginButton">
            <Link to="/login" className="font-weight-bold">Login</Link>
            &nbsp;|&nbsp;
            <Link to="/register" className="font-weight-bold">Register</Link>
        </div>
    );
  }
  
  export default LoginButton;