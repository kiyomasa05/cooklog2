import { memo } from "react";
import { Box, Image, Stack, Text } from "@chakra-ui/react";

import NoImage from '../images/no-image.png'
import moment from 'moment/moment'

// まだ反映させない
export const RecipeCard = memo((props) => {
  const { id, imageUrl, title, time_required, food, created_at, onClick } = props;
  return (
    <Box
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign="center">
        <Image
          borderRadius="full"
          boxSize="160px"
          src={imageUrl ? imageUrl : NoImage}
          m="auto"
        />
        <Text fontSize="lg" fontWeight="bold">
          {item.title}
        </Text>
        <Text fontSize="sm" color="gray">
          {`${item.time_required}分`}
        </Text>
        <Text fontSize="sm" color="gray">{`食材：${item.food}`}</Text>
        <Text fontSize="sm" color="gray">{`レシピ作成日${moment(item.created_at).format('YYYY-MM-DD')}`}</Text>
        <time>{`レシピ作成日${moment(item.created_at).format('YYYY-MM-DD')}`}</time>
      </Stack>
    </Box>

  )
})
