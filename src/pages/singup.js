import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.js";
import Navbar from "@/components/navbar.js";

export default function singup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      <Navbar />
      <Container component="main">
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <Typography component="h2" variant="h5">
            Inscription
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={onSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Inscription
            </Button>
            <Grid container>
              <Link href="/login" variant="body2">
                {"Connexion"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}