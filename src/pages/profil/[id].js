import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { auth } from "@/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import LogOutbtn from "@/components/logOutBtn.js";
import AddImg from "@/components/addImg.js";
import CardImg from "@/components/cardImg";

export default function profil() {
  const [email, setEmail] = useState('');
  const [idUsers, setidUsers] = useState('');
  const router = useRouter();

  useMemo(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setidUsers(user.uid);
      } else {
        router.push('/login');
      }
    })
  }, [])

  return (
    <>
      <Head>
        <title>Profil de</title>
        <meta name="description" content="Profil on googlePhotoPauvre" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>profil de { email }</h1>
        <AddImg
          idUsers = { idUsers }
        ></AddImg>
        <CardImg
          idUsers = { idUsers }
        ></CardImg>
        <LogOutbtn />
      </div>
    </>
  )
}