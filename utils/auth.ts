import { auth } from "../config/firebase";

export const login = async (email: string, password: string) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

export const signup = async (email: string, password: string) => {
  return await auth.createUserWithEmailAndPassword(email, password);
};
