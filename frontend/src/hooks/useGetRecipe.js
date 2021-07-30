import { useCallback, useState } from "react";
import axios from "axios";

import { index } from '../urls/index'
import { useMessage } from './useMessege'

export const useGetRecipe = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const getRecipe = useCallback((data) => {
    setLoading(true)
    //ローディングアイコンをtrueに
    axios
      .get(index)
      .then(response => {
        setRecipes(response.data)
      })
      .catch(() => {
        showMessage({ title: "レシピの取得に失敗しました", status: "error" })
        setLoading(false);
      }).finally(() => {
        setLoading(false);
      });
  }, []);
  return { getRecipe, loading, recipes };
}
