import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import LoginForm from './components/LoginForm/LoginForm';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        console.log(displayName, email, photoURL);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  }

  const handleSignOut = () => {
    firebase.auth()
      .signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signedOutUser)
        console.log(res)
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })

  }

  const handleBlur = (event) => {
    let isFromValid = true;
    if (event.target.name === 'email') {
      isFromValid = /^\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const isPasswordNumber = /\d{1}/.test(event.target.value);
      isFromValid = isPasswordValid && isPasswordNumber;
    }
    if (isFromValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = () => {

  }

  return (
    <div className="App">
      <h1>Firebase Auth</h1>

      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button>
          : <button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      
      <h2>Our own Authentication</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <form onSubmit={handleSubmit}>
        Name: <input type="text" name="name" onBlur={handleBlur} placeholder="Your name"/>
        <br/>
        Email: <input type="text" name="email" onBlur={handleBlur} placeholder="Enter Your Email" required />
        <br />
                Password: <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" required />
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default App;
