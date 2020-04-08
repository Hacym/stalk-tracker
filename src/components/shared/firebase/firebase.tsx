import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBKIiH77xwW49N4E66kg25_Ho77HLzVbYg",
  authDomain: "stalk-tracker.firebaseapp.com",
  databaseURL: "https://stalk-tracker.firebaseio.com",
  projectId: "stalk-tracker",
  storageBucket: "stalk-tracker.appspot.com",
  messagingSenderId: "846590413015",
  appId: "1:846590413015:web:739ee8dd735abea3220892",
  measurementId: "G-8B8WPJSF7E",
};

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        localStorage.setItem('stalk.loggedIn', '1');
    } else {
        localStorage.removeItem('stalk.loggedIn');
    }
});

export default firebase;
