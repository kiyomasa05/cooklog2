import {React,memo} from 'react';

//component
import { HeaderMenu } from './Header_Menu'

export const Header = memo((props) => {
  const { children } = props;
  return (
    <>
      <HeaderMenu />
      {children}
    </>
  )
});


