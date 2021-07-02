import { memo } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button
} from "@chakra-ui/react"

import { useLoginUser } from '../hooks/useLoginUser'
import { Fragment } from "react";

export const MenuDrawer = memo((props) => {
  const { isOpen, onClose, btnRef, onClickHome, onClickSignup, onClickLogin, onClickIndex } = props;
  const { loginUser } = useLoginUser();
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="xs"
      finalFocusRef={btnRef}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton onClick={onClose} />
          <DrawerHeader align="center">メニュー</DrawerHeader>
          <DrawerBody p={0} bg="grey.100">
            {/* {loginUser.logged_in ?
              <Fragment>
                <Button onClick={onClickHome} onClose={onClose} w="100%">ホーム</Button>
                <Button onClick={onClickHome} onClose={onClose} w="100%">レシピ投稿</Button>
                <Button onClick={onClickIndex} onClose={onClose} w="100%">投稿一覧</Button>
                <Button onClick={onClickIndex} onClose={onClose} w="100%">ログアウト</Button>
              </Fragment>
              :
              <Fragment>
                <Button onClick={onClickHome} onClose={onClose} w="100%">ホーム</Button>
                <Button onClick={onClickSignup} onClose={onClose} w="100%">新規登録</Button>
                <Button onClick={onClickLogin} onClose={onClose} w="100%">ログイン</Button>
                <Button onClick={onClickIndex} onClose={onClose} w="100%">投稿一覧</Button>
              </Fragment>
            } */}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
