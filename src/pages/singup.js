import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.js";

export default function singup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        console.log(userCredential);
        router.push(`/profil/${userId}`)
      })
      .catch((error) => {
        console.log(error.code, "//", error.message);
        setError(error.code);
      })
  }

  return (
    <>
      <Head>
        <title>Singup</title>
        <meta name="description" content="Singup on googlePhotoPauvre" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <h2 className="titleForm">Inscription</h2>
        <form className="formLogin">
          <div>
            <input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="inputLogin"
            />
          </div>
          <div>
            <input
              type="password"
              label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="password"
              className="inputLogin"
            />
          </div>
          {error ? (<p className="errorMsg">email invalide</p>) :<></>}
          <button
            type="submit"
            onClick={onSubmit}
            className="btnLog"
          >Inscription</button>
        </form>
      </div>
    </>
  )
}