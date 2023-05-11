import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { SubmitInfo } from "../Types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { WrkOut } from "../components/WrkOut";
import { Button } from "@mui/material";

export const Trainer = (): JSX.Element => {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState<SubmitInfo>();
    const getUserData = async (): Promise<SubmitInfo> => {
        const ref = collection(db, "bmiInfo");
        const q = query<SubmitInfo>(ref, where("id", "==", user?.uid));
        const snapshot = await getDocs(q);
        return snapshot.docs[0].data() as SubmitInfo;
    };

    useEffect(() => {
        (async () => {
            const data = await getUserData();
            setUserData(data);
        })();
    }, [user]);

    const navigate = useNavigate();
    const goBack = () => {
        navigate("/info");
    };
    if (!user) {
        navigate("/");
    }
    const getTrainer = (): JSX.Element => {
        return userData?.bmiInfo?.bmi ? (
            <WrkOut bmi={userData.bmiInfo.bmi} />
        ) : (
            <></>
        );
    };

    return (
        <>
            {getTrainer()}
            <Button
                variant="contained"
                onClick={goBack}
                style={{
                    position: "absolute",
                    top: "2%",
                    left: "80%",
                }}
            >
                go Back
            </Button>
        </>
    );
};
