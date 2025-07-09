import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../config/firebase";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const createUser = ({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const {
          displayName: name,
          email,
          photoURL: image,
          uid,
          accessToken: token,
        } = currentUser;
        setUser({ name, email, image, uid, token });
      } else {
        setUser(null);
      }
      setIsUserLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ createUser, signInUser, isUserLoading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
