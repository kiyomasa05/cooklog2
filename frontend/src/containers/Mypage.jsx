import React ,{ Component }from 'react';
import styled from 'styled-components';
import '../App.css';

//apis
import { fetchMypage }from '../apis/mypage'

//部品
import { Header } from '../component/Header/Header'
import { Container } from '../component/wrapper/Login_Wrapper'


export const Mypage=()=>{
  
    return (
      <div>
        <Header />
        <Container>
          マイページ
          <h1>{this.props.loggedInStatus}</h1>
          
        </Container>
      </div>
    );
}
