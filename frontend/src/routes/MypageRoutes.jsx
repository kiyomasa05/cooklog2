import { Mypage } from "../containers/Mypage"
import { Page404 } from "../containers/404";
import { UserEdit} from "../containers/UserEdit"

export const MypageRoutes = [
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
    path: "*",
    exact: false,
    children: <Page404 />
  },
];
