import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './account-buttons/login-button/login-button';
import LogoutButton from './account-buttons/logout-button/logout-button';

function Header() {
    return (
        <div className="Header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1 font-weight-bold">
                    <Link to="/">Stalk Tracker</Link>
                </span>
                <ul className="navbar-nav ml-auto">
                    {localStorage.getItem('stalk.loggedIn') ? <LogoutButton></LogoutButton> : <LoginButton></LoginButton>}
                </ul>
            </nav>
        </div>
    );
  }
  
  export default Header;