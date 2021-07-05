import React, {
  createContext,
  useState
} from "react";

const initial_user = [
  {
    name: "bbbbb",
    id: "1",
    email:""
  }
]

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


