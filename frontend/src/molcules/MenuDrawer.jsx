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

export const MenuDrawer = memo((props) => {
  const { isOpen, onClose, btnRef } = props;
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
            <Button w="100%">レシピ</Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
