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

  return (
    <div key={index}>
      <img
        src={urlArray[1]}
        width="350px"
        priority
      ></img>
      <button
        onClick={remove}
      >
        suprimer
      </button>
  </div>
  )
}