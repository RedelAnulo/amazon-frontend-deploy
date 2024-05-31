import firebase from "firebase/compat/app";

import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDGaHv0TY-ul1mfAnfXxfMRKWtA7g3x7Tg",
	authDomain: "clone-1802a.firebaseapp.com",
	projectId: "clone-1802a",
	storageBucket: "clone-1802a.appspot.com",
	messagingSenderId: "954656989850",
	appId: "1:954656989850:web:6446593277f802fc4df523",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = app.firestore();
