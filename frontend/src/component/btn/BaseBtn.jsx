import styled from "styled-components"

export const BaseBtn = styled.button`
  text-align: center;
  font-size:1rem;
  font-weight:bold;
  color: white;
  width: 100%;
  min-width: 100px;
  min-height:50px;
  border:none;
  margin:0 10px;
  cursor:pointer;
  transition: .4s;
  letter-spacing:0.06em;
  &:hover{
    opacity:0.7;
    color:black;
  }
`
