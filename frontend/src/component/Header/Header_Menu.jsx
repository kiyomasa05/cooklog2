import React from "react";
import styled from 'styled-components';

const Headermenu = styled.div`
    display: flex;
    justify-content: space-between;
    width:30%;
`

export const Btn1 = styled.a`
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding: 10px 20px;
  font-size:16px;
  text-decoration: none;
  border-left: solid 4px #668ad8;
  border-right: solid 4px #668ad8;
  color: #668ad8;
  background: #e1f3ff;
  transition: .4s;
  &:hover {
    background: #668ad8;
    color: #FFF;
}
`


export const HeaderMenu = () => {
  return (
    <div>
      <Headermenu>
        <Btn1
          href="#"
        >
          <span>新規登録</span>
        </Btn1>

        <Btn1
          href="#"
        >
          <span>ログイン</span>
        </Btn1>
      </Headermenu>
    </div>
  )
}

