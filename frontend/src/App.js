import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, useHistory } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
//theme
import theme from "./theme/theme"
import { Router } from "./routes/Router"
import { useMessage } from "./hooks/useMessege"

// import { useAuthCheck } from "./hooks/useAuthCheck"
import { logged_inURL } from './urls';

export default function App() {
  // const [user, setUser] = useState({})
  // const history = useHistory();
  // const { showMessage } = useMessage();


  // useEffect(() => {
  //   useAuthCheck()
  // })

  // const useAuthCheck = () => {
  //   axios.get(logged_inURL, { withCredentials: true })
  //     .then(response => {
  //       if (response.data.logged_in === true) {
  //         setUser(response.data.user)
  //       }
  //       // 認証できなかった時のエラー
  //       else if (response.data.logged_in === false) {
  //         showMessage({ title: `${response.data.errors}`, status: "error" });
  //         history.push("/login");
  //       }
  //       // うまくpostできなかった時のエラー
  //     }).catch((e) => {
  //       console.log(e)
  //     })
  // }

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider >
  );
}
