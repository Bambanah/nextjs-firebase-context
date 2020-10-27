import { createContext, useState, useEffect, useContext } from "react";
import { firebase, auth } from "../../config/firebase";

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
    let isMounted = true;

    auth.onAuthStateChanged((user: any) => {
      if (isMounted) {
        setUser(user);
        setLoadingAuthState(false);
      }
    });

    return () => {
      isMounted = false;
    };
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
