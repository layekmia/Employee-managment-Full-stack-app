import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../config/firebase";
import Spinner from "../components/Spinner";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const createUser = ({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = async () => {
    console.log("logout");
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const {
          displayName: name,
          email,
          photoURL: image,
          uid,
          accessToken: token,
        } = currentUser;

        try {
          const res = await axiosInstance.get(`/user/${uid}`);
          const role = res.data.role;
          setUser({ name, email, image, uid, token, role });
        } catch (error) {
          console.log(" Failed to fetch user role");
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  console.log(user)

  if (isAuthChecking) return <Spinner />;

  return (
    <AuthContext.Provider value={{ createUser, signInUser, user, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
