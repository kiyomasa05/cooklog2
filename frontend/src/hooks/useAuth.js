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

  // ステータスもhooksで管理する？
  // const [user, setUser] = useState({})
  // const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")

  // const handleLogin = useCallback((data) => {
  //   setLoggedInStatus("ログイン中")
  //   setUser(data.user)
  //   // ログインステータスを変更する関数
  // }, [user])

  // const handleLogout = useCallback(() => {
  //   setLoggedInStatus("未ログイン")
  //   setUser({})
  //   // 実行後、ステータスとユーザーを空にする
  // }, [user])

  // const handleSuccessfulAuth = useCallback((data) => {
  //   handleLogin(data)
  //   // handleLogin関数をここで再利用する
  // }, [])

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
        // contextにログインユーザーの情報を保存
        setLoginUser(response.data)
        // handleSuccessfulAuth(response.data);
        showMessage({ title: "ログインしました", status: "success" });
        history.push("/mypage");
        // apiを叩き成功したらメソッドが起動し、data(userのデータ)をmypageに渡してページ遷移する
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