import React, { Fragment, useReducer, useEffect, memo, useCallback } from 'react';
import {
  useDisclosure,
  Wrap,
  WrapItem,
  Text,
  Spinner,
  Center
} from "@chakra-ui/react";

// components
//api
import { useGetRecipe } from '../hooks/useGetRecipe'
// import { Header } from '../organism/Header/Header'
// //画像
import NoImage from '../images/no-image.png'


import { RecipeCard } from "../organism/RecipeCard";
// import { useAllUsers } from "../../../hooks/useAllUsers";
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
  const { onSelectRecipe, selectedRecipe } = useSelectRecipe();
  const { loginUser } = useLoginUser();


  const [state, dispatch] = useReducer(recipeReducer, initialState);

  useEffect(() => getRecipe(), {
  }, [])

  const onClickRecipe = useCallback((id) => {
    onSelectRecipe({ id, recipes, onOpen })
  }, [recipes, onSelectRecipe, onOpen]);
  // console.log(selectedRecipe)
  console.log(recipes)
  // console.log(loginUser);

  return (
    <>
      {/* <Header /> */}
      <Text fontSize={{ base: "24px", md: "28px" }} mt={24} textAlign={['center']}>投稿レシピ一覧
        </Text>
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
              <WrapItem key={recipe.id} mx="auto"  overflow="hidden" textAlign="center">
                <RecipeCard
                  id={recipe.id}
                  imageUrl={recipe.image_url ? recipe.image_url : NoImage}
                  title={recipe.title}
                  time_required={recipe.time_required}
                  food={recipe.food}
                  created_at={recipe.created_at}
                  process={recipe.process}
                  onClick={onClickRecipe}
                />
              </WrapItem>
            ))}
          </Wrap>
      }
      <RecipeModal recipes={selectedRecipe} isOpen={isOpen} onClose={onClose} />
    </>
  );
})
