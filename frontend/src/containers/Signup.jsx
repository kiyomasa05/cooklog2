import React, { memo, useState } from "react";
import { Box, Divider, Flex, Heading, Input, Stack, Text, Image, FormLabel } from "@chakra-ui/react";
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useSignup } from "../hooks/useSignup";

const schema = yup.object().shape({
  name: yup.string().max(50,"名前は50文字以内で入力して下さい").required("名前は必須です"),
  email: yup.string().email('正しいメールアドレスを入力してください').required("emailは必須です"),
  password: yup.string().min(4,"passwordは4文字以上で入力して下さい").max(15,"passwordは15文字以内で入力して下さい").required("パスワードは必須です"),
  password_confirmation: yup.string().oneOf([yup.ref("password"), null], '再入力passwordが一致しません'),
});

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
export const Signup = memo(() => {
  const { signup } = useSignup();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [avatar, setAvatar] = useState({ data: "", name: "" })

  const onSubmit = (data) => {
    signup(data,avatar);
  }

  const handleImageSelect = (e) => {
    const reader = new FileReader()
    const files = (e.target).files
    if (files) {
      reader.onload = () => {
        setAvatar({
          data: reader.result,
          name: files[0] ? files[0].name : "unknownfile"
        })
      }
      reader.readAsDataURL(files[0])
    }
  }
  return (
    <>
      <Flex mt="80px" alignItems="center" justifyContent="center">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            新規登録
          </Heading>
          <Divider my={4} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6} py={4} px={5}>
              <Input type="text" placeholder="name" {...register("name")} />
              <Text fontSize="md" color="red"> {errors.name?.message} </Text>
              
              <Input
                type="text" placeholder="email" {...register("email")}/>
              <Text fontSize="md" color="red"> {errors.email?.message} </Text>
              <Input
                type="password" placeholder="password"  {...register("password")}/>
              <Text fontSize="md" color="red"> {errors.password?.message} </Text>
              <Input type="password" placeholder="password(確認用)" {...register("password_confirmation")}/>
              <Text fontSize="md" color="red"> {errors.password_confirmation?.message} </Text>
              
              <Stack>
                <FormLabel color="gray.500" htmlFor="avatar" mt="4" mb="-2" fontSize={{ base: "sm", md: "md" }}>アバター写真</FormLabel>
                <Image src={!avatar.data ? "gibbresh.png" : avatar.data} fallbackSrc="https://via.placeholder.com/250" boxSize={{ base: "250px", md: "300px" }} borderRadius="full" textAlign="center" border="2px" borderColor="gray.200"
                />
              </Stack>
              <Stack>
                <Input type="file" placeholder="画像アップロード" name="avatar"  id="avatar" accept="image/png,image/jpeg" onChange={handleImageSelect} />
              </Stack>
              <SSubmit
                type="submit"
                value="新規登録"
              />
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  );
});
