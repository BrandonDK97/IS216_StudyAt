// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getFirestore, doc, setDoc, collection, addDoc, getDoc, getDocs, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
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
const db = getFirestore(); // Initialize Firestore

export async function initializeUser(userId) {
    // This function creates a data collection for new users in firestore
    const userRef = doc(db, "users", userId) // Create a path for user data to be stored using userId as unique key

    // Set documents
    await setDoc(userRef, {
        name: "",
        favColor: "",
        background: "",
        musicChoice: "",
        totalTimeOfSessions: 0,
        numberOfGoalsCompleted: 0,
        numberOfTaskCompleted: 0,
        firstTime: true,
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        notes: [
            {
                subject: "is216",
                title: "first note",
                content: "this is a sample note."
            },
            {
                subject: "is216",
                title: "second note",
                content: "this is another sample note"
            }
        ],
        todo: [
            {
                status: false,
                content: "Incomplete Task"
            },
            {
                status: true,
                content: "Completed Task"
            }
        ],
        sessions: [
            // === Sample Format ===
            // {
            // date: "",
            // totalTime: "",
            // tasksCompleted: "",
            // goalReached: false
            // }
        ]
    });

    const docSnap = await getDoc(userRef) // Create snapshot of current user's data

    // Confirm if current user's data is initialized
    return new Promise((resolve, reject) => {
        if (docSnap.exists()) { // Resolve Case
            resolve(true)
        } else { // Reject Case
            reject(false)
        }
    })
}

export async function checkUserInitialized(userId) {
    // This function checks if the user has an existing data collection in firestore
    const docRef = doc(db, "users", userId) // Create a path to current user's data
    const docSnap = await getDoc(docRef) // Create snapshot of current user's data

    // Confirm if current user's data is initialized
    return new Promise((resolve, reject) => {
        if (docSnap.exists()) { // Resolve Case
            resolve(true)
        } else { // Reject Case
            reject(false)
        }
    })
}

// ==================== GET FUNCTIONS ====================
// Get All 
export async function getAllData() {
    const q = query(collection(db, 'users'));
    var userArray = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        userArray.push({
            id: doc.id,
            data: doc.data()
        })
    })
    return userArray
}

// Get data by User ID
export async function getDataById(userId) {
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    var user = {};
    querySnapshot.forEach((doc) => {
        if (userId == doc.id) {
            user = {
                id: doc.id,
                data: doc.data(),
            }
        }
    })

    return user;
}

// ==================== UPDATE FUNCTIONS ====================
// Update field by Id (userId, dataName, newValue)
export async function updateDataById(userId, dataName, newValue, obj) {
    const userDocRef = doc(db, 'users', userId)
    await updateDoc(userDocRef, {
        [dataName]: newValue
    });
    return obj
}

export async function updateAllbyId(userId, obj) {
    // This function pushes all sessionStorage variables to Firestore
    const userDocRef = doc(db, 'users', userId)
    await updateDoc(userDocRef, {
        name: obj.name,
        favColor: obj.favColor,
        background: obj.background,
        musicChoice: obj.musicChoice,
        totalTimeOfSessions: obj.totalTime,
        numberOfGoalsCompleted: obj.numGoals,
        numberOfTaskCompleted: obj.numTasks,
        firstTime: obj.firstTime,
        image: obj.image,
        notes: JSON.parse(obj.notes),
        todo: JSON.parse(obj.todo),
        sessions: JSON.parse(obj.sessions)
    });
    return obj
}
