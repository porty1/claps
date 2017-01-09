// Initialize Firebase
var config = {
  apiKey: "AIzaSyCXvegZEIikHPazfjoCg55dqO8y1fC_3oI",
  authDomain: "clapstest-76d40.firebaseapp.com",
  databaseURL: "https://clapstest-76d40.firebaseio.com",
  storageBucket: "clapstest-76d40.appspot.com",
  messagingSenderId: "81865488549"
};
firebase.initializeApp(config);
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
