import React from 'react';
import styled from 'styled-components';

export const Footer = () => {
  return (
    <SFooter>&copy; COOKLOG</SFooter>
  );
}

const SFooter = styled.footer`
  background-color:#BAD3FF;
    min-height:3vh;
    max-height:3vh;
    text-align:center;
    align-items:center;
    position:fixed;
    bottom:0;
    width:100%;
    z-index:2;
`
