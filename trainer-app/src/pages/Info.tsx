import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { SubmitInfo } from "../Types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Diet } from "../components/Diet";
import {
    Avatar,
    Box,
    Button,
    CardHeader,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { red } from "@mui/material/colors";

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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap:5,
                    margin:5
                }}
            >
                <Card
                    sx={{
                        maxWidth: 400,
                        background: "none",
                        border: "1px solid white",
                    }}
                >
                    <CardHeader
                        sx={{
                            border: "1px solid white",
                        }}
                        avatar={
                            <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                            >
                                {userData.uname[0]}
                            </Avatar>
                        }
                        title={
                            <Typography
                                component="div"
                                variant="h3"
                                color="text.primary"
                            >
                                {userData.uname}
                            </Typography>
                        }
                    />
                    <CardContent>
                        <List
                            sx={{
                                width: "100%",
                                maxWidth: 400,
                            }}
                        >
                            <ListItem
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography
                                            component="div"
                                            variant="body1"
                                            color="text.primary"
                                        >
                                            Weight : {userData.bmiInfo?.weight}
                                        </Typography>
                                    }
                                />
                                <ListItemText
                                    primary={
                                        <Typography
                                            component="div"
                                            variant="body1"
                                            color="text.primary"
                                        >
                                            Height : {userData.bmiInfo?.height}
                                        </Typography>
                                    }
                                />
                                <ListItemText
                                    primary={
                                        <Typography
                                            component="div"
                                            variant="body1"
                                            color="text.primary"
                                        >
                                            BMI : {userData.bmiInfo?.bmi}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "30px",
                    }}
                >
                    {dietState ? <Diet bmi={userData.bmiInfo?.bmi} /> : <></>}
                    <Button
                        variant="contained"
                        onClick={() => {
                            setDiet(!dietState);
                        }}
                    >
                        {!dietState ? "Show Diet Plan" : "Hide Diet Plan"}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate("/trainer");
                        }}
                    >
                        Start Training
                    </Button>
                </div>
            </Box>
        ) : (
            <h1>Getting User info </h1>
        );
    };

    return (
        <>
            {getInfo()}
            <Button
                variant="contained"
                onClick={logOut}
                style={{
                    position: "absolute",
                    top: "5%",
                    left: "80%",
                }}
            >
                Sign out
            </Button>
        </>
    );
};
