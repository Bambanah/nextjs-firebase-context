import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  user: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser("Test");
  });

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};
