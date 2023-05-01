import { useState } from "react";
import { ref, uploadBytesResumable, } from "firebase/storage";
import { storage } from "@/firebase";

export default function addImg({idUsers}) {
  const [image, setImage] = useState("");

  const onIsertImage = (e) => {
    e.preventDefault();

    const metadata = {
      contentType: 'image/jpeg'
    };

    if (image) {
      const imgRef = ref(storage, `${idUsers}/images/${image.name}`);
      console.log(imgRef);
      uploadBytesResumable(imgRef, image, metadata)
        .then(() => {
          setImage(null);
          console.log("send image");
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      setImage(null);
    }
  }

  return (
    <form className="formTasks">
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
      <button
        type="submit"
        onClick={onIsertImage}
        className="btnAdd"
      >Ajouter l'image</button>
    </form>
  )
}