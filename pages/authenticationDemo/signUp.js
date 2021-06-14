import { useRouter } from 'next/router'
import Link from 'next/link'
import firebase, { db } from './Firebase';
import useInput from "./useInput"


const SignUpForm = () => {
  const email = useInput("")
  const password = useInput("")
  const router = useRouter()


  const signUp = async (event) => {
    event.preventDefault();
    try {
      if (firebase) {
        const user = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        db.collection("users").add({
          "email": email.value,
          "password": password.value
        })
        console.log("user", user)
        alert(`Welcome ${email.value}!`);
        router.push('/authentication/login')
      }
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };


  return (
    <>
      <form onSubmit={signUp}>
        <input placeholder="Email" {...email} />
        <input placeholder="Password" type="password" {...password}/>
        <button type="submit">submit</button>
      </form>
      <Link href='/authentication/login'>
      <a>LogIn page</a>
      </Link>
    </>
  )
}



export default SignUpForm