import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import {
  Box, Divider, Flex, Heading, Input, Stack, Text, FormLabel, Button, Center
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useUserEdit } from "../hooks/useUserEdit";
import { useLoginUser } from "../hooks/useLoginUser";
import { useAuthCheck } from "../hooks/useAuthCheck";
//部品

export const UserEdit = memo((props) => {
  const { userEdit } = useUserEdit();
  const { loginUser } = useLoginUser();
  const [loading] = useState(false);
  const { id } = useParams();

  const { CheckAuth } = useAuthCheck();
  useEffect(() => {
    CheckAuth()
  }, [])
  console.log(loginUser)

  const { register, handleSubmit, setValue, formState: { errors,isDirty,isSubmitting} } = useForm({});

  const onSubmit = (data) => {
    userEdit(data, id);
  }
  //userの初期値をRHFのsetValueでセット
  useEffect(() => {
    setValue('name', loginUser.user.name)
    setValue('email', loginUser.user.email)
  });
  const Pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return (
    <>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            ユーザー編集
          </Heading>
          <Divider my={4} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} py={4} px={5}>
              {/* なまえ */}
              <FormLabel htmlFor="name" fontSize={{ base: "md", md: "md" }}>名前</FormLabel>
              <Input type="text" placeholder="name"  {...register("name", { required: true, maxLength: 50 })} />
              {errors.name?.type === "required" && <Text fontSize="sm" color="red" m={0} p={0}>"名前は必須です"</Text>}
              {errors.name?.type === "maxLength" && <Text fontSize="sm" color="red" m={0} p={0}>"名前は50文字以内で入力して下さい"</Text>}
              {/* メール */}
              <FormLabel htmlFor="email" fontSize={{ base: "md", md: "md" }}>メール</FormLabel>
              <Input
                type="text" placeholder="email" {...register("email", { required: true, pattern: Pattern })}
              />
              {errors.email?.type === "required" && <Text fontSize="md" color="red" m={0} p={0}>"emailは必須です"</Text>}
              {errors.email?.type === "pattern" && <Text fontSize="sm" color="red" m={0} p={0}>"正しく入力して下さい"</Text>}
              {/* パスワード */}
              <FormLabel htmlFor="password" fontSize={{ base: "md", md: "md" }}>パスワード（変更も可能）</FormLabel>
              <Input
                type="password" placeholder="password"  {...register("password", { required: true, minLength: 4 })}
              />
              {errors.password?.type === "required" && <Text fontSize="sm" color="red" m={0} p={0}>"パスワードは必須です"</Text>}
              {errors.password?.type === "minLength" && <Text fontSize="sm" color="red" m={0} p={0}>"パスワードは4文字以上で入力して下さい"</Text>}
              <FormLabel htmlFor="password_cofirmation" fontSize={{ base: "md", md: "md" }}>パスワード（確認用）</FormLabel>
              <Input type="password" placeholder="password_cofirmation" {...register("password_confirmation", { required: true, minLength: 4 })} />
              {/* react-hook-formで同じならエラーとしたい
            passwordの入力値を保持し、比べて実装予定 */}
              {errors.password?.type === "required" && <Text fontSize="sm" color="red" m={0} p={0}>"パスワードは必須です"</Text>}
              {errors.password?.type === "minLength" && <Text fontSize="sm" color="red" m={0} p={0}>"パスワードは4文字以上で入力して下さい"</Text>}
            </Stack>
            <Center>
              <Button
                mt={4}
                colorScheme="teal"
                width="75%"
                isLoading={loading}
                type="submit"
              >変更する</Button>
            </Center>
          </form>
        </Box>
      </Flex>
    </>
  );
});
