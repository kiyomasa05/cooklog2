import { memo, useEffect, useCallback } from "react";
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
import { StarIcon, SmallCloseIcon, EditIcon } from '@chakra-ui/icons'
import moment from 'moment/moment'
import { useHistory } from "react-router-dom";

import { useFavo } from "../hooks/useFavo"
import NoImage from '../images/no-image.png'

export const RecipeModal = memo((props) => {
  const { isOpen, onClose, recipes, loginUser } = props;

  const history = useHistory();
  const { callFavorite, deleteFavorite, initialFavoState, favorite } = useFavo();

  //モーダルレンダーと同時に実行,targetRecipeが変わるたびに実行
  useEffect(() => {
    initialFavoState(recipes?.id)
  }, [recipes])

  //お気に入り登録機能
  const onClickFavo = () => {
    callFavorite(recipes.id, loginUser.user.id)
  }
  //お気に入り解除機能
  const onClickFavosol = () => {
    deleteFavorite(recipes.id, loginUser.user.id)
  }

  const recipeId = recipes?.id
  const onClickRecipeEdit = useCallback(() => history.push
    ({
      pathname: `/${recipeId}/edit`,
      state: recipes 
    }), [history]);

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
          {
            loginUser.user.id !== recipes?.user_id ?
              //もしログインユーザーのidとレシピのidが違う場合、何もせず、同じならレシピ編集ボタンを設置
              <div></div>
              : <Button leftIcon={<EditIcon color="black" />} colorScheme="gray" color="black" mr={3} onClick={onClickRecipeEdit}>
                編集
              </Button>
          }
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
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
})
