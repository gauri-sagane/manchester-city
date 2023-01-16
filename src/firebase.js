import * as firebase from 'firebase/app';
import * as firestore from 'firebase/firestore';
import { collection, doc } from "firebase/firestore";
//import { collection, doc, setDoc } from "firebase/firestore";
//import { cityDb } from './temp/m-city-export';
require("firebase/auth");



const firebaseConfig = {
      
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



const DB = firestore.getFirestore();
//const matchesCollection = collection('matches');
const matchesCollection = doc(collection(DB, "matches"));
const playersCollection = doc(collection(DB, "players"));
const positionsCollection = doc(collection(DB, "positions"));
const promotionsCollection = doc(collection(DB, "promotions"));
const teamsCollection = doc(collection(DB, "teams"));

// cityDb.matches.forEach(item => {
//     setDoc(matchesCollection, item);
// });

// cityDb.players.forEach(item => {
//     setDoc(playersCollection, item);
// });

// cityDb.positions.forEach(item => {
//     setDoc(positionsCollection, item);
// });

// cityDb.promotions.forEach(item => {
//     setDoc(promotionsCollection, item);
// });

// cityDb.teams.forEach(item => {
//     setDoc(teamsCollection, item);
// });

export {
    firebase,
    firestore,
    DB,
    matchesCollection,
    playersCollection,
    positionsCollection,
    promotionsCollection,
    teamsCollection
}