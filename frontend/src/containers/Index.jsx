import React, { Fragment, useReducer, useEffect, memo, useCallback } from 'react';
import {
  useDisclosure,
  Wrap,
  WrapItem,
  Spinner,
  Center,
  Heading
} from "@chakra-ui/react";

// components
//api
import NoImage from '../images/no-image.png'


import { useGetRecipe } from '../hooks/useGetRecipe'
import { RecipeCard } from "../organism/RecipeCard";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { RecipeModal } from "../organism/RecipeModal";
import { useSelectRecipe } from "../hooks/useSelectRecipe";
import { useLoginUser } from "../hooks/useLoginUser";

// reducers
import {
  initialState,
  ActionTypes,
  recipeReducer,
} from '../reducer/recipes';


export const Index = memo(() => {

  const { getRecipe, recipes, loading } = useGetRecipe();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { getUsers, loading, users } = useAllUsers();
  const { onSelectRecipe, selectedRecipe,favorite } = useSelectRecipe();
  const { loginUser } = useLoginUser();

  const { CheckAuth } = useAuthCheck();

  useEffect(() => {
    CheckAuth()
  }, [])

  useEffect(() => getRecipe(), {
  }, [])

  const onClickRecipe = useCallback((id) => {
    onSelectRecipe({ id, recipes, onOpen })
    //ここにfavo情報を取りに行く関数をセットする
    //onselectrecipeは引数3つを受け取ってrecipesの中から引数idと一致するrecipeIdを返す　それをmodalにselected recipeとして返す
  }, [recipes, onSelectRecipe, onOpen,favorite]);


  return (
    <>
      <Heading as="h2" size="lg" mt={24} textAlign={['center']}>投稿レシピ一覧</Heading>

      {
        loading ?
          <Fragment>
            <Center>
              <Spinner
                thickness="6px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                mt="90px"
              />
            </Center>

          </Fragment>
          :
          <Wrap p={{ base: 4, md: 10 }}>
            {recipes.map((recipe) => (
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
      }
      <RecipeModal recipes={selectedRecipe} isOpen={isOpen} onClose={onClose} loginUser={loginUser} favorite={favorite} />
    </>
  );
})
