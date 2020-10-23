import { auth } from "../config/firebase";

export const login = async (email: string, password: string) => {
  auth.signInWithEmailAndPassword(email, password).then((res) => {
    return res;
  });
};

export const signup = async (email: string, password: string) => {
  auth.createUserWithEmailAndPassword(email, password).then((res) => {
    return res;
  });
};
