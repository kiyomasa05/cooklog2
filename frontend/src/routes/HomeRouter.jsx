import Home from "../containers/static_page";
import Index from "../containers/Index";
import Login from "../containers/Login";
import Mypage from "../containers/Mypage";
import Signup from "../containers/Signup";
import Post from "../containers/Post";
import { Page404 } from "../containers/404";


export const homeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />
  },
  {
    path: "/login",
    exact: false,
    children: <Login />
  },
  {
    path: "/signup",
    exact: false,
    children: <Signup />
  },
  {
    path: "/mypage",
    exact: false,
    children: <Mypage handleLogin={handleLogin}/>
  },
  {
    path: "/index",
    exact: false,
    children: <Index />
  },
  {
    path: "/post",
    exact: false,
    children: <Post />
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  },
]
