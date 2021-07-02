import React, { useCallback, useEffect, useState } from 'react';
import { Text, Wrap, Image, WrapItem, Box, Tabs, TabList, TabPanels, Tab, TabPanel, useDisclosure, useColorModeValue } from "@chakra-ui/react"


//部品
import { useLoginUser } from "../hooks/useLoginUser";
import { useAuthCheck } from "../hooks/useAuthCheck";

import { useGetRecipe } from '../hooks/useGetRecipe'
import NoImage from '../images/no-image.png'
import { RecipeCard } from "../organism/RecipeCard";
import { RecipeModal } from "../organism/RecipeModal";
import { useSelectRecipe } from "../hooks/useSelectRecipe";

export const Mypage = () => {
  const { loginUser } = useLoginUser();
  const { getRecipe, recipes, loading } = useGetRecipe();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectRecipe, selectedRecipe } = useSelectRecipe();

  const { CheckAuth } = useAuthCheck();

  useEffect(() => {
    CheckAuth()
  }, [])

  useEffect(() => getRecipe(), {
  }, [])

  const onClickRecipe = useCallback((id) => {
    onSelectRecipe({ id, recipes, onOpen })
  }, [recipes, onSelectRecipe, onOpen]);

  // タブ背景色の定義
  const colors = useColorModeValue(
    ["red.50", "blue.50"],
    ["red.900", "blue.900"],
  )
  const [tabIndex, setTabIndex] = useState(0)
  const bg = colors[tabIndex]

  console.log(loginUser);

  return (
    <div>
      {/* 後でカード化 */}
      <Box mt={78} p={2} mx={2}
        boxShadow="inner" rounded="md" bg="white">
        <Text pl={2} mb={2}>
          {/* {`${loginUser.name}   さん`} */}
          {/* リロードするとloginUser.nameが見つからないとでる */}
        </Text>
        <Wrap justify="space-around">
          <WrapItem>
            <Image
              borderRadius="full"
              boxSize="80px"
              src="https://source.unsplash.com/random"
            />
          </WrapItem>
          <WrapItem >
            <Wrap>
              <WrapItem>
                投稿
                  {/* {`${loginUser.recipe.length}`} */}
              </WrapItem>
              <WrapItem>
                お気に入り
              </WrapItem>
            </Wrap>
          </WrapItem>
        </Wrap>
      </Box>
      <Tabs isFitted variant="enclosed" onChange={(index) => setTabIndex(index)} bg={bg}>
        <TabList mb="1em">
          <Tab>投稿レシピ</Tab>
          <Tab>お気に入りレシピ</Tab>
        </TabList>
        <TabPanels>
          {/* 投稿レシピ */}
          <TabPanel>
            <Wrap p={{ base: 2, md: 5 }}>
              {recipes.map((recipe) => (
                <WrapItem
                  key={recipe.id}
                  mx="auto"
                  overflow="hidden"
                  m={0}
                >
                  <RecipeCard

                    id={recipe.id}
                    imageUrl={"image_url" ? "image_url" : NoImage}
                    title={recipe.title}
                    // time_required={recipe.time_required}
                    // food={recipe.food}
                    // created_at={recipe.created_at}
                    // process={recipe.process}
                    onClick={onClickRecipe}
                  />
                </WrapItem>
              ))}
            </Wrap>

            <RecipeModal recipes={selectedRecipe} isOpen={isOpen} onClose={onClose} />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}



