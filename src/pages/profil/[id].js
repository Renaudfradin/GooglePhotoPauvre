import Head from "next/head";
import { auth, database, storage } from "@/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import LogOutbtn from "@/components/logOutBtn";

export default function profil() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  useMemo(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setEmail(user.email);
      } else {
        router.push('/login');
      }
    })
  }, [])

  return (
    <>
      <Head>
        <title>Profil de { email }</title>
        <meta name="description" content="Profil on googlePhotoPauvre" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>profil de {email}</h1>
        <LogOutbtn />
      </div>
    </>
  )
}