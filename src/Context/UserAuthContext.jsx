import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
  verifyBeforeUpdateEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
    // async (result) => {
    //   try {
    //     const DocRef = await addDoc(collection(db, "users"), {
    //       UserName: User.UserName,
    //       Email: User.Email,
    //       Password: User.Password,
    //       Role: User.Role,
    //       IsDriver: User.IsDriver,
    //       ProfileImage: User.ProfileImage,
    //       UserID: `${result.user.uid}`,
    //     });
    //     console.log(DocRef);
    //     return result.user;
    //   } catch (e) {
    //     console.log(e.message);
    //   }
    // }
    //);
  }
  const editEmail=async ( email)=> {
    const credential = EmailAuthProvider.credential(email, password);
   await reauthenticateWithCredential(user, credential);
    return updateEmail(user, email);
  }
  const editPassword= async (password)=> {
    const credential = EmailAuthProvider.credential(email, password);
   await reauthenticateWithCredential(user, credential);
    return updatePassword(user, password);
  }
  function reauthenticate  (password) {
    console.log("Reauthenticated successfully");
    const credential = EmailAuthProvider.credential(user.email, password);
    return reauthenticateWithCredential(user,credential);
    // if (user) {
    //   try {
    //     await reauthenticateWithCredential(auth, credential);
    //     console.log("Reauthenticated successfully");
    //   } catch (error) {
    //     console.error("Reauthentication failed:", error);
    //   }
    // }
  };
  const verifyBeforeEmail = (email) => {
   
    return verifyBeforeUpdateEmail(user, email)
    // if (user) {
    //   try {
    //     await verifyBeforeUpdateEmail(user, email);
    //     //console.log("Reauthenticated successfully");
    //   } catch (error) {
    //     console.error("Reauthentication failed:", error);
    //   }
    // }
  };
  
  function logOut() {
    return signOut(auth);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        editEmail,
        editPassword,
        reauthenticate,
        verifyBeforeEmail
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
