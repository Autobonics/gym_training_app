import { useEffect, useState } from "react";
import { BmiCategory, Workout, WorkoutCategory, WorkoutInfo } from "../Types";
import { Dumbell } from "./workout/Dumbell";
import { Pushup } from "./workout/Pushup";
import { Squat } from "./workout/Squat";
import { getCategory } from "../utils/dietUtils";
import { getWorkoutInfo } from "../utils/wrkUtils";
import { Button } from "@mui/material";
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
    const btnClr = (index: number): string =>
        index == selectDay ? "cyan" : "white";
    const btnClick = (index: number) => {
        setDay(index);
    };
    const displayDate = (): JSX.Element => {
        return (
            <div>
                {days.map((day, index) => (
                    <Button
                        variant="outlined"
                        key={day}
                        onClick={() => btnClick(index)}
                        style={{ backgroundColor: btnClr(index) }}
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
            <div>
                {desc}
                {weight ? (
                    <div>{`Holding a Weight of ${weight}.lb`}</div>
                ) : (
                    <></>
                )}
            </div>
        );
    };
    return (
        <>
            <div>
                {wrkDesc(
                    props.wrkList[curWrkout].wrkCategory,
                    props.wrkList[curWrkout].weight
                )}
            </div>
            {wrkOut}
        </>
    );
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
