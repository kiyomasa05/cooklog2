/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessege";
import { useLoginUser } from "./useLoginUser"

import { logoutURL } from '../urls/index'

export const useLogout = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const logout = useCallback(() => {
    axios.delete(logoutURL,
      { withCredentials: true }
    ).then(response => {
      setLoginUser({})
      showMessage({ title: "ログアウトしました", status: "success" });
      history.push("/login");
      // うまくpostできなかった時のエラー
    }).catch((e) => {
      showMessage({ title: "ログアウトできませんでした。再度ボタンを押してください", status: "error" });
    })
  }, [history, showMessage, setLoginUser]);

  return { logout };
};
