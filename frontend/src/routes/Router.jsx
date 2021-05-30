import { memo } from "react"
import { Route, Switch } from "react-router-dom"
import { Page404 } from "../containers/404"
import { Header } from "../organism/Header/Header"
import { homeRoutes } from "./HomeRouter"

/* ネストしているルート。少し変更が必要。 */
/* ログイン情報のプロップスを渡したい */

export const Router = memo(() => {
  <Switch>
    <Route
      path="/home"
      render={({ match: { url } }) => (
        <Switch>
          {homeRoutes.map((route) => (
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
    <Route path="*">
      <Page404 />
    </Route>
  </Switch>
});
