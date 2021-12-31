import { Home } from "../containers/static_page"
import { Login } from "../containers/Login"
import { Signup } from "../containers/Signup"
import { Index } from "../containers/Index"
import { Search } from "../containers/Search"
import { RecipeEdit } from "../containers/RecipeEdit"
import { Page404 } from "../containers/404";

export const HomeRoutes = [
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
    path: "/index",
    exact: false,
    children: <Index />
  },
  {
    path: "/search",
    exact: false,
    children: <Search />
  },
  {
    path: "/:id/edit",
    exact: false,
    children: <RecipeEdit />
  }
];
