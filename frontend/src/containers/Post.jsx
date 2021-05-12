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
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        }
      },
      { withCredentials: true }
    ).then(response => {
      console.log(response)
    }).catch(error => {
      console.log("registration error", error)
    })
  }


  return (
    <>
      <Header />
      <Title>post</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 要バリデート作成＆反映 */}
        <Input type="text" placeholder="タイトル" {...register("title", { required: true, maxLength: 80 })} />
        {errors.title && <p>"正しく入力してください"</p>}

        <Input type="text" placeholder="所要時間" {...register("time_required", { required: true, })} />
        {errors.time_required && <p>"正しく入力してください"</p>}

        <Input type="text" placeholder="材料" {...register("food", { required: true, minLength: 4 })} />
        {errors.food && <p>"正しく入力してください"</p>}

        <Input type="text" placeholder="手順" {...register("process", { required: true, })} />
        {errors.process && <p>"正しく入力してください"</p>}
        <Submit type="submit" value="新規登録" />
      </form>
    </>
  );
}
