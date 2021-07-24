import React, { memo, useEffect } from "react";
import { useParams } from "react-router-dom"
import {
  Box, Divider, Flex, Heading, Input, Stack, Text, FormLabel
} from "@chakra-ui/react";
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { useUserEdit } from "../hooks/useUserEdit";
import { useLoginUser } from "../hooks/useLoginUser";
import { useAuthCheck } from "../hooks/useAuthCheck";
//部品

const SSubmit = styled.input`
  width: 100%;
  max-width: 100%;
  font-size:16px;
  font-weight:bold;
  border: none;
  margin: 2rem 0;
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

export const UserEdit = memo((props) => {
  const { userEdit } = useUserEdit();
  const { loginUser } = useLoginUser();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { id } = useParams();


  const onSubmit = ({ match }) => {
    //   (data,userId) => {
    //     console.log(data)
    //     userEdit(data, match.params.userId);
    //   }
  }

  const { CheckAuth } = useAuthCheck();
  useEffect(() => {
    CheckAuth()
  }, [])
  console.log(loginUser)

  const Pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return (
    <>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            ユーザー編集
          </Heading>
          <p>パラメーター{id}</p>
          <Divider my={4} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} py={4} px={5}>
              <FormLabel htmlFor="name" fontSize={{ base: "md", md: "md" }}>名前</FormLabel>
              <Input type="text" value={loginUser?.user.name} placeholder="name" {...register("name", { required: true, maxLength: 80 })} />{loginUser.user.name}
              {errors.name?.type === "required" && <Text fontSize="md" color="red" m={0} p={0}>"名前は必須です"</Text>}
              {errors.name?.type === "maxLength" && <Text fontSize="md" color="red" m={0} p={0}>"名前は80文字以内で入力して下さい"</Text>}
              <FormLabel htmlFor="email" fontSize={{ base: "md", md: "md" }}>メール</FormLabel>
              <Input
                type="text" mt={0} value={loginUser?.user.email} placeholder="email" {...register("email", { required: true, pattern: Pattern })}
              />
              {errors.email?.type === "required" && <Text fontSize="md" color="red" m={0} p={0}>"emailは必須です"</Text>}
              {errors.email?.type === "pattern" && <Text fontSize="md" color="red" m={0} p={0}>"正しく入力して下さい"</Text>}
              <FormLabel htmlFor="password" fontSize={{ base: "md", md: "md" }}>パスワード（変更する場合）</FormLabel>
              <Input
                type="password" placeholder="password"  {...register("password")}
              />
              <FormLabel htmlFor="password_cofirmation" fontSize={{ base: "md", md: "md" }}>パスワード（確認用）</FormLabel>
              <Input type="password" placeholder="password_cofirmation" {...register("password_confirmation")} />
              {/* react-hook-formで同じならエラーとしたい
            passwordの入力値を保持し、比べて実装予定 */}
            </Stack>
            <SSubmit
              type="submit"
              value="変更する"
            />
          </form>
        </Box>
      </Flex>
    </>
  );
});
