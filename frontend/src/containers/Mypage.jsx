import React, { Component } from 'react';
import styled from 'styled-components';
import '../App.css';
import { Link } from "react-router-dom";

//apis
// import { fetchMypage }from '../apis/mypage'
import Skeleton from '@material-ui/lab/Skeleton';



//部品
import { Header } from '../component/Header/Header'
import { Container } from '../component/wrapper/Login_Wrapper'

export default function Mypage(props) {
  // app.jsからprops(ログイン状態)を受け取るための引数

  return (
    <div>
      <Header />
      <Container>
        マイページ
          <h2>ログイン状態: {props.loggedInStatus}</h2>
        <h2>ユーザー: {props.user.name}さん</h2>
        <Link to="/post">
          料理投稿
          </Link>
      </Container>
    </div>
  );
}
