// This is the Firebase JS for "login.html"

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import { initializeUser, checkUserInitialized, getDataById} from './firestoreInteraction.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsxEFrwVRWghNoIsM215D6FR3sVTQglzM",
    authDomain: "is216-studyat.firebaseapp.com",
    projectId: "is216-studyat",
    storageBucket: "is216-studyat.appspot.com",
    messagingSenderId: "1043716791299",
    appId: "1:1043716791299:web:ddf9c83c382fa418b10236",
    measurementId: "G-CKS9DEQ9CD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Email and Password Login
document.getElementById("login").addEventListener('click', function () {
    const authspinner = document.getElementById("authspinner")
    const emailLogin = document.getElementById("emailLogin").value
    const passwordLogin = document.getElementById("passwordLogin").value

    authspinner.style.display = "block" // Show spinner

    signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...

            // Check if user data exists:
            checkUserInitialized(user.uid).then( // This is a promise
                // Promise is required so that the function will be completed before moving on to the next statement
                function (value) { // Resolved
                    // User data exists, login success!
                    sessionStorage.setItem('email', user.email);
                    sessionStorage.setItem('uid', user.uid);
                    getDataById(user.uid).then(function (value) {
                        sessionStorage.setItem('background', value.data.background);
                        sessionStorage.setItem('favColor', value.data.favColor);
                        sessionStorage.setItem('musicChoice', value.data.musicChoice);
                        sessionStorage.setItem('name', value.data.name);
                        sessionStorage.setItem('numGoals', value.data.numberOfGoalsCompleted);
                        sessionStorage.setItem('numTasks', value.data.numberOfTaskCompleted);
                        sessionStorage.setItem('totalTime', value.data.totalTimeOfSessions);
                        sessionStorage.setItem('firstTime',value.data.firstTime);
                        sessionStorage.setItem('image', value.data.image);
                        sessionStorage.setItem('notes', (JSON.stringify(value.data.notes)));
                        sessionStorage.setItem('todo', (JSON.stringify(value.data.todo)));
                        sessionStorage.setItem('sessions', (JSON.stringify(value.data.sessions)));
                        checkDataForCustomization()
                    })
                },
                function (error) { // Rejected
                    // User data does not exist, commence data creation!
                    // Create new user data:
                    initializeUser(user.uid).then( // This is a promise
                        function (value) { // Resolved
                            // User data created, login success!
                            sessionStorage.setItem('email', user.email);
                            sessionStorage.setItem('uid', user.uid);
                            getDataById(user.uid).then(function (value) {
                                sessionStorage.setItem('background', value.data.background);
                                sessionStorage.setItem('favColor', value.data.favColor);
                                sessionStorage.setItem('musicChoice', value.data.musicChoice);
                                sessionStorage.setItem('name', value.data.name);
                                sessionStorage.setItem('numGoals', value.data.numberOfGoalsCompleted);
                                sessionStorage.setItem('numTasks', value.data.numberOfTaskCompleted);
                                sessionStorage.setItem('totalTime', value.data.totalTimeOfSessions);
                                sessionStorage.setItem('firstTime',value.data.firstTime);
                                sessionStorage.setItem('image', value.data.image);
                                sessionStorage.setItem('notes', (JSON.stringify(value.data.notes)));
                                sessionStorage.setItem('todo', (JSON.stringify(value.data.todo)));
                                sessionStorage.setItem('sessions', (JSON.stringify(value.data.sessions)));
                                checkDataForCustomization()
                            })

                        },
                        function (error) { // Rejected
                            // User data not created, error!
                            const errorAlert = document.getElementById("errorAlert")
                            const errorText = document.getElementById("errorMessage")
                            errorText.innerText = "Please Try Again" // Edit Error Message
                            authspinner.style.display = "none" // Hide spinner
                            errorAlert.style.display = "block" // Display Error Alert
                        }
                    )
                }
            )
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // alert(errorMessage + "\n\nPlease try again." )

            // DOM Manipulation
            const errorAlert = document.getElementById("errorAlert")
            const errorText = document.getElementById("errorMessage")
            errorText.innerText = errorMessage.substr(9,) // Edit Error Message
            authspinner.style.display = "none" // Hide spinner
            errorAlert.style.display = "block" // Display Error Alert
        });
})

