/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessege";
import { useLoginUser } from "./useLoginUser"

import { signupURL } from '../urls/index'

export const useSignup = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);
  
  const signup = useCallback(async(data,avatar) => {
    setLoading(true);
    //ローディングアイコンをtrueに
    await axios.post(signupURL,
      {
        user: {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
          avatar:
          {
            data: avatar.data,
            name: avatar.name
          }
        }
      },
      { withCredentials: true }
    ).then(response => {
      if (response.data.status === 'created') {
        setLoginUser(response.data)
        showMessage({ title: "新規登録しました", status: "success" });
        const user_id = response.data.user.id
        history.push(`/users/${user_id}`);
      }
      // 登録できなかった時のエラー
      else if (response.data.status === 500) {
        showMessage({ title: `${response.data.errors}`, status: "error" });
      }
    }).catch((error) => {
      // console.log("registration error", error)
      showMessage({ title: "登録できませんでした", status: "error" });
      setLoading(false);
    })
  }, []);

  return { signup, loading };
};
