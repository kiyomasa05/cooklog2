import React from 'react';
import styled from 'styled-components';
import '../App.css';
import MainImg from '../images/TOP.jpg';
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  width:100%;
  height:800px;
  background:rgb(200,140,100)  url(${MainImg});
  background-blend-mode: screen;
  background-size: cover;
`

const Container = styled.div`
  width:700px;
  max-width:85%;
  margin:0 auto;
  text-align:center;
`
const Inside = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
`

const Regist = styled.ul`
  display:flex;
  width:50vw;
  justify-content: space-around;
  list-style:none;
  margin:0 auto;
`

const RegistBtn = styled.li`
  margin-top:60vh;
  display: inline-block;
  font-weight: bold;
  padding: 16px 40px;
  font-size:24px;
  text-decoration: none;
  border-radius:20px;
  border: solid 3px #668ad8;
  color: black;
  background: transparent;
  transition: .4s;
  &:hover {
    background: #668ad8;
    color: #FFF;
}
`


export const Main = () => {
  return (
    <div>
      <Wrapper>
        <Container>
          <Inside>
            <h1>お気に入りのレシピを投稿しよう</h1>
          </Inside>
          <Regist>
            <RegistBtn>
              <Link to="/signup">
                新規登録
              </Link>
            </RegistBtn>
            <RegistBtn>
              <Link to="/login">
                ログイン
              </Link>
            </RegistBtn>
          </Regist>
        </Container>
      </Wrapper>
    </div>
  );
}
