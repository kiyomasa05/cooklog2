import React from 'react';
import styled from 'styled-components';
import '../App.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { post } from '../urls/index'

//部品
import { Header } from '../component/Header/Header'

const Title = styled.h2`
  margin:100px auto;
  font-size:28px;
  font-weight:700;
  letter-spacing:3px;
`

const Input = styled.input`
  width: 70%;
  max-width: 100%;
  font-size:20px;
  border: none;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
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

export default function Post(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const onSubmit = (data) => fetchSignup(data);
  // 後でapiを叩く場所を固定したい
  const onSubmit = (data) => {
    axios.post(post,
      {
        recipe: {
          user_id:props.user.id,
          title: data.title,
          time_required: data.time_required,
          food: data.food,
          process: data.process,
        }
      }
    ).then(response => {
      console.log(response)
    }).catch(error => {
      console.log("registration error", error)
    })
  }
  // ここにログインユーザーのidをセットでpostする必要がある
  // まずはpostできるようにする　デザインは後　写真のアップロードも必要
  //バックエンドでルーティングとアクションも必要

  return (
    <>
      <Header />
      <Title>post</Title>
      <h2>ログイン状態: {props.loggedInStatus}</h2>
      <h2>ユーザー: {props.user.name}さん</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 要バリデート作成＆反映 */}
        <Input type="text" placeholder="タイトル" {...register("title", { required: true, maxLength: 80 })} />
        {errors.title && <p>"正しく入力してください"</p>}

        <Input type="time" placeholder="所要時間" {...register("time_required", { required: true, })} />
        {errors.time_required && <p>"正しく入力してください"</p>}

        <Input type="text" placeholder="材料" {...register("food", { required: true, minLength: 4 })} />
        {errors.food && <p>"正しく入力してください"</p>}

        <Input type="text" placeholder="手順" {...register("process", { required: true, })} />
        {errors.process && <p>"正しく入力してください"</p>}
        <Submit type="submit" value="レシピ登録" />
      </form>
    </>
  );
}
