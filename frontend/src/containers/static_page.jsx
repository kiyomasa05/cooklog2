import React, { Fragment } from 'react';



//component
import { Header } from '../organism/Header/Header'
import { Main } from '../component/Main'
import { Footer } from '../component/Footer'




export const Home = () => {
  return (
    <Fragment>
      <Header />
      <Main />
      <Footer />
    </Fragment>
  )
}

