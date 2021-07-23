import { memo } from "react";
import { Box, Image, Stack, Text, Wrap } from "@chakra-ui/react";

import NoImage from '../images/no-image.png'
import moment from 'moment/moment'


export const RecipeCard = memo((props) => {
  const { id, imageUrl, title, time_required, food, created_at, onClick } = props;
  return (
    <Box
      w={{ base: "170px", md: "300px" }}
      h={{ base: "180px", md: "300px" }}
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={{ base: "2.5", md: "6" }}
      m={{ base: "0.5", md: "2" }}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign="center">
        <Image
          borderRadius="md"
          boxSize={{ base: "110px", md: "180px" }}
          src={imageUrl}
          m="auto"
        />
        <Text fontSize={{ base: "sm", md: "md" }} fontWeight="bold" m="0" >
          {title}
        </Text>

        <Wrap m="0">
          <Text fontSize={{ base: "xs", md: "sm" }} color="gray" as="sub">
            {`所要時間 ${time_required}分`}
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }} color="gray" >{`レシピ作成日${moment(created_at).format('YYYY-MM-DD')}`}</Text>
        </Wrap>
        {/* <Text fontSize={{ base: "xs", md: "sm" }} color="gray" maxW="280px" overflow="hidden" m="0" textOverflow="ellipsis" whiteSpace="nowrap">{`食材：${food}`}</Text> */}
      </Stack>
    </Box>
  )
})
