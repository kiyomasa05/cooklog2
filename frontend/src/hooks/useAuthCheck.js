import {useState} from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessege";

import { logged_inURL } from '../urls/index'

export const useAuthCheck = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const [loginUser, setLoginUser] = useState(null);

  axios
    .get(logged_inURL)
    .then(response => {
      if (response.data.logged_in === true) {
        setLoginUser(response.data.user)
      }
      // 認証できなかった時のエラー
      else if (response.data.logged_in === false) {
        showMessage({ title: `${response.data.errors}`, status: "error" });
        history.push("/login");
      }
      // うまくpostできなかった時のエラー
    }).catch((e) => {
      console.log(e)
    })
}
