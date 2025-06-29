import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut } from "firebase/auth";
import {
     addDoc, 
     collection,
     getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAOtU4hl7Xur9DU6vbwWtGiRLv72m1cjzk",
  authDomain: "netflix-clone-a032b.firebaseapp.com",
  projectId: "netflix-clone-a032b",
  storageBucket: "netflix-clone-a032b.firebasestorage.app",
  messagingSenderId: "629609330434",
  appId: "1:629609330434:web:26d3878daa70b21248b41b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const login = async (email, password)=>{
    try{
       await signInWithEmailAndPassword(auth, email, password);
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};
