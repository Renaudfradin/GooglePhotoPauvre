import { useMemo, useState } from "react";
import { auth, storage } from "@/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, list, ref, deleteObject } from "firebase/storage";

export default function cardImg() {
  const [dataImg, setdataImg] = useState([]);
  const [idImg, setidImg] = useState([]);

  const remove = () => {
    const refDelImg = ref(storage, `${idImg}`)
    deleteObject(refDelImg).then(() => {
      console.log("img suprimer");
    }).catch((error) => {
      console.log(error);
    });
  }

  useMemo(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const listRef = ref(storage, `${user.uid}/images/`);
        list(listRef)
          .then((response) => {
            response.items.forEach((imgRef) => {
              getDownloadURL(imgRef).then((urlImg) => {
                setidImg([imgRef][0]._location.path_);
                setdataImg((prev)=>[...prev,urlImg]);
              })
            })
          })
          .catch((error) => {
            console.log(error);
          })
      }
    })
  }, [])

  return (
    <div>
      {dataImg.map((url,index) => (
        <div key={index}>
          <img
            src={url}
            width="350px"
            priority
          ></img>
          <button
            onClick={remove}
          >
            suprimer
          </button>
        </div>
      ))}
    </div>
  )
}