import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../../firebase/firebase';

function LogoutButton() {
    async function logoutUser() {
        console.log(firebase.auth().currentUser);
        await firebase.auth().signOut();
        console.log(firebase.auth().currentUser);
        window.location.href = "/";
    }

    return (
        <div className="LogoutButton">
            <button onClick={logoutUser} className="btn btn-primary">Logout</button>
            &nbsp;|&nbsp;
            <Link to="/profile"><i className="fas fa-user"></i></Link>
        </div>
    );
}

export default LogoutButton;