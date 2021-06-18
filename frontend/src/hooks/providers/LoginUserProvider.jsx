import React, {
  createContext,
  useState,
  useEffect
} from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

import { useMessage } from "../useMessege";
import { logged_inURL } from '../../urls/index'

export const LoginUserContext = createContext({});

// 追加したい。userのログイン状態を保持する機能useeffect利用

// ログインユーザー情報を保持するcontext
export const LoginUserProvider = (props) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState(null);
  // const history = useHistory();
  // const { showMessage } = useMessage();

  // const [checked, setChecked] = useState(false);

  // useEffect(() => {
  //   const loginCheck = () => {
  //     axios
  //       .get(logged_inURL, { withCredentials: true })
  //       .then(response => {
  //         if (response.data.logged_in === true) {
  //           setLoginUser(response.data.user)
  //           setChecked(true)
  //         }
  //         // 認証できなかった時のエラー
  //         else if (response.data.logged_in === false) {
  //           setChecked(false)
  //           setLoginUser("")
  //           showMessage({ title: `${response.data.errors}`, status: "error" });
  //           history.push("/login");
  //         }
  //         // うまくpostできなかった時のエラー
  //       }).catch((e) => {
  //         console.log(e)
  //       })
  //   };
  //   loginCheck();
  // },[])


  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};


