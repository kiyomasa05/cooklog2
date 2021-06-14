import React from 'react';
import { Link } from "react-router-dom";
import { Text, Wrap, Image, WrapItem, Box, Spacer } from "@chakra-ui/react"


//部品
import { Container } from '../component/wrapper/Login_Wrapper'
import { useLoginUser } from "../hooks/useLoginUser";

export const Mypage = () => {
  const { loginUser } = useLoginUser();
  // console.log(loginUser)
  return (
    <div>

      {/* 後でカード化 */}
      <Box mt={78} p={2} mx={2}
        boxShadow="inner" rounded="md" bg="white">
        <Text mb={2}>ユーザー名
        {/* {`${loginUser.user.name}さん`} */}
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
      <Container>

        マイページ
          <h2>ログイン状態:
          {/* {`${loginUser.logged_in}`} */}
        </h2>
        <h2>ユーザー:
        {/* {`${loginUser.user.name}`} */}
          さん
        </h2>
        <Link to="/mypage/post">
          料理投稿
          </Link>
      </Container>
    </div>
  );
}
