import React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PrimaryBtn } from '../btn/PrimaryBtn'



const Navitems = styled.div`
  display:flex;
  width:400px;
  max-width:40%;
  justify-content: space-around;
  list-style:none;
`



export const HeaderMenu = () => {
  return (
    <>
      <Navitems>
        <Link to="/signup">
          <PrimaryBtn>
            新規登録
        </PrimaryBtn>
        </Link>
        <Link to="/login">
          <PrimaryBtn>
            ログイン
        </PrimaryBtn>
        </Link>
        <Link to="/index">
          <PrimaryBtn>
            レシピ一覧
          </PrimaryBtn>
        </Link>
      </Navitems>
    </>
  )
}

