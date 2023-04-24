import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
  
export default function logOutbtn() {
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log('user deconecter');
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