import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC8j4sPb6XAV-OMk9co5U8jFJYZe0zxcvI",
  authDomain: "power-hack-5a984.firebaseapp.com",
  projectId: "power-hack-5a984",
  storageBucket: "power-hack-5a984.appspot.com",
  messagingSenderId: "944622637488",
  appId: "1:944622637488:web:873f9983024b8d39a38675",
};

// Initialize Firebase

const initializeFirebaseApp = () => {
  initializeApp(firebaseConfig);
};

export default initializeFirebaseApp;
