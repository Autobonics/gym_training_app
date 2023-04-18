import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "@mui/material/Button";

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
            <Button variant="contained" onClick={signIn}>
                Sign in With google
            </Button>
        </>
    );
};
