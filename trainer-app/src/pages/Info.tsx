import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { SubmitInfo } from "../Types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Diet } from "../components/Diet";

export const Info = () => {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState<SubmitInfo>();
    const [dietState, setDiet] = useState<boolean>(false);
    const getUserData = async (): Promise<SubmitInfo> => {
        const ref = collection(db, "bmiInfo");
        const q = query<SubmitInfo>(ref, where("id", "==", user?.uid));
        const snapshot = await getDocs(q);
        // optimizations :
        //  Directly use useNavigate('/trainer')
        // setPageState as boolean 0->Loading & 1->BmiForm
        return snapshot.docs[0].data() as SubmitInfo;
    };

    useEffect(() => {
        (async () => {
            const data = await getUserData();
            setUserData(data);
        })();
    }, [user]);

    const navigate = useNavigate();
    const logOut = () => {
        signOut(auth);
    };
    if (!user) {
        navigate("/");
    }
    const getInfo = () => {
        return userData ? (
            <>
                <div>
                    <ul>
                        <li>Name : {userData.uname}</li>
                        <li>Weight : {userData.bmiInfo?.weight}</li>
                        <li>Height : {userData.bmiInfo?.height}</li>
                        <li>BMI : {userData.bmiInfo?.bmi}</li>
                    </ul>
                </div>
                {dietState ? <Diet bmi={userData.bmiInfo?.bmi} /> : <></>}
                <button
                    onClick={() => {
                        setDiet(!dietState);
                    }}
                >
                    {!dietState ? "Show Diet Plan" : "Hide Diet Plan"}
                </button>
                <button
                    onClick={() => {
                        navigate("/trainer");
                    }}
                >
                    Start Training
                </button>
            </>
        ) : (
            <h1>Getting User info </h1>
        );
    };

    return (
        <>
            {getInfo()}
            <button onClick={logOut}>Sign out</button>
        </>
    );
};
