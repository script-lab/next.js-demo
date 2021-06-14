import { useRouter } from 'next/router'
import Link from 'next/link'
import firebase from './Firebase'
import useInput from "./useInput"


const LogInForm = () => {
  const email = useInput("")
  const password = useInput("")
  const router = useRouter()


  const signIn = async (event) => {
    event.preventDefault();
    try {
      if (firebase) {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        console.log("user", user);
        alert("Welcome back!");
        router.push('/authentication');
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  return (
    <>
      <form onSubmit={signIn}>
        <input placeholder="Email" {...email} />
        <input placeholder="Password" type="password" {...password}/>
        <button type="submit">submit</button>
      </form>
      <Link href='/authentication/signUp'>
      <a>SignUP page</a>
      </Link>
    </>
  )
}


export default LogInForm