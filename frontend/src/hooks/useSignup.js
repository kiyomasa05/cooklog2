/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessege";
import { useLoginUser } from "./providers/useLoginUserProvider";

import { signupURL } from '../urls/index'

export const useSignup = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({})
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")

  const handleLogin = useCallback((data) => {
    setLoggedInStatus("ログイン中")
    setUser(data.user)
    // ログインステータスを変更する関数
  }, [user])

  const handleLogout = useCallback(() => {
    setLoggedInStatus("未ログイン")
    setUser({})
    // 実行後、ステータスとユーザーを空にする
  }, [user])

  const handleSuccessfulAuth = useCallback((data) => {
    handleLogin(data)
    // handleLogin関数をここで再利用する
  }, [])

  const signup = useCallback((data) => {
    setLoading(true);
    //ローディングアイコンをtrueに
    axios.post(signupURL,
      {
        user: {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        }
      },
      { withCredentials: true }
    ).then(response => {
      if (response.data.status === 'created') {
        handleSuccessfulAuth(response.data);
        showMessage({ title: "新規登録しました", status: "success" });
        history.push({
          pathname: '/mypage',
          state: {
            status: loggedInStatus,
            user: user,
          }
        });
        // apiを叩き成功したらメソッドが起動し、data(userのデータ)をmypageに渡してページ遷移する
      }
    }).catch((error) => {
      console.log("registration error", error)
      showMessage({ title: "登録できませんでした", status: "error" });
      setLoading(false);
    })
  }, []);
  
  return { signup, loading };
};
