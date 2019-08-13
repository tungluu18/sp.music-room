import firebase from 'firebase/app';

import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCPereELdM9KjFt2uUJg-rioqq9z4FLcUg",
  authDomain: "music-sharing-room.firebaseapp.com",
  databaseURL: "https://music-sharing-room.firebaseio.com",
  projectId: "music-sharing-room",
  storageBucket: "",
  messagingSenderId: "866853622815",
  appId: "1:866853622815:web:6e1e729f56f5d491"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export {
  database
};
