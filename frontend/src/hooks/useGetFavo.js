import { useCallback, useState } from "react";
import axios from "axios";

import { getFavoURL } from '../urls/index'
import { useMessage } from './useMessege'


export const useGetFavo = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [FavoRecipes, setFavoRecipes] = useState([]);

  const getFavoRecipe = useCallback((loginUserId) => {
    setLoading(true)
    axios.get(getFavoURL(loginUserId),
      { withCredentials: true }
    ).then(response => {
      setFavoRecipes(response.data)
    })
      .catch((e) => {
        showMessage({ title: "お気に入りレシピ取得に失敗しました", status: "error" });
        setLoading(false);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  return { getFavoRecipe,loading,FavoRecipes };
};
