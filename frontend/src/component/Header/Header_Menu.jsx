import React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../../../src/App.css'



const Navitems = styled.ul`
  display:flex;
  width:400px;
  max-width:40%;
  justify-content: space-around;
  list-style:none;
`

const Navitem = styled.li`
  display: inline-block;
  font-weight: bold;
  padding: 10px 20px;
  font-size:16px;
  text-decoration: none;
  border-left: solid 4px #668ad8;
  border-right: solid 4px #668ad8;
  color: #668ad8;
  background: #e1f3ff;
  transition: .4s;
  &:hover {
    background: #668ad8;
    color: #FFF;
}
`


export const HeaderMenu = () => {
  return (
    <>
        <Navitems>
          <Navitem>
            <Link to="/signup">
              新規登録
            </Link>
          </Navitem>
          <Navitem>
            <Link to="/login">
              ログイン
            </Link>
          </Navitem>
        </Navitems>
    </>
  )
}

