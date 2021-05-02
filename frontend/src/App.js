import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from 'axios'

// components
import { Home } from './containers/static_page.jsx';
import Home1 from './containers/Home.jsx';
import Login from './containers/Login.jsx';
import Signup from './containers/Signup.jsx';
import Mypage from './containers/Mypage.jsx';

export default function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [user, setUser] = useState({})

  const handleLogin = (data) => {
    setLoggedInStatus("ログイン中")
    setUser(data.user)
    // ログインステータスを変更する関数
  }

  const handleLogout = () => {
    setLoggedInStatus("未ログイン")
    setUser({})
    // 実行後、ステータスとユーザーを空にする
  }
  
//ログイン状態を確認する機能(@current_userがnilになってしまうエラー発生中)
  // useEffect(() => {
  //   checkLoginStatus()
  // })
//   useEffect()は、ページがリロードされるたびに毎回呼び出されるuseEffect()にcheckLoginStatus()関数を渡すことで、毎回この関数を呼び出す
// 例えば、/logged_inへGETリクエストを送信すると、Sessionsコントローラのlogged_in?アクションへデータが送信される。ここでは@current_userの存在をチェックし、trueなら{logged_in: true, user: @current_user}というJSONオブジェクト、falseなら{logged_in: false}を返す

  // 別コンポーネントに後でする
  const checkLoginStatus = () => {
    axios.get("http://localhost:3000/api/v1/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && loggedInStatus === "未ログイン") {
          setLoggedInStatus("ログイン中")
          setUser(response.data.user)
          // 返り値に含まれるdataのlogged_inがtrueなのに、React側のloggedInStatusが"未ログイン"となっている場合、ログイン状態を"ログイン中"に書き換えし、userオブジェクトも返り値から受け取ったユーザーオブジェクトに書き換える
        } else if (!response.data.logged_in && loggedInStatus === "ログイン中") {
          setLoggedInStatus("未ログイン")
          setUser({})
          // logged_inフィールドがfalseなのに、loggedInStatusが"ログイン中"になってしまっている場合に、loggedInStatusオブジェクトを空にし、userオブジェクトも空に
        }
    }).catch(error => {
      console.log("ログインエラー", error)
    })
  }

  return (
    <Router>
      <Switch>
        // ホーム
        <Route
          exact
          path="/">
          <Home />
        </Route>
        <Route
          exact
          path="/home"
          render={props => (
            <Home1 {...props}
              handleLogin={handleLogin}
              //ログイン情報、user情報を渡す
              handleLogout={handleLogout}
              loggedInStatus={loggedInStatus} />
            // ログインステータスをhomeコンポに渡す
            // Home.js内のloggedInStatusという変数に、App.jsのloggedInStatus変数を代入
          )}>
        </Route>
        // ログインページ
        <Route
          exact
          path="/login"
        >
          <Login/>
        </Route>
        // 新規登録ページ
        <Route
          exact
          path="/signup">
          <Signup />
        </Route>
        <Route
          exact
          path="/mypage"
          render={props => (
            <Mypage {...props}
              loggedInStatus={loggedInStatus}
              user={user}
            // ログインステータスをmypageコンポに渡す
            // loggedInStatusという変数に、App.jsのloggedInStatus変数を代入
            />
          )}
        >
        </Route>
      </Switch>
    </Router>
  );
}

// export default App;
