import Mypage from "../containers/Mypage"
import Post from "../containers/Post"
import { Page404 } from "../containers/404";

export const MypageRoutes = [
  {
    path: "/",
    exact: true,
    children: <Mypage />
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
];
