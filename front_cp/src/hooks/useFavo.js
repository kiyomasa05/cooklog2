import { useCallback, useEffect, useState } from "react";
import axios from "axios";

//部品
import { useMessage } from './useMessege'
import { useLoginUser } from "../hooks/useLoginUser"
// import { useGetFavo } from '../hooks/useGetFavo';

//url
import { favoURL, setFavoURL } from '../urls/index'


export const useFavo = () => {
  const { showMessage } = useMessage();
  const { loginUser } = useLoginUser();
  const [favorite, setFavorite] = useState(false);
  
  const initialFavoState = useCallback((recipe_id) => {
    axios
      // .get(setFavoURL(`${recipe?.id}`),
      .get(setFavoURL(recipe_id),
        { withCredentials: true })
      .then(response => {
        setFavorite(response.data)//favoriteのtrueかfalseが入る
      })
      .catch((e) => {
        // showMessage({ title: `${e.errors.fullmessage}`, status: "error" })
      })
  }, [])

  const callFavorite = useCallback((recipe_id, loginUserId) => {
    axios.post(favoURL(recipe_id),
      {
        data: {
          user_id: loginUserId,//sessionさえ送ればidいらないんじゃない？
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
    axios.delete(favoURL(recipe_id), {
      data: {
        user_id: loginUserId,
        recipe_id: recipe_id
      }
    }, { withCredentials: true }
    ).then(response => {
      if (response.data.status==="delete") {
        showMessage({ title: "お気に入り解除しました", status: "success" });
        setFavorite(false)
      }
      //今基本的には上だけ。rails でif文使ってないから
      // 認証できなかった時のエラー
      else if (response.data.status === 500) {
        showMessage({ title: `${response.data.errors}`, status: "error" });
      }
      // うまくpostできなかった時のエラー
    }).catch((e) => {
      showMessage({ title: "お気に入り解除できませんでした。", status: "error" });
    })
  }, [showMessage]);


  return { callFavorite, deleteFavorite, initialFavoState, favorite };
};
