import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";

const LoginUserContext = createContext(
  {}
);

// ログインユーザー情報を保持するcontext
export const LoginUserProvider = (props) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};

export const useLoginUser = () =>
  useContext(LoginUserContext);
