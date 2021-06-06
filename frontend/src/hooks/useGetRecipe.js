import { useCallback,useState } from "react";
import axios from "axios";

import { index } from '../urls/index'

export const useGetRecipe = () => {
  const [loading, setLoading] = useState(false);
  const getRecipe = useCallback((data) => {
    setLoading(true);
    //ローディングアイコンをtrueに
    axios.get(index)
      .then(response => {
        return response.data
      })
      .catch((error) => {
        console.log("get error", error)
        setLoading(false);
      })
  }, []);
  return { getRecipe, loading };
}
