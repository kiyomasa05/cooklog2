import React, {
  createContext,
  useState
} from "react";

const initial_user =
{
  user: {
    name: "notExist",
    id: "1",
    email: "sample@sample.com"
  },
  logged_in: false
}

export const LoginUserContext = createContext({});

// ログインユーザー情報を保持するcontext
export const LoginUserProvider = (props) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState(initial_user);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
//loginUserの値が変わった場合、loginUserを使用しているコンポーネントは全て再レンダリングされるので注意


