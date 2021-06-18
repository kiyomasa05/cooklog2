import React, { memo, useCallback } from "react";
import {
  Flex, Heading, Text, Box, Link, useDisclosure
} from "@chakra-ui/react"
import { useHistory } from "react-router-dom";

import { MenuIconButton } from '../../atom/btn/MenuIconButton'
import { MenuDrawer } from '../../molcules/MenuDrawer'


export const HeaderMenu = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef()
  const history = useHistory();

  const onClickHome = useCallback(() => history.push("/"), [history]);
  const onClickLogin = useCallback(() => history.push("/login"), [history]);
  const onClickSignup = useCallback(() => history.push("/signup"), [history]);
  const onClickIndex = useCallback(() => history.push("/index"), [history]);
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
            <Link onClick={onClickSignup}>新規登録</Link>
          </Box>
          <Link onClick={onClickLogin}>ログイン</Link>
          <Link onClick={onClickIndex}>投稿一覧</Link>
        </Flex>
        <MenuIconButton onOpen={onOpen} btnRef={btnRef} />
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} btnRef={btnRef} onClickHome={onClickHome} onClickSignup={onClickSignup} onClickLogin={onClickLogin} onClickIndex={onClickIndex} />
    </>
  )
});
