/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessege";
import { useLoginUser } from "./useLoginUser"

import { loginURL } from '../urls/index'

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback((data) => {
    setLoading(true);
    //ローディングアイコンをtrueに
    axios.post(loginURL,
      {
        user: {
          email: data.email,
          password: data.password,
        }
      },
      { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in) {
        setLoginUser(response.data)
        showMessage({ title: "ログインしました", status: "success" });
        const user_id = response.data.user.id
        history.push(`/users/${user_id}`);
      }
      // 認証できなかった時のエラー
      else if (response.data.status === 401) {
        showMessage({ title: `${response.data.errors}`, status: "error" });
      }
      // うまくpostできなかった時のエラー
    }).catch((e) => {
      showMessage({ title: "認証できませんでした。再度リロードなどを行いやり直して下さい", status: "error" });
      setLoading(false);
    })
  }, [history, showMessage, setLoginUser]);

  return { login, loading };
};
