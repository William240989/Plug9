import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtYZp1HpRsitMBoGaDpdl2NvTcryxktJ4",
  authDomain: "plug-6515b.firebaseapp.com",
  databaseURL: "https://plug-6515b-default-rtdb.firebaseio.com",
  projectId: "plug-6515b",
  storageBucket: "plug-6515b.firebasestorage.app",
  messagingSenderId: "77240750325",
  appId: "1:77240750325:web:3345beef7e7dba687fb5bc",
  measurementId: "G-ZMFQNLW7DX",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database };
