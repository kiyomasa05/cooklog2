import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { usePostRecipe } from '../hooks/usePostRecipe';


const Title = styled.h2`
  margin:100px auto;
  font-size:28px;
  font-weight:700;
  letter-spacing:3px;
`

const Container = styled.div`
  margin:20px auto;
  width:95%;
  max-width:95%;
  background:#FFE4E1
`

const Input = styled.input`
  width: 80%;
  max-width: 100%;
  font-size:20px;
  border: 1px solid grey;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-radius: 0.1rem;
  background: darken(#f9f9f9, 10%);
  color: darken(#f9f9f9, 50%);
`

const Textarea = styled.textarea`
  width: 80%;
  max-width: 100%;
  font-size:20px;
  border: 1px solid grey;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-radius: 0.1rem;
  background: darken(#f9f9f9, 10%);
  color: darken(#f9f9f9, 50%);
`


const Submit = styled.input`
  width: 70%;
  max-width: 100%;
  font-size:20px;
  font-weight:bold;
  border: none;
  margin: 3rem 0;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  background: #79EE69;
  color: darken(#f9f9f9, 50%);
  box-shadow:2px 2px grey;
  transition: .4s;
  &:hover {
    background: #3CC12A;
    color: #FFF;
}
`
const Block = styled.div`

`
const Label = styled.label`
  font-size:20px;
  font-weight:bold;
  margin:20px;
`

const Time_Label = styled(Label)`
  font-size:20px;
  margin:50px;
`
const Time_Input = styled(Input)`
  width: 15%;
  font-size:20px;

`

export default function Post(props) {
  const { postRecipe } = usePostRecipe
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState({ data: "", name: "" })



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


  return (
    <>

      <Title>post</Title>

      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 要バリデート作成＆反映 */}
          <Block>
            <Label>タイトル</Label>
            <Input type="text" placeholder="タイトル" {...register("title", { required: true, maxLength: 80 })} />
            {errors.title && <p>"正しく入力してください"</p>}
          </Block>
          <Block>
            <Time_Label>所要時間</Time_Label>
            <Time_Input type="number" placeholder="所要時間" {...register("time_required", { required: true, })} />
            {errors.time_required && <p>"正しく入力してください"</p>}
          </Block>
          <Block>
            <Label>材料</Label>
            <Textarea type="text" placeholder="材料" {...register("food", { required: true, minLength: 4 })} />
            {errors.food && <p>"正しく入力してください"</p>}

          </Block>
          <Block>
            <Label>手順</Label>
            <Textarea type="text" placeholder="手順" {...register("process", { required: true, })} />
            {errors.process && <p>"正しく入力してください"</p>}
          </Block>
          <Block>
            {/* usestateを利用してプレビューの表示可能 */}
            <Input type="file" placeholder="画像アップロード" name="image" accept="image/png,image/jpeg" onChange={handleImageSelect} />
            {/* {errors.image && <p>"正しく入力してください"</p>} */}
          </Block>
          <Submit type="submit" value="レシピ登録" />
        </form>
      </Container>
    </>
  );
}
