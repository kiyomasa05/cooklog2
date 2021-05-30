import React from 'react';
import styled from 'styled-components';
import '../App.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { login } from '../urls/index'

//部品
import { Header } from '../organism/Header/Header'
import { Container } from '../component/wrapper/Login_Wrapper'
// import { fetchLogin } from '../apis/login';

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

export default function Login(props) {

  const { register, handleSubmit, formState: { errors } } = useForm();
  // const onSubmit = data => fetchLogin(data);
  //後でapiを叩く場所を統一したい
  const onSubmit = (data) => {
    axios.post(login,
      {
        user: {
          email: data.email,
          password: data.password,
        }
      },
      { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in) {
        props.handleSuccessfulAuth(response.data);
        props.history.push("/mypage");
        // apiを叩き成功したらメソッドが起動し、data(userのデータ)をmypageに渡してページ遷移する
      }
    }).catch(error => {
      console.log("registration error", error)
    })
  }
  return (
    <>
      <Header />
      <Container>
        <Title>ログイン</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" placeholder="email" {...register("email", { required: true,  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i  })} />
          {errors.email && <p>"正しく入力してください"</p>}
          <Input type="password" placeholder="password" {...register("password", { required: true, minLength:4 })} />
          {errors.password && <p>"正しく入力してください"</p>}
          <Submit type="submit" value="ログイン" />
        </form>
      </Container>
    </>
  );
}
