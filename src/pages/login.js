import Head from "next/head";
import { useState } from "react"
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.js";

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        console.log(userId);
        router.push(`/profil/${userId}`);
      })
      .catch((error) => {
        console.log(error.code, "//", error.message);
        setError(error.code);
      })
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login on googlePhotoPauvre" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <h2 className="titleForm">Connexion</h2>
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
              placeholder="Mot de passe"
              className="inputLogin"
            />
          </div>
          {error ? (<p className="errorMsg">utilisateur non trouvé ou mot de passe erroné</p>) :<></>}
          <button
            type="submit"
            onClick={onLogin}
            className="btnLog"
          >Connexion</button>
        </form>
      </div>
    </>
  )
}