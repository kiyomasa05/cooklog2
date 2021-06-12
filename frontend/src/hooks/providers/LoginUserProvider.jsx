import React, {
  createContext,
  useContext,
  useState
} from "react";

export const LoginUserContext = createContext({});

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

// export const useLoginUser = () =>
//   useContext(LoginUserContext);
