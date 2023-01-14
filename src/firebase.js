import * as firebase from 'firebase/app'
require("firebase/auth");


const firebaseConfig = {
      
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export {
    firebase
}