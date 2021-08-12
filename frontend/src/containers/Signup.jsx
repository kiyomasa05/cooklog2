import React, { memo, useState } from "react";
import { Box, Divider, Flex, Heading, Input, Stack, Text, Image, FormLabel } from "@chakra-ui/react";
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

//部品
import { Header } from '../organism/Header/Header'

import { useSignup } from "../hooks/useSignup";

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
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [avatar, setAvatar] = useState({ data: "", name: "" })

  const onSubmit = (data) => {
    signup(data,avatar);
  }

  const handleImageSelect = (e) => {
    const reader = new FileReader()
    //画像をbase64にエンコード
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

  const Pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return (
    <>
      <Header />
      <Flex mt="80px" alignItems="center" justifyContent="center">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            新規登録
          </Heading>
          <Divider my={4} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6} py={4} px={10}>
              <Input type="text" placeholder="name" {...register("name", { required: true, maxLength: 50 })} />
              {errors.name?.type === "required" && <Text fontSize="md" color="red" m={0} p={0}>"名前は必須です"</Text>}
              {errors.name?.type === "maxLength" && <Text fontSize="md" color="red" m={0} p={0}>"名前は50文字以内で入力して下さい"</Text>}
              <Input
                type="text" placeholder="email" {...register("email", { required: true, pattern: Pattern })}
              />
              {errors.email?.type === "required" && <Text fontSize="md" color="red" m={0} p={0}>"emailは必須です"</Text>}
              {errors.email?.type === "pattern" && <Text fontSize="md" color="red" m={0} p={0}>"正しく入力して下さい"</Text>}

              <Input
                type="password" placeholder="password"  {...register("password", { required: true, minLength: 4 })}
              />
              {errors.password?.type === "required" && <Text fontSize="md" color="red" m={0} p={0}>"パスワードは必須です"</Text>}
              {errors.password?.type === "minLength" && <Text fontSize="md" color="red" m={0} p={0}>"パスワードは4文字以上で入力して下さい"</Text>}

              <Input type="password" placeholder="password_cofirmation" {...register("password_confirmation", { required: true, })} />
              {/* react-hook-formで同じならエラーとしたい
            passwordの入力値を保持し、比べて実装予定 */}
              {errors.password?.type === "required" && <Text fontSize="md" color="red" m={0} p={0}>"パスワードは必須です"</Text>}
              {errors.password?.type === "minLength" && <Text fontSize="md" color="red" m={0} p={0}>"パスワードは4文字以上で入力して下さい"</Text>}

              <Stack>
                <FormLabel color="gray.500" htmlFor="avatar" mt="4" mb="-2" fontSize={{ base: "sm", md: "md" }}>アバター写真</FormLabel>
                <Image src={!avatar.data ? "gibbresh.png" : avatar.data} fallbackSrc="https://via.placeholder.com/250" boxSize={{ base: "250px", md: "400px" }} borderRadius="full" textAlign="center" border="2px" borderColor="gray.200"
                />
              </Stack>
              <Stack>
                <Input type="file" placeholder="画像アップロード" name="avatar" accept="image/png,image/jpeg" onChange={handleImageSelect} />
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
