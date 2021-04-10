import React, { Fragment } from 'react';
import styled from 'styled-components';

// apis
import { fetchlogin } from '../apis/login';


const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.div`
  height: 90px;
  background-color:'yellow'
`

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.div`
  background-color:green;
  height:500px;
`;

export const Home = () => {
  return (
    <Fragment>
      <HeaderWrapper>
        <MainLogoImage />
        cooklog
      </HeaderWrapper>
      <MainCoverImageWrapper>
        login
        <MainCover />
        login
      </MainCoverImageWrapper>
    </Fragment>
  )
}

