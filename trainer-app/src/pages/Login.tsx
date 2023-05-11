import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import TrainerText from "/images/login/trainer.svg";
import AiText from "/images/login/ai.svg";
import SigninText from "/images/login/signin.svg";
import "./styles.css";
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
        <div>
            <img
                src={AiText}
                style={{
                    position: "absolute",
                    top: "35%",
                    left: "25%",
                }}
            />
            <img
                src={TrainerText}
                style={{
                    position: "absolute",
                    top: "35%",
                    left: "60%",
                }}
            />
            <button
                onClick={signIn}
                style={{
                    position: "absolute",
                    top: "90%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "none",
                    border: "none",
                }}
            >
                <img src={SigninText} />
            </button>
        </div>
    );
};
