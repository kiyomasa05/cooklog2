import React, { memo } from "react";
import { Box, Divider, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { login } from '../urls/index'
// import { useAuth } from "../../../hooks/useAuth";

//部品
import { Header } from '../organism/Header/Header'
// import { fetchLogin } from '../apis/login';


const Submit = styled.input`
  width: 100%;
  max-width: 100%;
  font-size:16px;
  font-weight:bold;
  border: none;
  margin: 3rem 0;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  background: #9AE6B4;
  color: white;
  transition: .4s;
  &:hover {
    background: #3CC12A;
    color: #FFF;
}
`

export const Login = memo((props) => {
  // const { login, loading } = useAuth();
  const { handleSuccessfulAuth } = props;
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const onSubmit = data => fetchLogin(data);
  //後でapiを叩く場所を統一したい
  const onSubmit = (data) => {
    axios.post(login,
      {
        user: {
          email: data.email,
          password: data.password,
        }
      },
      { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in) {
        handleSuccessfulAuth(response.data);
        history.push("/mypage");
        // apiを叩き成功したらメソッドが起動し、data(userのデータ)をmypageに渡してページ遷移する
      }
    }).catch(error => {
      console.log("registration error", error)
    })
  }
  const Pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return (
    <>
      <Header />
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            ログイン
        </Heading>
          <Divider my={4} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6} py={4} px={10}>
              <Input
                type="text" placeholder="email" {...register("email", { required: true, pattern: Pattern})}
              />
              {errors.email?.type === "required" && <Text fontSize="md" color="red" m={0} p={0}>"emailは必須です"</Text>}
              {errors.email?.type !== "Pattern" && <Text fontSize="md" color="red">"正しく入力して下さい"</Text>}

              <Input
                type="password" placeholder="password" {...register("password", { required: true, minLength: 4 })}
              />
              {errors.password?.type === "required" && <Text fontSize="md" color="red">"パスワードは必須です"</Text>}
              {errors.password?.type === "minLength" && <Text fontSize="md" color="red">"パスワードは4文字以上です"</Text>}
              <Submit type="submit" value="ログイン"
              // disabled={userId === ""}
              // isLoading={loading}
              // onClick={onClickLogin}
              />
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  );
});
