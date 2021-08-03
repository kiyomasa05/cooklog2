import { useCallback, useState } from "react";
import axios from "axios";
import { useMessage } from "./useMessege";

import { setFavoURL } from "../urls";

// 選択したレシピ情報を特定しモーダルを表示するカスタムフック
export const useSelectRecipe = () => {
  const { showMessage } = useMessage();

  const [selectedRecipe, setSelectedRecipe] = useState();
  const [favorite, setFavorite] = useState(false);

  const onSelectRecipe = useCallback((props) => {
    const { id, recipes, onOpen } = props;
    const targetRecipe = recipes.find((recipe) => recipe.id === id);
    //findは条件に一致する最初の要素を返す
    //recipeのidと選択したidが一致したものを返す
    if (!targetRecipe) {
      showMessage({ title: "レシピが見つかりません", status: "error" });
      return;
    } else {
      setSelectedRecipe(targetRecipe);
      onOpen();
    }
    axios
      .get(setFavoURL(targetRecipe.id),
        { withCredentials: true })
      //targetRecipeのidとuser_idをparamsに含める 
      .then(response => {
        setFavorite(response.data)//favoriteのtrueかfalseが入る
      })
      .catch((e) => {
        showMessage({ title: `${e.errors}`, status: "error" })
      })
  }, []);
  return { onSelectRecipe, selectedRecipe, favorite };
};
