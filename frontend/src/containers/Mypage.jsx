import React ,{ Component }from 'react';
import styled from 'styled-components';
import '../App.css';

//apis
// import { fetchMypage }from '../apis/mypage'

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
        </Container>
      </div>
    );
}
