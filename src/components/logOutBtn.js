import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
  
export default function logOutbtn() {
  const router = useRouter();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <button
      type="submit"
      onClick={logOut}
      className="btnLogOut"
    >Deconnexion</button>
  )
}