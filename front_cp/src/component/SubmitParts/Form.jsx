import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const Title = styled.h2`
  margin:20px auto;
  font-size:28px;
  font-weight:700;
  letter-spacing:3px;
`

export const Signup = (props) => {
  const { children } = props;
  return (
    <Title>{children}</Title>

  );
}
