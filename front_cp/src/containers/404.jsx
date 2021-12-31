import React, { memo } from 'react';

//部品
import { Header } from '../organism/Header/Header'
import { Container } from '../component/wrapper/Login_Wrapper'



export const Page404 = memo(() => {
  return (
    <>
      <Header />
      <Container>
        404ページ
      </Container>
    </>
  );
});
