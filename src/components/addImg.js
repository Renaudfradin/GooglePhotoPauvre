import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function addImg({idUsers,dataImg,setdataImg}) {
  const [image, setImage] = useState("");

  const onIsertImage = (e) => {
    e.preventDefault();
    const metadata = {
      contentType: 'image/jpeg'
    };

    if (image) {
      const imgRef = ref(storage, `${idUsers}/images/${image.name}`);
      uploadBytesResumable(imgRef, image, metadata)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((urlImg) => {
            const pathImg = [imgRef][0]._location.path_;
            setdataImg(dataImg => [...dataImg, [pathImg,urlImg]]);
          })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <div className="blockInputInfo">
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0])
          }}
          className="inputTasks"
          accept=".jpg, .jpeg, .png"
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        onClick={onIsertImage}
        sx={{ maxWidth: "sm" }}
      >
        Ajouter l'image
      </Button>
    </Box>
  )
}