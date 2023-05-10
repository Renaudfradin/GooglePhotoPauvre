import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogOutbtn from "./logOutBtn";
import { useEffect, useState } from "react";
import { auth } from "@/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

export default function navbar() {
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => { 
      setUser(user);
    })
  }, [])


  return (
    <AppBar>
      <Toolbar sx={{ display: "flex" , justifyContent: "space-between"}}>
        <Typography variant="h6" color="inherit" noWrap>
          Google Photo Du Pauvre
        </Typography>
        {user ? <LogOutbtn /> : ""}
      </Toolbar>
    </AppBar>
  )
}