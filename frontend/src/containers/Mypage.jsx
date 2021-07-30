import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Text, Wrap, Image, WrapItem, Box, Button, Center,
  Grid, GridItem, Tabs, TabList, TabPanels, Tab, TabPanel, useDisclosure, useColorModeValue
} from "@chakra-ui/react"
import { useHistory, useParams } from "react-router-dom";


//部品
import { useLoginUser } from "../hooks/useLoginUser";
import { useAuthCheck } from "../hooks/useAuthCheck";

import { useGetRecipe } from '../hooks/useGetRecipe'
import NoImage from '../images/no-image.png'
import { RecipeCard } from "../organism/RecipeCard";
import { RecipeModal } from "../organism/RecipeModal";
import { useSelectRecipe } from "../hooks/useSelectRecipe";
import { useGetFavo } from '../hooks/useGetFavo';

export const Mypage = memo(() => {
  const { loginUser } = useLoginUser();
  const { getRecipe, recipes, loading } = useGetRecipe();
  const { getFavoRecipe, FavoRecipes } = useGetFavo();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectRecipe, selectedRecipe } = useSelectRecipe();
  const history = useHistory();
  const { id } = useParams();

  const { CheckAuth } = useAuthCheck();

  useEffect(() => {
    CheckAuth();
  }, [])

  useEffect(() => {
    getRecipe()
  }, [])

  useEffect(() => {
    getFavoRecipe(id)
  }, [])

  const onClickRecipe = useCallback((id) => {
    onSelectRecipe({ id, recipes, onOpen })
  }, [recipes, onSelectRecipe, onOpen]);

  const onClickProfileEdit = useCallback(() => history.push(`/users/${id}/edit`), [history]);

  // タブ背景色の定義
  const colors = useColorModeValue(
    ["red.50", "blue.50"],
    ["red.900", "blue.900"],
  )
  const [tabIndex, setTabIndex] = useState(0)
  const bg = colors[tabIndex]

  // const userId = {
  //   user: {
  //     id: 0
  //   }
  // }
  // loginUser ? userId = loginUser.user.id  
  // userId = loginUser.user.id  || userId
  // マイレシピオブジェクトの中にrecipeの全部からuseridが一致する物を取り出し、格納する
  // 格納後、map配列で表示する
  //ログアウトするとコンパイルエラーとなる
  // if (loginUser.logged_in) {
  //   userId = loginUser.user.id
  // }
  const MyRecipes = recipes.filter(function (recipe) {
    return recipe.user_id === loginUser.user.id
  });
  //お気に入りロジック
  // 1apiからloginuserと同じfavoriteモデルにidが紐付いているレシピidを取得する　これが一番簡単そう
  //2apiからfavoriteモデルのallを取得して、reactでloginuserのidとfavoriteのuserが一致しているidのレシピidを取得
  //それをrecipesから抜き出す（ちょっと回りくどいのとmypageが重くなりそう）
  //recipe取得に誰がどのpostにお気に入りしているかの情報を受け取り、userと同じidのレシピのみ表示する(filter)
  //api showにリクエストして、お気に入りを取得する　showではそのユーザーのお気に入りレシピを取得する

  return (
    <>
      <Grid
        h="200px"
        templateRows="repeat(6)"
        templateColumns="repeat(5)"
        gap={1}
        mx="auto"
        mt={78}
      >
        <GridItem rowSpan={1} colSpan={6} ml={2} pb="-2" fontSize="lg">
          {loginUser.logged_in ?
            `${loginUser.user.name}   さん` :
            <Text> 検索中 </Text>
          }
        </GridItem>
        <GridItem rowSpan={3} colSpan={2} mx="auto" display="flex" justifyContent="center" alignItems="center">
          <Image
            borderRadius="full"
            boxSize="100px"
            src="https://source.unsplash.com/random"
          />
        </GridItem>
        <GridItem rowSpan={1} colSpan={2} textAlign="center" display="flex" justifyContent="center" alignItems="center">
          投稿レシピ
        </GridItem>
        <GridItem rowSpan={1} colSpan={2} display="flex" justifyContent="center" alignItems="center" >
          お気に入り
        </GridItem>
        <GridItem rowSpan={1} colSpan={2} display="flex" justifyContent="center" alignItems="center" fontSize="2xl">
          {`${MyRecipes.length}`}
        </GridItem>
        <GridItem rowSpan={1} colSpan={2} display="flex" justifyContent="center" alignItems="center" fontSize="2xl">
          {`${MyRecipes.length}`}
        </GridItem>
        <GridItem rowSpan={1} colSpan={6} >
          <Button w="100%" h="90%" onClick={onClickProfileEdit}>編集</Button>
        </GridItem>
      </Grid>

      <Tabs isFitted variant="enclosed" onChange={(index) => setTabIndex(index)} bg={bg} >
        <TabList mb="1em">
          <Tab>投稿レシピ</Tab>
          <Tab>お気に入りレシピ</Tab>
        </TabList>
        <TabPanels>
          {/* 投稿レシピ */}
          <TabPanel >
            <Wrap>
              {MyRecipes.map((recipe) => (
                <WrapItem
                  key={recipe.id}
                  overflow="hidden"
                  m={0}>
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
            <RecipeModal recipes={selectedRecipe} isOpen={isOpen} onClose={onClose} loginUser={loginUser} />
          </TabPanel>
          <TabPanel>
            {/* お気に入りレシピ */}
            <Wrap>
              {FavoRecipes.map((recipe) => (
                <WrapItem
                  key={recipe.id}
                  overflow="hidden"
                  m={0}>
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
            <RecipeModal recipes={selectedRecipe} isOpen={isOpen} onClose={onClose} loginUser={loginUser} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
})



