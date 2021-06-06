import React from 'react';
import styled from 'styled-components';
import MainImg from '../images/TOP.jpg';
import { Link } from 'react-router-dom'
import { BaseBtn } from '../atom/btn/BaseBtn';

const Wrapper = styled.div`
  width:100%;
  height:97vh;
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

const Regist = styled.div`
  padding-top:70vh;
  width:50vw;
  margin:0 auto;
`

const RegistBtn = styled(BaseBtn)`
  width:60%;
  height:65px;
  font-size:1.5rem;
  margin-top:24px;
  border-radius:20px;
  border: solid 3px #668ad8;
  color: black;
  background: transparent;
  box-shadow: 0 5px 0 #668ad8;
  &:hover {
    background: #668ad8;
    color: #FFF;
    transform: translate(0, 3px);
    box-shadow: 0 2px 0 #668ad8;
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
            <Link to="/signup">
            
              <RegistBtn>
                新規登録
              </RegistBtn>
            </Link>
            <Link to="/login">
              <RegistBtn>
                ログイン
              </RegistBtn>
            </Link>
          </Regist>
        </Container>
      </Wrapper>
    </div>
  );
}
