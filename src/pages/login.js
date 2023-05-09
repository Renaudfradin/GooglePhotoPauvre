import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.js";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h2" variant="h5">
            Connexion
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
              onClick={onLogin}
              sx={{ mt: 3, mb: 2 }}
            >
              Connexion
            </Button>
            <Grid container>
              <Link href="/singup" variant="body2">
                {"S'inscrire"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* {error ? (<p className="errorMsg">utilisateur non trouvé ou mot de passe erroné</p>) :<></>} */}
    </>
  )
}