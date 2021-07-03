import React,{useEffect} from "react";
import { Route, Switch } from "react-router-dom"

import { Header } from "../organism/Header/Header"
import { Page404 } from "../containers/404"
import { HomeRoutes } from "./HomeRoutes"
import { MypageRoutes } from "./MypageRoutes"
import { LoginUserProvider } from '../hooks/providers/LoginUserProvider'
import { useAuthCheck } from "../hooks/useAuthCheck"
import { useLoginUser } from "../hooks/useLoginUser"


export const Router = () => {
  const { CheckAuth } = useAuthCheck();
  const { loginUser } = useLoginUser();
  
  useEffect(() => {
    CheckAuth()
  })
  
  return (
    <Switch>
      <LoginUserProvider>
        <Route
          path="/"
          render={() => (
            <Switch>
              {HomeRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={route.path}
                >
                  <Header>{route.children}</Header>
                </Route>
              ))}
            </Switch>
          )}
        />
        {/* 次回/mypage/のルートを追記 */}
        <Route
          path="/mypage"
          render={({ match: { url } }) => (
            <Switch>
              {MypageRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`}
                >
                  <Header>{route.children}</Header>
                </Route>
              ))}
            </Switch>
          )}
        />
      </LoginUserProvider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
};
