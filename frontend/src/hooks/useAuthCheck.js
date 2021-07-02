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


  const CheckAuth = useCallback(() => {
    axios
      .get(logged_inURL, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          setLoginUser(response.data)
          console.log(response.data)
        }
        // 認証できなかった時のエラー
        else if (response.data.logged_in === false) {
          showMessage({ title: `${response.data.errors}`, status: "error" });
          history.push("/login");
        }
        // うまくgetできなかった時のエラー
      }).catch((e) => {
        showMessage({ title: "認証が確認できません", status: "error" });
      })
  }, [history, showMessage, setLoginUser]);

  return { CheckAuth };
}
