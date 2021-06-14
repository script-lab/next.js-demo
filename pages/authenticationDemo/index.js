import {useState, useEffect} from 'react';
import firebase from './Firebase'


const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    if (firebase) {
      firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          setCurrentUser(authUser.email);
        } else {
          setCurrentUser(null);
        }
      });
    }
  }, []);


  const signOut = async () => {
    try {
      if (firebase) {
        await firebase.auth().signOut();
        alert("Successfully signed out!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  return (
    <>
      <h1>Welcome Next.js !</h1>
      <p>{currentUser}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}


export default Home