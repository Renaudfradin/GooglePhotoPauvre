import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Typography from "@mui/material/Typography";
import Navbar from '@/components/navbar';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home on googlePhotoPauvre" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Box sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Image
          src="../../logo_photos.svg"
          width={100}
          height={100}
          alt="Picture of the author"
        ></Image>
        <Typography variant="h4" color="inherit" noWrap sx={{ fontSize: "4vh", marginTop: "20px"}}>
          Make the most of your memories with Google Photos
        </Typography>
        <Button
          color="info"
          variant="contained"
          href="/login"
          sx={{ bgcolor: "info.main", marginTop: "20px" }}
        >
        Connexion
        </Button>
      </Box>
    </>
  )
}
