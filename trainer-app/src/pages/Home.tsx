import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Paper } from "@mui/material";
import { Button, InputLabel, OutlinedInput } from "@mui/material";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { BmiInfo, SubmitInfo } from "../Types";

const calcBmi = (h: number, w: number): number => w / (h * h);

export const Home = () => {
    const navigate = useNavigate();
    const logOut = () => {
        signOut(auth);
    };
    const [user] = useAuthState(auth);
    if (!user) {
        navigate("/");
    }

    const [bmiInfo, setBmiInfo] = useState<BmiInfo>();
    const [pageState, setPageState] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const status = await checkUpload();
            if (status) {
                navigate("/info");
            }
            setPageState(true);
        })();
    }, [user]);

    const checkUpload = async (): Promise<boolean> => {
        const ref = collection(db, "bmiInfo");
        const q = query<SubmitInfo>(ref, where("id", "==", user?.uid));
        const snapshot = await getDocs(q);
        // optimizations :
        //  Directly use useNavigate('/trainer')
        // setPageState as boolean 0->Loading & 1->BmiForm
        return snapshot.docs.length > 0;
    };

    const uploadBmi = async (event: React.FormEvent) => {
        event.preventDefault();
        setBmiInfo({
            ...bmiInfo,
            bmi: calcBmi(bmiInfo?.height as number, bmiInfo?.weight as number),
        });
        if (user && bmiInfo) {
            const bmi = bmiInfo.bmi
                ? bmiInfo.bmi
                : calcBmi(bmiInfo.height as number, bmiInfo.weight as number);
            const info: SubmitInfo = {
                uname: user.displayName as string,
                id: user.uid,
                bmiInfo: {
                    height: bmiInfo?.height,
                    weight: bmiInfo?.weight,
                    bmi: bmi,
                },
            };
            await addDoc(collection(db, "bmiInfo"), info);
            navigate("/info");
        }
    };

    const bmiForm = () => {
        return (
            <form
                onSubmit={(e) => uploadBmi(e)}
                style={{
                    backgroundColor: "transparent",
                    border: "2px solid #fff",
                    padding: "1rem",
                    display: "inline-block",
                    width: "fit-content",
                }}
            >
                <InputLabel
                    htmlFor="height-input"
                    shrink
                    style={{ color: "#fff" }}
                >
                    Height in m
                </InputLabel>
                <br />
                <OutlinedInput
                    id="height-input"
                    type="float"
                    inputProps={{ step: 0.1 }}
                    style={{
                        backgroundColor: "#000",
                        borderRadius: "5px",
                        padding: "5px",
                        color: "text.secondary",
                        border: "1px solid #fff",
                    }}
                    onChange={(e) => {
                        setBmiInfo({
                            ...bmiInfo,
                            height: Number(e.target.value),
                        });
                    }}
                />
                <br />
                <br />
                <InputLabel
                    htmlFor="weight-input"
                    shrink
                    style={{ color: "#fff" }}
                >
                    Weight in kg
                </InputLabel>
                <br />
                <OutlinedInput
                    id="weight-input"
                    type="number"
                    inputProps={{ step: 0.1 }}
                    style={{
                        backgroundColor: "#000",
                        borderRadius: "5px",
                        padding: "5px",
                        color: "text.secondary",
                        border: "1px solid #fff",
                    }}
                    onChange={(e) => {
                        setBmiInfo({
                            ...bmiInfo,
                            weight: Number(e.target.value),
                        });
                    }}
                />
                <br />
                <br />
                <Button variant="contained" type="submit">
                    Submit
                </Button>
                <br />
                <br />
            </form>
        );
    };

    const getPage = (): JSX.Element => {
        return pageState ? bmiForm() : <h1>Loading Please wait</h1>;
    };

    return (
        <Paper
            style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                alignItems: "center",
                maxWidth: "fit-content",
                margin: "auto",
            }}
        >
            <h1>Welcome Home {user?.displayName}</h1>
            {getPage()}
            <Button
                variant="outlined"
                onClick={logOut}
                style={{ borderColor: "#fff" }}
            >
                Sign out
            </Button>
        </Paper>
    );
};
