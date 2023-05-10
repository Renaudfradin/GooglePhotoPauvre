import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { storage } from "@/firebase.js";
import { getDownloadURL, ref, deleteObject } from "firebase/storage";
import { useRouter } from "next/router";

export default function cardImg({ index, urlArray }) {
  const router = useRouter()

  const remove = () => {
    const refDelImg = ref(storage, `${urlArray[0]}`)
    console.log(refDelImg);
    deleteObject(refDelImg).then(() => {
      console.log(`img supr ${refDelImg}`);
      router.reload(window.location.pathname)
    }).catch((error) => {
      console.log(error);
    });
  }

  // const downloadImg = () => {
  //   console.log("test");
  // }

  return (
    <Grid item key={index} xs={12} sm={6} md={4}>
      <Card
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardMedia
          component="img"
          sx={{
            height:"250px"
          }}
          src={urlArray[1]}
          alt={urlArray[0]}
        />
        <CardActions sx={{ justifyContent: "center"}}>
          <Button size="small" onClick={remove} sx={{ color: "warning.main" }}>Suprimer</Button>
          {/* <Button size="small" onClick={downloadImg}>Télecharger</Button> */}
        </CardActions>
      </Card>
    </Grid>
  )
}