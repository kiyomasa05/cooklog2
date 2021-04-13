import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';

//apis
import { home } from '../apis/home';

//component
import { Header } from '../component/Header/Header'
import { Main } from '../component/Main'
import { Footer } from '../component/Footer'




export const Home = () => {
  useEffect(() => {
    home()
      .then((data) =>
        console.log(data)
      )
  }, [])
  return (
    <Fragment>
      <Header />
      <Main />
      <Footer />
    </Fragment>
  )
}

