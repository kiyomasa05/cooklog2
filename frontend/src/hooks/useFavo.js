import { useCallback, useState } from "react";
import axios from "axios";

import { favoURL } from '../urls/index'
import { useMessage } from './useMessege'
// import { useLoginUser } from "../hooks/useLoginUser"


export const useFavo = () => {
  const { showMessage } = useMessage();
  // const { loginUser } = useLoginUser();
  const [favorite, setFavorite] = useState();

  const callFavorite = useCallback((recipe_id, loginUserId) => {
    axios.post(favoURL(recipe_id),
      {
        data: {
          user_id: loginUserId,
          recipe_id: recipe_id
        }
      },
      { withCredentials: true }
    ).then(response => {
      if (response.data.status === "created") {
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

  const deleteFavorite = useCallback((recipe_id, loginUserId) => {
    axios.request({
      method: 'DELETE',
      url: favoURL(recipe_id),
      data:
        {
          user_id: loginUserId,
          recipe_id: recipe_id
        }
      },
    // axios.delete(favoURL(recipe_id),{
    //     data:
    //     {
    //       user_id: loginUserId,
    //       recipe_id: recipe_id
    //     }
    //   },
      { withCredentials: true }
    ).then(response => {
      if (response.data) {
        showMessage({ title: "お気に入り解除しました", status: "success" });
        setFavorite(false)
      }
      // 認証できなかった時のエラー
      else if (response.data.status === 500) {
        showMessage({ title: `${response.data.errors}`, status: "error" });
      }
      // うまくpostできなかった時のエラー
    }).catch((e) => {
      showMessage({ title: "お気に入り解除できませんでした。", status: "error" });
    })
  }, [showMessage]);


  return { callFavorite, deleteFavorite, favorite };
  //favoliteを親コンポでも使いたいセットした値を返したい
};
