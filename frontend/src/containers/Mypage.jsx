import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom";


//部品
import { Header } from '../organism/Header/Header'
import { Container } from '../component/wrapper/Login_Wrapper'
import { useLoginUser } from "../hooks/useLoginUser";

export default function Mypage(state) {
  // app.jsからprops(ログイン状態)を受け取るための引数

  const { loginUser } = useLoginUser();
  return (
    <div>
      <Header />
      <Container>
        マイページ
          <h2>ログイン状態:
          {loginUser}
        </h2>
        <h2>ユーザー:
          {loginUser}さん
        </h2>
        <Link to="/post">
          料理投稿
          </Link>
      </Container>
    </div>
  );
}
