import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const signIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };
    if (user) {
        navigate("/home");
    }
    return (
        <>
            <h1>Login to Gym Trainer</h1>
            <button onClick={signIn}>Sign in With google</button>
        </>
    );
};
