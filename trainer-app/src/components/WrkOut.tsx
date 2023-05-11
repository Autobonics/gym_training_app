import { useEffect, useState } from "react";
import { BmiCategory, Workout, WorkoutCategory, WorkoutInfo } from "../Types";
import { Dumbell } from "./workout/Dumbell";
import { Pushup } from "./workout/Pushup";
import { Squat } from "./workout/Squat";
import { getCategory } from "../utils/dietUtils";
import { getWorkoutInfo } from "../utils/wrkUtils";
import { Button, Typography } from "@mui/material";
import shuffle from "lodash/shuffle";
interface WrkOutProps {
    bmi: number;
}
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export const WrkOut = (props: WrkOutProps): JSX.Element => {
    const [selectDay, setDay] = useState(new Date().getDay());
    const btnClr = (index: number): React.CSSProperties =>
        index == selectDay
            ? { color:"#040001",backgroundColor: "#7C1FC4" }
            : { backgroundColor: "#040001" };
    const btnClick = (index: number) => {
        setDay(index);
    };
    const displayDate = (): JSX.Element => {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    marginTop: "20px",
                    marginBottom: 0,
                }}
            >
                {days.map((day, index) => (
                    <Button
                        variant="outlined"
                        key={day}
                        onClick={() => btnClick(index)}
                        style={btnClr(index)}
                    >
                        {day}
                    </Button>
                ))}
            </div>
        );
    };
    return (
        <div>
            {displayDate()}
            {dailyWorkout(selectDay, props.bmi)}
        </div>
    );
};

const startWorkout = (
    category: WorkoutCategory,
    count: number,
    finishState: boolean,
    finishCallback: (newState: boolean) => void
): JSX.Element => {
    switch (category) {
        case WorkoutCategory.Dumbell:
            return (
                <Dumbell
                    leftLimit={count}
                    rightLimit={count}
                    finishState={finishState}
                    setFinish={finishCallback}
                />
            );
        case WorkoutCategory.Pushup:
            return (
                <Pushup
                    limit={count}
                    finishState={finishState}
                    setFinish={finishCallback}
                />
            );
        case WorkoutCategory.Squats:
            return (
                <Squat
                    limit={count}
                    finishState={finishState}
                    setFinish={finishCallback}
                />
            );
        default:
            return <></>;
    }
};

const dailyWorkout = (day: number, bmi: number): JSX.Element => {
    const dailyWrks: Array<Workout> = getDailyWrks(day, bmi);
    return <InitWorkout wrkList={dailyWrks} />;
};
interface InitProps {
    wrkList: Array<Workout>;
}
const InitWorkout = (props: InitProps): JSX.Element => {
    const [curWrkout, setCurWrkout] = useState<number>(0);
    const [finishState, setFinish] = useState<boolean>(false);
    const finishCallback = (newState: boolean): void => {
        setFinish(newState);
    };
    if (finishState) {
        setCurWrkout(curWrkout + 1);
        setFinish(false);
    }
    const wrkOut = startWorkout(
        props.wrkList[curWrkout].wrkCategory,
        props.wrkList[curWrkout].reps,
        finishState,
        finishCallback
    );
    const wrkDesc = (
        category: WorkoutCategory,
        weight: number | undefined
    ): JSX.Element => {
        let desc: string = "";
        switch (category) {
            case WorkoutCategory.Dumbell:
                desc = "Hold Dumbell in both hands";
                break;
            case WorkoutCategory.Pushup:
                desc = "Take Pushups";
                break;
            case WorkoutCategory.Squats:
                desc = "Take Squats";
                break;
        }
        return (
            <>
                <Typography
                    component="div"
                    variant="body1"
                    color="text.primary"
                >
                    {desc}
                </Typography>
                {weight ? (
                    <Typography
                        component="div"
                        variant="body1"
                        color="text.primary"
                    >
                        {`Holding a Weight of ${weight}.lb`}
                    </Typography>
                ) : (
                    <></>
                )}
            </>
        );
    };
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 150,
                    marginTop: 10,
                }}
            >
                <div
                    style={{
                        border: "1px solid white",
                        padding: 10,
                    }}
                >
                    {wrkDesc(
                        props.wrkList[curWrkout].wrkCategory,
                        props.wrkList[curWrkout].weight
                    )}
                    <img
                        src={getWrkImg(props.wrkList[curWrkout].wrkCategory)}
                        style={{
                            maxWidth: 400,
                            maxHeight: 600,
                        }}
                    />
                </div>
                {wrkOut}
            </div>
        </>
    );
};

const getWrkImg = (category: WorkoutCategory): string => {
    let res = "/images/workout/default.gif";
    switch (category) {
        case WorkoutCategory.Dumbell: {
            res = "/images/workout/dumbell.gif";
            break;
        }
        case WorkoutCategory.Pushup: {
            res = "/images/workout/pushup.gif";
            break;
        }
        case WorkoutCategory.Squats: {
            res = "/images/workout/squats.gif";
            break;
        }
    }
    return res;
};

const getDailyWrks = (day: number, bmi: number): Array<Workout> => {
    const category: BmiCategory = getCategory(bmi);
    const wrkInfo: WorkoutInfo = getWorkoutInfo(category);
    const rep_inc = day % 4;
    const set_inc = day % 2;
    const weight_inc = day % 3;
    const wrkOuts: Array<Workout> = wrkInfo.workouts.map((wrk: Workout) => {
        wrk.reps += rep_inc;
        wrk.sets += set_inc;
        if (wrk.weight) {
            wrk.weight += weight_inc;
        }
        return wrk;
    });
    return shuffle(wrkOuts);
};
