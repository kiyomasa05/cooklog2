import React from 'react'
import Signup from './Signup'
import Login from './Login'
import axios from 'axios'

export default function Home1(props) {
  // propsをapp.jsから受け取るため引数をセット
  // loggedInStatus変数を受け取る

  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data)
    // 親コンポーネントapp.jsで定義するhandleLogin関数をここで再利用する
    props.history.push("/mypage")
      // apiを叩き成功したらメソッドが起動し、data(userのデータ)をmypageに渡してページ遷移する
  }
  const handleLogoutClick = () => {
    axios.delete("http://localhost:3000/logout", { withCredentials: true })
        .then(response => {
            props.handleLogout()
        }).catch(error => console.log("ログアウトエラー", error))
}

  return (
    <div>
      <h1>Home</h1>
      <h2>ログイン状態: {props.loggedInStatus}</h2>
      <button onClick={handleLogoutClick}>ログアウト</button>
      <Signup handleSuccessfulAuth={
        handleSuccessfulAuth}
      // signupコンポにhandleSuccessfulAuth（dataに格納されたuser情報）を渡している
      />
      <Login handleSuccessfulAuth={
        handleSuccessfulAuth}/>
      
    </div>
  )
}
