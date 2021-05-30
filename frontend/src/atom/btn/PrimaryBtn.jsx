import styled from "styled-components"
import {BaseBtn} from './BaseBtn'

export const PrimaryBtn = (props) => {
  const { children } = props;
  return <SBtn>{children}</SBtn>;
};

const SBtn = styled(BaseBtn)`
  width:100%;
  background:#ffa;
  color:black;
`
