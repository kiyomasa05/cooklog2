import { useCallback, useState } from "react";
import axios from "axios";

import { favoURL } from '../urls/index'
import { useMessage } from './useMessege'
import { useLoginUser } from "../hooks/useLoginUser"


export const useFavo = () => {
  const { showMessage } = useMessage();
  const { loginUser } = useLoginUser();
  const [favorite, setFavorite] = useState();

  const callFavorite = useCallback((recipe_id) => {
    axios.post(favoURL(recipe_id),
      {
        user_id: loginUser.user.id,
        recipe_id: recipe_id
      },
      { withCredentials: true }
    ).then(response => {
      if (response.data) {
        showMessage({ title: "お気に入り登録しました", status: "success" });
        setFavorite(true)
      }
      // 認証できなかった時のエラー
      else if (response.data.status === 500) {
        showMessage({ title: "お気に入り登録できませんでした", status: "error" });
      }
      // うまくpostできなかった時のエラー
    }).catch((e) => {
      showMessage({ title: "お気に入り登録できませんでした。", status: "error" });
    })
  }, [showMessage]);

  return { callFavorite, favorite };
  //favoliteを親コンポでも使いたいセットした値を返したい
};
