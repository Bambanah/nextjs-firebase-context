import { createContext, useState, useEffect, useContext } from "react";
import { firebase, auth } from "../../config/firebase";
import nookies from "nookies";

type ContextProps = {
  user: firebase.User | null;
  authenticated: boolean;
  setUser: any;
  loadingAuthState: boolean;
};

export const AuthContext = createContext<Partial<ContextProps>>({
  user: null,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      setUser(user);
      setLoadingAuthState(false);
    });
  });

  return (
    <AuthContext.Provider
      value={{ user, authenticated: user !== null, setUser, loadingAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
