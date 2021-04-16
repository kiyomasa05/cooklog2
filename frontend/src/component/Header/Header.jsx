import React from 'react';
import styled from 'styled-components';
import '../../../src/App.css'
import { Link } from 'react-router-dom';

//component
import { HeaderMenu } from './Header_Menu'


const Navbar = styled.nav`
    display: flex;
    justify-content: space-around;
    min-height:8vh;
    max-height:8vh;
    align-items:center;
    background-color: #BAD3FF	;
    position:fixed;
    width:100%;
    box-shadow:2px 2px 2px 1px rgba(0,0,255,.2);
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
          <Link to="/">
            Cooklog
          </Link>
        </Headerlogo>
        <HeaderMenu />
      </Navbar>
    </div>
  )
}


