// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth,
         GoogleAuthProvider,
         signInWithPopup,
         signOut,
         onAuthStateChanged,
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { firebaseConfig } from "./firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const googleSignInButton = document.querySelector("#googleSignInButton");
const signUpButton = document.querySelector("#signUpButton");
const signOutButton = document.querySelector("#signOutButton");

const signInEmail = document.querySelector("#signInEmail");
const signInPassword = document.querySelector("#signInPassword");
const signUpEmail = document.querySelector("#signUpEmail");
const signUpPassword = document.querySelector("#signUpPassword");

const firstNameField = document.querySelector("#firstName");
const lastNameField = document.querySelector("#lastName");
const emailField = document.querySelector("#emailField");

// Google Sign-In
const userGoogleSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        console.error(error.message);
    });
};

// Email/Password Sign-Up
const userSignUp = async () => {
    const email = signUpEmail.value;
    const password = signUpPassword.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            alert("Sign-up successful!");
        })
        .catch((error) => {
            console.error(error.message);
            alert("Error: " + error.message);
        });
};

// Email/Password Sign-In
const userSignIn = async () => {
    const email = signInEmail.value;
    const password = signInPassword.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            alert("Sign-in successful!");
        })
        .catch((error) => {
            console.error(error.message);
            alert("Error: " + error.message);
        });
};

// Sign-Out
const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!");
    }).catch((error) => {
        console.error(error.message);
    });
};

// Authentication state observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated");
        console.log(user);

        // Fill in the fields with user information
        emailField.value = user.email;
        // Assuming user.displayName follows "FirstName LastName" format
        if (user.displayName) {
            const displayName = user.displayName.split(' ');
            firstNameField.value = displayName[0];
            lastNameField.value = displayName[1] || '';
        }
    }
});

signInButton.addEventListener("click", userSignIn);
googleSignInButton.addEventListener("click", userGoogleSignIn);
signUpButton.addEventListener("click", userSignUp);
signOutButton.addEventListener("click", userSignOut);