// configure and initialize firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC4kNEysuj6aJw-icnD4jq8-OlXRbiHwbk",
  authDomain: "hackernewstest-68bf6.firebaseapp.com",
  projectId: "hackernewstest-68bf6",
  storageBucket: "hackernewstest-68bf6.appspot.com",
  messagingSenderId: "333000170340",
  appId: "1:333000170340:web:67e011ff895a17c2d43871",
  databaseURL: "https://hacker-news.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

// export database product for use
const db = getDatabase(app);
export default db;