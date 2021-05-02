import React from 'react';
import styled from 'styled-components';
import '../App.css';
import { useForm } from 'react-hook-form';
// import { fetchSignup } from '../apis/signup'
import axios from 'axios';
import { signup } from '../urls/index'

//部品
import { Header } from '../component/Header/Header'
import { Container } from '../component/wrapper/Login_Wrapper'

const Title = styled.h2`
  margin:20px auto;
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

export default function Signup(props) {

  const { register, handleSubmit, formState: { errors } } = useForm();
  // const onSubmit = (data) => fetchSignup(data);
  // 後でapiを叩く場所を固定したい
  const onSubmit = (data) => {
    axios.post(signup,
      {
        user: {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        }
      },
      { withCredentials: true }
    ).then(response => {
      if (response.data.status === 'created') {
        props.handleSuccessfulAuth(response.data);
        props.history.push("/mypage");
        //propsからhandleSuccessfulAuthentication()イベントハンドラを取得、そこにresponseで受け取ったデータのdataフィールドを渡す

        // イベントハンドラはpropsから取り出しているので、イベントハンドラは別のコンポーネントで定義
      }
    }).catch(error => {
      console.log("registration error", error)
    })
  }


  return (
    <>
      <Header />
      <Container>
        <Title>新規登録</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 要バリデート作成＆反映 */}
          <Input type="text" placeholder="name" {...register("name", { required: true, maxLength: 80 })} />
          {errors.name && <p>"正しく入力してください"</p>}

          <Input type="text" placeholder="email" {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} />
          {errors.email && <p>"正しく入力してください"</p>}

          <Input type="password" placeholder="password" {...register("password", { required: true, minLength: 4 })} />
          {errors.password && <p>"正しく入力してください"</p>}

          <Input type="password" placeholder="password_cofirmation" {...register("password_confirmation", { required: true, })} />
          {errors.password && <p>"正しく入力してください"</p>}
          <Submit type="submit" value="新規登録" />
        </form>
      </Container>
    </>
  );
}
