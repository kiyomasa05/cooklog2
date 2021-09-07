import React, { memo, useCallback ,Fragment} from "react";
import {
  Flex, Heading, Text, Box, Link, useDisclosure
} from "@chakra-ui/react"
import { useHistory } from "react-router-dom";

import { MenuIconButton } from '../../atom/btn/MenuIconButton'
import { MenuDrawer } from '../../molcules/MenuDrawer'
import { useLoginUser } from '../../hooks/useLoginUser'
import { useLogout } from '../../hooks/useLogout'

export const HeaderMenu = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef()
  const history = useHistory();
  const { logout } = useLogout();
  const { loginUser } = useLoginUser();

  // const userId=loginUser.user.id
  const userId = loginUser ? loginUser.user.id : 1;
//テストエラー中 loginUserのuserが見つからない
  const onClickHome = useCallback(() => history.push("/"), [history]);
  const onClickLogin = useCallback(() => history.push("/login"), [history]);
  const onClickSignup = useCallback(() => history.push("/signup"), [history]);
  const onClickIndex = useCallback(() => history.push("/index"), [history]);
  const onClickSearch = useCallback(() => history.push("/search"), [history]);
  const onClickPost = useCallback(() => history.push(`/users/${userId}/post`), [history]);
  const onClickMypage = useCallback(() => history.push(`/users/${userId}`), [history]);
  const onClickLogout = useCallback(() => logout(), []);
  
  return (
    <>
      <Flex
        as="nav"
        bg="yellow.200"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
        pos="fixed" top="0" w="100%" zIndex={2}
      >
        <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }} onClick={onClickHome}>
          <Heading as="h1" fontSize={{ base: "lg", md: "xl" }} ><Text fontSize={{ base: "24px", md: "30px" }} color="tomato">COOKLOG</Text>
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="md"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}>
          <Box pr={4}>
            {loginUser!==undefined ?
              (
                loginUser.logged_in ?
                  <Fragment>
                    <Link mr={4} onClick={onClickMypage}>マイページ</Link>
                    <Link mr={4} onClick={onClickPost}>レシピ投稿</Link>
                    <Link mr={4} onClick={onClickIndex}>投稿一覧</Link>
                    <Link mr={4} onClick={onClickSearch}>レシピ検索</Link>
                    <Link mr={4} onClick={onClickLogout}>ログアウト</Link>
                    
                  </Fragment>
                  :
                  <Fragment>
                    <Link mr={4} onClick={onClickSignup}>新規登録</Link>
                    <Link mr={4} onClick={onClickLogin}>ログイン</Link>
                  </Fragment>
               ) : null}
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} btnRef={btnRef} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        btnRef={btnRef}
        onClickHome={onClickHome}
        onClickSignup={onClickSignup}
        onClickLogin={onClickLogin}
        onClickIndex={onClickIndex}
        onClickSearch={onClickSearch}
        onClickLogout={onClickLogout}
        onClickPost={onClickPost}
        onClickMypage={onClickMypage}
      />
    </>
  )
});

