import React, {
  createContext,
  useState
} from "react";

export const LoginUserContext = createContext({});

// 追加したい。userのログイン状態を保持する機能useeffect利用

// ログインユーザー情報を保持するcontext
export const LoginUserProvider = (props) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState(null);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};


