/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessege";
import { useLoginUser } from "../hooks/useLoginUser"

import { post } from '../urls/index'

export const usePostRecipe = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { loginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const postRecipe = useCallback((data) => {
    setLoading(true);

    axios.post(post,
      {
        recipe: {
          user_id: loginUser.id,
          title: data.title,
          time_required: data.time_required,
          food: data.food,
          process: data.process,
          // image:image
        }
      }
      , { withCredentials: true }
    ).then(response => {
      if (response.data.created) {
        showMessage({ title: "投稿しました", status: "success" });
        history.push("/index");
      }
      else if (response.data.status === 401) {
        showMessage({ title: `${response.data.errors}`, status: "error" });
      }
    }).catch(e => {
      showMessage({ title: "投稿できませんでした", status: "error" });
      setLoading(false);
    })
  }, [history, showMessage]);
  return { postRecipe, loading };
};



    //ローディングアイコンをtrueに
//     axios.post(loginURL,
//       {
//         user: {
//           email: data.email,
//           password: data.password,
//         }
//       },
//       { withCredentials: true }
//     ).then(response => {
//       if (response.data.logged_in) {
//         // contextにログインユーザーの情報を保存
//         setLoginUser(response.data)
//         // handleSuccessfulAuth(response.data);
//         showMessage({ title: "ログインしました", status: "success" });
//         history.push("/mypage");
//         // apiを叩き成功したらメソッドが起動し、data(userのデータ)をmypageに渡してページ遷移する
//       }
//       // 認証できなかった時のエラー
//       else if (response.data.status === 401) {
//         showMessage({ title: `${response.data.errors}`, status: "error" });
//       }
//       // うまくpostできなかった時のエラー
//     }).catch((e) => {
//       showMessage({ title: "認証できませんでした。再度リロードなどを行いやり直して下さい", status: "error" });
//       setLoading(false);
//     })
//   }, [history, showMessage, setLoginUser]);

//   return { login, loading };
// };
