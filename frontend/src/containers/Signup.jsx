import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
// import { fetchSignup } from '../apis/signup'
import axios from 'axios';
import { signup } from '../urls/index'

//部品
import { Header } from '../organism/Header/Header'
import { Container } from '../component/wrapper/Login_Wrapper'
import {Input} from '../component/SubmitParts/Input'
import {Submit} from '../component/SubmitParts/Submit'

const Title = styled.h2`
  margin:20px auto;
  font-size:28px;
  font-weight:700;
  letter-spacing:3px;
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
