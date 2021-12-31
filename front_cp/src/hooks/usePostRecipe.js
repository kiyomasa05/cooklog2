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
          user_id: loginUser.user.id,
          title: data.title,
          time_required: data.time_required,
          food: data.food,
          process: data.process,
          // image
        }
      }
      , { withCredentials: true }
    ).then(response => {
      if (response.data.created) {
        showMessage({ title: "投稿に成功しました", status: "success" });
        history.push("/index");
      }
      else if (response.data.status === 500) {
        showMessage({ title: `${response.data.errors}`, status: "error" });
      }
    }).catch(e => {
      showMessage({ title: "投稿できませんでした", status: "error" });
      setLoading(false);
    })
  }, [history, showMessage]);
  return { postRecipe, loading };
};
