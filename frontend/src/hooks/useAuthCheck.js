/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessege";
import { useLoginUser } from "./useLoginUser"

import { logged_inURL } from '../urls/index'

export const useAuthCheck = () => {
  const { setLoginUser } = useLoginUser();
  const history = useHistory();
  const { showMessage } = useMessage();
  // console.log()

  const CheckAuth = useCallback(() => {
    axios
      .get(logged_inURL, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in === true) {
          setLoginUser(response.data.user)
        }
        // 認証できなかった時のエラー
        else if (response.data.logged_in === false) {
          setLoginUser({})
          showMessage({ title: `${response.data.errors}`, status: "error" });
          history.push("/login");
        }
        // うまくpostできなかった時のエラー
      }).catch((e) => {
        showMessage({ title: "再度送信して下さい", status: "error" });
      })
  }, [history, showMessage, setLoginUser]);
  return { CheckAuth };
}
