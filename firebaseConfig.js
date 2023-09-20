// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

 

const firebaseConfig = {
  apiKey: "AIzaSyCv4osJsBh9uIKstWsZjfyNufta8PrlPGI",
  authDomain: "hngx-task3.firebaseapp.com",
  projectId: "hngx-task3",
  storageBucket: "hngx-task3.appspot.com",
  messagingSenderId: "817215387171",
  appId: "1:817215387171:web:84761735463fb8c184e396",
  measurementId: "G-WQ2VKQS52B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth()
