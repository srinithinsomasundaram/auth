import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCnHd6J2MXRpKNhnv7Wgp9ogqyZxSWhtas",
  authDomain: "mothiwebapp.firebaseapp.com",
  projectId: "mothiwebapp",
  storageBucket: "mothiwebapp.appspot.com",
  messagingSenderId: "577317188121",
  appId: "1:577317188121:web:d007678cf1e7fb2f05f088",
  measurementId: "G-39RTFB1QHZ"
};
firebase.initializeApp(firebaseConfig);
  
export default firebase