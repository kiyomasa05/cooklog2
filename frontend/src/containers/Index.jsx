import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../App.css';
import axios from 'axios';
import { post } from '../urls/index'

//api
import { fetchIndex } from '../apis/index'
//部品
import { Header } from '../component/Header/Header'

const Title = styled.h2`
  margin:100px auto;
  font-size:28px;
  font-weight:700;
  letter-spacing:3px;
`


export default function Index(props) {
  useEffect(() => {
    fetchIndex()
      .then((data) =>
        console.log(data)
      )
  }, [])
  // const onSubmit = (data) => fetchSignup(data);
  // 後でapiを叩く場所を固定したい


  return (
    <>
      <Header />
      <Title>index</Title>
      <h2>ログイン状態: {props.loggedInStatus}</h2>
      <h2>ユーザー: {props.user.name}さん</h2>


    </>
  );
}
