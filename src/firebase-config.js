// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXVVEKnNU5UyWuWxE9ICfuwPOj8ErdnvI",
    authDomain: "social-media-app-ff1ff.firebaseapp.com",
    projectId: "social-media-app-ff1ff",
    storageBucket: "social-media-app-ff1ff.appspot.com",
    messagingSenderId: "194146451862",
    appId: "1:194146451862:web:041a92475c66961aa59db7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)