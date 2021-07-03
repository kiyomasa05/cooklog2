import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
//theme
import theme from "./theme/theme"
import { Router } from "./routes/Router"

import { useAuthCheck } from "./hooks/useAuthCheck"
import { useLoginUser } from "./hooks/useLoginUser"


export default function App() {

  const { CheckAuth } = useAuthCheck();
  const { loginUser } = useLoginUser();
  
  useEffect(() => {
    CheckAuth()
  })
  console.log(loginUser)

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider >
  );
}
