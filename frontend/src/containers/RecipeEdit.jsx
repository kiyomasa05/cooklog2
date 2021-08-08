import React, { memo, useState, useEffect, useCallback } from 'react';
import {
  Flex, Box, Divider, Heading, Input, Textarea, Stack, Image, Button, Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
// import styled from 'styled-components';

// import { useForm } from 'react-hook-form';
import { usePostRecipe } from '../hooks/usePostRecipe';
import { useLoginUser } from "../hooks/useLoginUser";
import { useAuthCheck } from "../hooks/useAuthCheck";

import axios from "axios";
import { useHistory } from "react-router-dom";

import { useMessage } from "../hooks/useMessege";


export const RecipeEdit = () => {
  const { postRecipe } = usePostRecipe();
  const { loginUser } = useLoginUser();
  const history = useHistory();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  //api送信state
  const [title, setTitle] = useState()
  const [food, setFood] = useState()
  const [process, setProcess] = useState()
  const [time_required, setTime_required] = useState(0)
  const [image, setImage] = useState({ data: "", name: "" })


  const handleImageSelect = (e) => {
    const reader = new FileReader()
    //画像をbase64にエンコード
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

  const onSubmit =(event) => {
    setLoading(true)
    axios.post("http://localhost:3000/api/v1/recipes",
      {
        recipe: {
          user_id: loginUser.user.id,
          title: title,
          time_required: time_required,
          food: food,
          process: process,
          image:
          {
            data: image.data,
            name: image.name
          }
        }
      }
      , { withCredentials: true }
    ).then(response => {
      if (response.data.status === "created") {
        showMessage({ title: "投稿に成功しました", status: "success" });
        setLoading(false);
        history.push("/index");
      }
      else if (response.data.status === 422) {
        showMessage({ title: `${response.data.errors}`, status: "error" });
        setLoading(false);
      }
    }).catch(() => {
      showMessage({ title: "投稿できませんでした", status: "error" });
      setLoading(false);
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleChange = (time_required) => setTime_required(time_required)

  return (
    <>
      <Flex mt="80px" alignItems="center" justifyContent="center" >
        <Box bg="white" w={{ base: "sm", md: "2xl" }} p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            レシピ投稿
        </Heading>
          <Divider my={4} />
          <FormControl>
            <Stack>
              <FormControl>
                <Input variant="flushed" fontSize={{ base: "md", md: "xl" }} radii="1rem" placeholder="タイトル(20文字まで)" value={title} onChange={e => setTitle(e.target.value)} />
              </FormControl>
            </Stack>
            <Stack>
              <FormLabel color="gray.500" htmlFor="image" mt="4" mb="-2" fontSize={{ base: "sm", md: "md" }}>レシピ写真</FormLabel>
              <Image src={!image.data ? "gibbresh.png" : image.data} fallbackSrc="https://via.placeholder.com/250" boxSize={{ base: "250px", md: "400px" }} textAlign="center"
              />
            </Stack>
            <Stack>
              <Input type="file" placeholder="画像アップロード" name="image" accept="image/png,image/jpeg" onChange={handleImageSelect} />
            </Stack>

            <Stack mt={3}>
              <FormLabel color="gray.500" htmlFor="food" mb="-2" fontSize={{ base: "sm", md: "md" }}>材料</FormLabel>
              <Textarea id="food" placeholder="例）鶏肉、キャベツ、砂糖、塩..." value={food} fontSize={{ base: "sm", md: "md" }} onChange={e => setFood(e.target.value)} />
            </Stack>
            <Stack mt={3}>
              <FormLabel color="gray.500" htmlFor="process" mb="-2" fontSize={{ base: "sm", md: "md" }}>手順</FormLabel>
              <Textarea id="process" placeholder="例）1 キャベツを千切りしておく 2 鶏肉を茹でる..." value={process} fontSize={{ base: "sm", md: "md" }} onChange={e => setProcess(e.target.value)} />
            </Stack>
            <FormLabel color="gray.500" htmlFor="time_required" mt="2" mb="0">所要時間</FormLabel>
            <Flex>
              <NumberInput maxW="100px" mr="2rem" id="time_required" value={time_required} value={time_required} onChange={handleChange} >
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
            <Center>
              <Button
                mt={4}
                colorScheme="teal"
                width="75%"
                isLoading={loading}
                type="submit"
                onClick={onSubmit}
              >
                レシピ登録
          </Button>
            </Center>
          </FormControl>
        </Box>
      </Flex>
    </>
  );
}
