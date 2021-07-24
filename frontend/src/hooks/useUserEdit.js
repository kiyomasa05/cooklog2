/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessege";
import { useLoginUser } from "./useLoginUser"

import { userEditURL } from '../urls/index'

export const useUserEdit = () => {
  const history = useHistory();
  const { setLoginUser } = useLoginUser();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
 
  const userEdit = useCallback((data,userId) => {
    setLoading(true);
    axios.patch(userEditURL(userId),
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
      if (response.data.status === 'updated') {
        setLoginUser(response.data)
        showMessage({ title: "編集しました", status: "success" });
        const user_id = response.data.user.id
        history.push(`/users/${user_id}`);
      }
      // 登録できなかった時のエラー
      else if (response.data.status === 500) {
        showMessage({ title: `${response.data.errors}`, status: "error" });
      }
    }).catch((error) => {
      showMessage({ title: "登録できませんでした", status: "error" });
      setLoading(false);
    })
  }, []);

  return { userEdit, loading };
};
