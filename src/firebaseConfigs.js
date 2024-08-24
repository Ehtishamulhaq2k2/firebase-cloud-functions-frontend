import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator, httpsCallable } from "firebase/functions";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7ZUAhWPsrErsSMcffn5sBWcD5ln2VVsU",
    authDomain: "learn-cloud-functions-a1bf5.firebaseapp.com",
    projectId: "learn-cloud-functions-a1bf5",
    storageBucket: "learn-cloud-functions-a1bf5.appspot.com",
    messagingSenderId: "531868773117",
    appId: "1:531868773117:web:12a0f08191a77cc1c8ac94",
    measurementId: "G-JLCMRJFMFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const functions = getFunctions(app);

connectFunctionsEmulator(functions, "localhost", 5001);
export { functions, httpsCallable };