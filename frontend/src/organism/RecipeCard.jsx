import { memo } from "react";
import { Box, Image, Stack, Text, Wrap } from "@chakra-ui/react";

import NoImage from '../images/no-image.png'
import moment from 'moment/moment'

// まだ反映させない
export const RecipeCard = memo((props) => {
  const { id, imageUrl, title, time_required, food, created_at, onClick } = props;
  return (
    <Box
      w={{ base: "150px", md: "300px" }}
      h={{ base: "150px", md: "300px" }}
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={{ base: "2.5", md:"6"}}
      m={{ base: "0.5", md:"2"}}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign="center">
        <Image
          borderRadius="md"
          boxSize={{ base: "80px", md: "160px" }}
          src={imageUrl ? imageUrl : NoImage}
          m="auto"
        />
        <Text fontSize={{ base: "sm", md: "lg" }} fontWeight="bold">
          {title}
        </Text>

        <Wrap>
          <Text fontSize="sm" color="gray">
            {`所要時間${time_required}分`}
          </Text>
          <Text fontSize="sm" color="gray">{`レシピ作成日${moment(created_at).format('YYYY-MM-DD')}`}</Text>
        </Wrap>
        <Text fontSize="sm" color="gray" maxW="280px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{`食材：${food}`}</Text>
      </Stack>
    </Box>

  )
})
