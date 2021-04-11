import React, { Fragment } from 'react';
import styled from 'styled-components';

export const Header = () => {
  return (
    <div style={styles.header}>
      <div class="logo">
        Cooklog
      </div>
      <div class="header_nav">
        <Switch>
          <nav>
            <ul>
              <li><a href="">ログイン</a></li>
              <li><a href="">新規登録</a></li>
            </ul>
          </nav>
        </Switch>
      </div>
    </div>
  )
}
//style
const styles = {
  header: {
    display: flex,
    background: "green",
  },
}

