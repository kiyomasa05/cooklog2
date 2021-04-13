import React from 'react';
import styled from 'styled-components';

//component
import {HeaderMenu} from './Header_Menu'


const AppHeader = styled.div`
    background-color: #FFFFCC	;
    min-height: 7vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: calc(10px + 2vmin);
    width:100%
    position:fixed;
    z-index:99;
`
const Headerlogo = styled.div`
    color: black;
    margin-left:20px;
    font-size:36px;
    padding:10px;
`


export const Header = () => {
  return (
    <div>
      <AppHeader>
        <Headerlogo>
          cooklog
        </Headerlogo>
        <HeaderMenu/>
      </AppHeader>
    </div>
  )
}


