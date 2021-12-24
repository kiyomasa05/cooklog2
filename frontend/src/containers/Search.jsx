import React, { useEffect, memo, useCallback, useState } from 'react';
import {
  useDisclosure,
  Wrap,
  WrapItem,
  Center,
  Heading,
  Input
} from "@chakra-ui/react";

import NoImage from '../images/no-image.png'

import { useGetRecipe } from '../hooks/useGetRecipe'

import { RecipeCard } from "../organism/RecipeCard";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { RecipeModal } from "../organism/RecipeModal";
import { useSelectRecipe } from "../hooks/useSelectRecipe";
import { useLoginUser } from "../hooks/useLoginUser";

export const Search = memo(() => {
  const { getRecipe, recipes, loading } = useGetRecipe();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectRecipe, selectedRecipe } = useSelectRecipe();
  const { loginUser } = useLoginUser();

  const { CheckAuth } = useAuthCheck();

  useEffect(() => {
    CheckAuth()
  }, [])

  useEffect(() => getRecipe(), {
  }, [recipes])

  const [keyword, setKeyword] = useState("");
  const [showLists, setShowLists] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    if (keyword === "") {
      setFilteredRecipes(recipes);
      return;
    }
    //入力されたkeywordの
    // trim = 文字列の両端の空白を削除
    // toLowerCase = 文字列を小文字に
    // match = 当てはまるか
    // [^\s]+は空白文字(半角・全角)以外の任意の一文字以上の連続にヒットさせる条件
    // gフラグはmatchメソッドのオプションで、文字列の中から正規表現に一致する要素を全て配列として返却する
    const searchKeywords = keyword
      .trim()
      .toLowerCase()
      .match(/[^\s]+/g);

    //入力されたキーワードが空白のみの場合
    if (searchKeywords === null) {
      setFilteredRecipes(recipes);
      return;
    }

    //検索窓に入力した文字列が入っているtitleのレシピを格納し、filterdrecipeにセットする
    const Resultrecipes = recipes.filter(function (recipe, index) {
      if ((recipe.title).indexOf(`${searchKeywords}`) >= 0) return true;
    });

    setFilteredRecipes(Resultrecipes.length ? Resultrecipes : ["No Item Found"]);
  }, [keyword]);

  const onClickRecipe = useCallback((id) => {
    onSelectRecipe({ id, recipes, onOpen })
  }, [recipes, onSelectRecipe, onOpen]);

  return (
    <>
      <Heading as="h2" size="lg" mt={24} textAlign={['center']}>レシピ検索（タイトル検索）</Heading>

      <Center m={"16"}>
        <Input
          placeholder='検索'
          size='lg'
          onChange={(e) => setKeyword(e.target.value)}
          onClick={() => setShowLists(true)}
        />
      </Center>
      {/* textfieldがクリックされた状態で＝trueでfilterdレシピがあれば繰り返す */}
      <Wrap p={{ base: 4, md: 10 }}>
        {showLists &&
          filteredRecipes.map((recipe) => (
            <WrapItem key={recipe.id} mx="auto" overflow="hidden" textAlign="center">
              <RecipeCard
                id={recipe.id}
                imageUrl={recipe.image_url ? recipe.image_url : NoImage}
                title={recipe.title}
                time_required={recipe.time_required}
                food={recipe.food}
                created_at={recipe.created_at}
                process={recipe.process}
                loginUser={loginUser}
                onClick={onClickRecipe}
              />
            </WrapItem>
          ))}
        </Wrap>
          <RecipeModal recipes={selectedRecipe} isOpen={isOpen} onClose={onClose} loginUser={loginUser}
          />
    </>
  );
})
