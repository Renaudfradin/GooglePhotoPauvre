import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
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
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/" color="inherit" sx={{ textDecoration: "none"}}>
          <Typography variant="h6" color="inherit" noWrap>
            Google Photo Du Pauvre
          </Typography>
        </Link>
        <Box>
          {user ? <LogOutbtn /> : <>
            <Button
              color="info"
              variant="contained"
              href="/login"
              sx={{ bgcolor: "info.main" }}
            >
            Connexion
            </Button>
            <Button
              color="info"
              variant="contained"
              href="/singup"
              sx={{ bgcolor: "info.main", marginLeft: "15px" }}
            >
            Inscription
            </Button></>
          }
        </Box>
      </Toolbar>
    </AppBar>
  )
}