// Google Login
document.getElementById("googlelogin").addEventListener('click', function () {
    const authspinner = document.getElementById("authspinner")
    authspinner.style.display = "block" // Show spinner

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...

            // Check if user data exists:
            checkUserInitialized(user.uid).then( // This is a promise
                // Promise is required so that the function will be completed before moving on to the next statement
                function (value) { // Resolved
                    // User data exists, login success!
                    // User data created, login success!
                    sessionStorage.setItem('email', user.email);
                    sessionStorage.setItem('uid', user.uid);
                    getDataById(user.uid).then(function (value) {
                        sessionStorage.setItem('background', value.data.background);
                        sessionStorage.setItem('favColor', value.data.favColor);
                        sessionStorage.setItem('musicChoice', value.data.musicChoice);
                        sessionStorage.setItem('name', value.data.name);
                        sessionStorage.setItem('numGoals', value.data.numberOfGoalsCompleted);
                        sessionStorage.setItem('numTasks', value.data.numberOfTaskCompleted);
                        sessionStorage.setItem('totalTime', value.data.totalTimeOfSessions);
                        sessionStorage.setItem('firstTime',value.data.firstTime);
                        sessionStorage.setItem('image', value.data.image);
                        sessionStorage.setItem('notes', (JSON.stringify(value.data.notes)));
                        sessionStorage.setItem('todo', (JSON.stringify(value.data.todo)));
                        sessionStorage.setItem('sessions', (JSON.stringify(value.data.sessions)));
                        checkDataForCustomization()
                    })
                },
                function (error) { // Rejected
                    // User data does not exist, commence data creation!
                    // Create new user data:
                    initializeUser(user.uid).then( // This is a promise
                        function (value) { // Resolved
                            // User data created, login success!
                            sessionStorage.setItem('email', user.email);
                            sessionStorage.setItem('uid', user.uid);
                            getDataById(user.uid).then(function (value) {
                                sessionStorage.setItem('background', value.data.background);
                                sessionStorage.setItem('favColor', value.data.favColor);
                                sessionStorage.setItem('musicChoice', value.data.musicChoice);
                                sessionStorage.setItem('name', value.data.name);
                                sessionStorage.setItem('numGoals', value.data.numberOfGoalsCompleted);
                                sessionStorage.setItem('numTasks', value.data.numberOfTaskCompleted);
                                sessionStorage.setItem('totalTime', value.data.totalTimeOfSessions);
                                sessionStorage.setItem('firstTime',value.data.firstTime);
                                sessionStorage.setItem('image', value.data.image);
                                sessionStorage.setItem('notes', (JSON.stringify(value.data.notes)));
                                sessionStorage.setItem('todo', (JSON.stringify(value.data.todo)));
                                sessionStorage.setItem('sessions', (JSON.stringify(value.data.sessions)));
                                checkDataForCustomization()
                            })
                        },
                        function (error) { // Rejected
                            // User data not created, error!
                            const errorAlert = document.getElementById("errorAlert")
                            const errorText = document.getElementById("errorMessage")
                            errorText.innerText = "Please Try Again" // Edit Error Message
                            authspinner.style.display = "none" // Hide spinner
                            errorAlert.style.display = "block" // Display Error Alert
                        }
                    )
                }
            )
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

            // alert(errorMessage + "\n\nPlease try again." )

            // DOM Manipulation
            const errorAlert = document.getElementById("errorAlert")
            const errorText = document.getElementById("errorMessage")
            errorText.innerText = errorMessage.substr(9,) // Edit Error Message
            authspinner.style.display = "none" // Hide spinner
            errorAlert.style.display = "block" // Display Error Alert
        });

})

function checkDataForCustomization() {
    // Trace customized data fields
    let nameSet = sessionStorage.getItem('name')
    let favColorSet = sessionStorage.getItem('favColor') 
    let musicSet = sessionStorage.getItem('musicChoice')

    if ((nameSet != "") && (favColorSet != "") && (musicSet != "")){
        // Customized data present, sending user to room
        window.location.replace("roomV2.html")
    } else {
        // Customized data not present, sending user to user_customization page
        window.location.replace("user_customization.html")
    }
}