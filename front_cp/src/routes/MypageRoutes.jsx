import { Mypage } from "../containers/Mypage"
import { Page404 } from "../containers/404";
import { UserEdit } from "../containers/UserEdit"
import { Post } from "../containers/Post"

export const MypageRoutes = [
  // users/
  {
    path: "/:id",
    exact: true,
    children: <Mypage />
  },
  {
    path: "/:id/edit",
    exact: false,
    children: <UserEdit />
  },
  {
    path: "/:id/post",
    exact: false,
    children: <Post />
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  },
];
