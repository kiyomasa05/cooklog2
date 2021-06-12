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
    }).catch((error) => {
      console.log("registration error", error)
      showMessage({ title: "ユーザーが見つかりません", status: "error" });
      setLoading(false);
    })
  }, [history, showMessage, setLoginUser]);
  //   axios
  //     .get(`https://jsonplaceholder.typicode.com/users/${id}`)
  //     .then(async res => {
  //       if (res.data) {
  //         // contextにログインユーザーの情報を保存
  //         // サンプル的にidが10のユーザーを管理者としてみる
  //         const isAdmin = res.data.id === 10 ? true : false;
  //         setLoginUser({ ...res.data, isAdmin });
  //         showMessage({ title: "ログインしました", status: "success" });
  //         history.push("/home");
  //       } else {
  //         showMessage({ title: "ユーザーが見つかりません", status: "error" });
  //         setLoading(false);
  //       }
  //     })
  //     .catch(() => {
  //       showMessage({ title: "ユーザーが見つかりません", status: "error" });
  //       setLoading(false);
  //     });
  // }, []);

  return { login, loading };
};
