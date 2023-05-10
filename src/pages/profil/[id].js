import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { auth, storage } from "@/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, list } from "firebase/storage";
import AddImg from "@/components/addImg.js";
import CardImg from "@/components/cardImg.js";
import Navbar from "@/components/navbar.js";

export default function profil() {
  const [email, setEmail] = useState("");
  const [idUsers, setidUsers] = useState("");
  const [dataImg, setdataImg] = useState([]);
  const router = useRouter();

  useMemo(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) { return (router.push('/login')) }
      setEmail(user.email);
      setidUsers(user.uid);
      const listRef = ref(storage, `${user.uid}/images/`);
      list(listRef)
        .then((response) => {
          response.items.forEach((imgRef) => {
            getDownloadURL(imgRef).then((urlImg) => {
              const pathImg = [imgRef][0]._location.path_;
              setdataImg(dataImg => [...dataImg, [pathImg,urlImg]]);
            })
          })
        })
        .catch((error) => {
          console.log(error);
        })
    }) 
  }, [])

  return (
    <>
      <Head>
        <title>Profil</title>
        <meta name="description" content="Profil on googlePhotoPauvre" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="xl">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
            >
              Profil de { email }
            </Typography>
          </Container>
          <AddImg
            idUsers = { idUsers }
            dataImg={ dataImg }
            setdataImg = { setdataImg }
          ></AddImg>
        </Box>
        <Container sx={{ py: 8 }} width="xl">
          <Grid container spacing={4}>
            {dataImg.map((url, index) => (
              <CardImg
                key = { index }
                urlArray = { url }
              ></CardImg>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  )
}