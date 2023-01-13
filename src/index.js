import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './RoutesMain';
import '../src/Resources/css/app.css';
//import './firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = (props) => {
  return (
    <Routes {...props}/>
  )
}



const root = ReactDOM.createRoot(document.getElementById('root'));
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  
    
    root.render(
      <App user={user}/>
    );
  
});
