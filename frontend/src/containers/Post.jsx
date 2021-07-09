import React, { memo, useState, useEffect } from 'react';
import {
  Flex, Box, Divider, Heading, Input, Textarea, Stack, Text, Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import { usePostRecipe } from '../hooks/usePostRecipe';
import { useLoginUser } from "../hooks/useLoginUser";
import { useAuthCheck } from "../hooks/useAuthCheck";


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

export const Post = () => {
  const { postRecipe } = usePostRecipe();
  const { loginUser } = useLoginUser();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState({ data: "", name: "" })
  const { CheckAuth } = useAuthCheck();
  useEffect(() => {
    CheckAuth()
  }, [])

  const handleImageSelect = (e) => {
    const reader = new FileReader()
    const files = (e.target).files
    if (files) {
      reader.onload = () => {
        setImage({
          data: reader.result,
          name: files[0] ? files[0].name : "unknownfile"
        })
      }
      reader.readAsDataURL(files[0])
    }

  }

  const onSubmit = (data) => {
    postRecipe(data);
  }
  // ここにログインユーザーのidをセットでpostする必要がある
  // まずはpostできるようにする　デザインは後　写真のアップロードも必要
  //バックエンドでルーティングとアクションも必要

  const [time_required, setTime_required] = useState(0)
  const handleChange = (time_required) => setTime_required(time_required)

  return (
    <>
      <Flex mt="80px" alignItems="center" justifyContent="center" >
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            レシピ投稿
        </Heading>
          <Divider my={4} />
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 要バリデート作成＆反映 */}
            <Stack>
              <Input variant="flushed" radii="1rem" placeholder="タイトル(20文字まで)" {...register("title", { required: true, maxLength: 20 })} />
              {errors.title && <p>"正しく入力してください"</p>}
            </Stack>
            <Stack>
              <Image src="gibbresh.png" fallbackSrc="https://via.placeholder.com/150" />
            </Stack>
            <Stack>
              {/* usestateを利用してプレビューの表示可能 */}
              <Input type="file" placeholder="画像アップロード" name="image" accept="image/png,image/jpeg" onChange={handleImageSelect} />
              {/* {errors.image && <p>"正しく入力してください"</p>} */}
            </Stack>

            <Stack mt={3}>
              <Text color="gray.500">材料</Text>
              <Textarea placeholder="材料" {...register("food", { required: true, minLength: 4 })} />
              {errors.food && <p>"正しく入力してください"</p>}
            </Stack>
            <Stack mt={3}>
              <Text color="gray.500">手順</Text>
              <Textarea placeholder="手順" {...register("process", { required: true, })} />
              {errors.process && <p>"正しく入力してください"</p>}
            </Stack>
            <Text color="gray.500">所要時間</Text>
            {/* {...register("time_required", { required: true, })} */}
            <Flex>
              <NumberInput maxW="100px" mr="2rem" value={time_required} onChange={handleChange} >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider flex="1" focusThumbOnChange={false} value={time_required} onChange={handleChange} >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize="sm" boxSize="32px" children={time_required} />
              </Slider>
            </Flex>
            <SSubmit type="submit" value="レシピ登録" />
          </form>
        </Box>
      </Flex>
    </>
  );
}
