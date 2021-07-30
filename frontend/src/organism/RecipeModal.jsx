import { memo, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Text, Wrap,
  Image,
} from "@chakra-ui/react";
import { StarIcon, SmallCloseIcon } from '@chakra-ui/icons'
import moment from 'moment/moment'
import { useFavo, favorite } from "../hooks/useFavo"

import NoImage from '../images/no-image.png'

export const RecipeModal = memo((props) => {
  const { isOpen, onClose, recipes, loginUser } = props;
  const { callFavorite, deleteFavorite } = useFavo();
  const [favorite, setFavorite] = useState(false)

  //falseがお気に入り状態でない　trueがお気に入り状態
  const onClickFavo = () => {
    console.log("いいね")
    const favo = true
    setFavorite(favo)
    callFavorite(recipes.id, loginUser.user.id)
  }
  const onClickFavosol = () => {
    console.log("いいね解除")
    const favo = false
    setFavorite(favo)
    deleteFavorite(recipes.id, loginUser.user.id)
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {`${recipes?.title}`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Image
            borderRadius="md"
            boxSize="260px"
            src={recipes?.image_url ? `${recipes?.image_url}` : NoImage}
            m="auto"
          />
          <Stack>
            <Wrap>
              <Text fontSize="sm" color="gray">
                {`所要時間${recipes?.time_required}分`}
              </Text>
              <Text fontSize="sm" color="gray">
                レシピ作成日{`${moment(recipes?.created_at).format('YYYY-MM-DD')}`}</Text>
            </Wrap>
            <Text fontSize="sm" color="gray"  >{`食材：${recipes?.food}`}</Text>
            <Text fontSize="sm" color="gray" maxW="280px" >{`手順：${recipes?.process}`}</Text>
            <Text fontSize="sm" color="gray" maxW="280px" whiteSpace="nowrap">{`レシピ作成者：${recipes?.user_id}`}</Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          {/* loginしているuser_idと違うレシピだけお気に入りボタン表示 logoutするとここがコンパイルエラーになる*/}
          {
            loginUser.user.id !== recipes?.user_id ?
              (favorite === false ?
                (<Button leftIcon={<StarIcon color="white" />} colorScheme="blue" color="white" mr={3} onClick={onClickFavo}>
                  お気に入り登録
                </Button>)
                :
                (<Button leftIcon={<StarIcon />} colorScheme="yellow" mr={3} onClick={onClickFavosol}>
                  お気に入り登録済
                </Button>)
              ) : (<div></div>)
          }
          <Button colorScheme="blue" mr={3} onClick={onClose}><SmallCloseIcon mr="2" />
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
})
