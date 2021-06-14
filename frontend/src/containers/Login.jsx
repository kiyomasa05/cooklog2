import React, { memo } from "react";
import { Box, Divider, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import styled from "styled-components"

import { useForm } from 'react-hook-form';
import { useAuth } from "../hooks/useAuth";

//部品
import { Header } from '../organism/Header/Header'
// import { fetchLogin } from '../apis/login';


const SSubmit = styled.input`
  width: 100%;
  max-width: 100%;
  font-size:16px;
  font-weight:bold;
  border: none;
  margin: 3rem 0;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  background: #68D391;
  color: #2D3748;
  transition: .4s;
  &:hover {
    opacity:0.8;
    color: #FFF;
}
`

export const Login = memo(() => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    login(data);
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
                type="text" placeholder="email" {...register("email", { required: true, pattern: Pattern })}
              />
              {errors.email?.type === "required" && <Text fontSize="md" color="red" m={0} p={0}>"emailは必須です"</Text>}
              {errors.email?.type === "pattern" && <Text fontSize="md" color="red" m={0} p={0}>"正しく入力して下さい"</Text>}

              <Input
                type="password" placeholder="password" {...register("password", { required: true, minLength: 4 })}
              />
              {errors.password?.type === "required" && <Text fontSize="md" color="red" m={0} p={0}>"パスワードは必須です"</Text>}
              {errors.password?.type === "minLength" && <Text fontSize="md" color="red" m={0} p={0}>"パスワードは4文字以上です"</Text>}
              <SSubmit
                type="submit"
                value="ログイン"
              />
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  );
});
