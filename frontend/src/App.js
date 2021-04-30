import React, {useState,useEffect}from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from 'axios'

// components
import { Home } from './containers/static_page.jsx';
import  Login   from './containers/Login.jsx';
import  Signup  from './containers/Signup.jsx';
import { Mypage }  from './containers/Mypage.jsx';

export default function App(){
  
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [user, setUser] = useState({})


    // this.state = {
    //   loggedInStatus: "Not_Logged_In",
    //   user: {}
    // };

    // this.handleLogin = this.handleLogin.bind(this);
  
  // handleLogin(data) {
  //   this.useState({
  //     logged_in: false,
  //     user: data.user
  //   });
  // }
  const handleLogin = (data) => {
    setLoggedInStatus("ログインなう")
    setUser(data.user)
  }
  useEffect(() => {
    checkLoginStatus()
  })

  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/login", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && loggedInStatus === "未ログイン") {
          setLoggedInStatus("ログインなう")
          setUser(response.data.user)
        } else if (!response.data.logged_in && loggedInStatus === "ログインなう") {
          setLoggedInStatus("未ログイン")
          setUser({})
        }
    }).catch(error => {
      console.log("ログインエラー", error)
    })
  }

  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data)
    props.history.push("/mypage")
  }
  // これはここに置いた方がいいのか
    return (
      <Router>
        <Switch>
          // ホーム
        <Route
            exact
            path="/">
            <Home />
          </Route>
        // ログインページ
        <Route
            exact
            path="/login"
          >
            <Login
              { ...props } loggedInStatus={loggedInStatus} 
              handleSuccessfulAuth={this.handleSuccessfulAuth} />
          </Route>
        // 新規登録ページ
        <Route
            exact
            path="/signup">
            <Signup handleSuccessfulAuth={this.handleSuccessfulAuth}/>
          </Route>
          <Route
            exact
            path="/mypage"
            render={props => (
              <Mypage {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
            )}
          >
          </Route>
        </Switch>
      </Router>
    );
  }

// export default App;
