import React, {
  createContext,
  useState,
  useEffect
} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useMessage } from "../useMessege";
import { logged_inURL } from '../../urls/index'



export const CheckLoginContext = createContext({});

// ログインユーザー情報を保持するcontext
export const LoginUserProvider = (props) => {
  const { children } = props;
  const history = useHistory();
  const { showMessage } = useMessage();

  const [loginUser, setLoginUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const loginCheck = useCallback(() => {
      axios
        .get(logged_inURL)
        .then(response => {
          if (response.data.logged_in === true) {
            setLoginUser(response.data.user)
            setChecked(true)
          }
          // 認証できなかった時のエラー
          else if (response.data.logged_in === false) {
            setChecked(false)
            showMessage({ title: `${response.data.errors}`, status: "error" });
            history.push("/login");
          }
          // うまくpostできなかった時のエラー
        }).catch((e) => {
          console.log(e)
        })
    }, [history, showMessage, setLoginUser]);
    loginCheck();
  })

  return (
    <CheckLoginContext.Provider value={{ loginUser, setLoginUser, checked }}>

      {children}
    </CheckLoginContext.Provider>
  );
};


