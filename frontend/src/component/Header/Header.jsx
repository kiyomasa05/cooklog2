import React from 'react';
import styled from 'styled-components';
import '../../../src/App.css'

//component
import { HeaderMenu } from './Header_Menu'


const Navbar = styled.nav`
    display: flex;
    justify-content: space-around;
    min-height:8vh;
    align-items:center;
    background-color: #FFFFCC	;
    // position:fixed;
    // top:0
    width:100%;
    z-index:99;
`

const Headerlogo = styled.div`
    font-weight:bold;
    margin-left:20px;
    font-size:36px;
    padding:10px;
    letter-spacing:3px;
`


export const Header = () => {
  return (
    <div>
      <Navbar>
        <Headerlogo>
          cooklog
        </Headerlogo>
        <HeaderMenu />
      </Navbar>
    </div>
  )
}


