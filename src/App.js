import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then(res=> {
        const {displayName, email, photoURL }= res.user;
        console.log(displayName, email, photoURL);
      })
}

return (
  <div className="App">
    <h1>Firebase Auth</h1>
    <button onClick={handleSignIn}>Sign in</button>
  </div>
);
}

export default App;
