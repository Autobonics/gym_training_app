import { WorkoutRes, WorkoutArgs, ResCallBack, PoseProc } from "../pose";
import {
    LandmarkList,
    POSE_LANDMARKS_LEFT,
    POSE_LANDMARKS_RIGHT,
} from "@mediapipe/pose";
import { proc_lm } from "../../utils/lmUtils";

enum SquatState {
    Up,
    Down,
}

interface RepRes {
    state: SquatState;
    counter?: number;
}

type Landmark = [number, number];

interface SquatRes extends WorkoutRes, RepRes {}

interface SquatProps {
    limit: number;
    finishState: boolean;
    setFinish: (newState: boolean) => void;
}
export const Squat = (props: SquatProps): JSX.Element => {
    const initRes: SquatRes = {
        state: SquatState.Up,
        counter: 0,
        finish: false,
    };
    const args: WorkoutArgs = {
        limit: props.limit,
    };
    const callback: ResCallBack<WorkoutArgs, SquatRes> = (
        res: LandmarkList,
        args: WorkoutArgs,
        curState: SquatRes
    ): SquatRes => {
        let finish = false;
        if (args.limit && curState.counter) {
            finish = curState.counter >= args.limit;
        } else {
            finish = false;
        }

        const wrkRes = SquatRep(
            res,
            curState.counter as number,
            curState.state
        );
        props.setFinish(finish);
        return {
            ...wrkRes,
            finish,
        };
    };

    return <PoseProc callback={callback} args={args} initState={initRes} />;
};
const SquatRep = (
    res: LandmarkList,
    counter: number,
    state: SquatState
): RepRes => {
    const upThreshold = 90;
    const downThreshold = 160;

    const calcAngle = (hip: Landmark, knee: Landmark, ankle: Landmark) => {
        const angRad =
            Math.atan2(ankle[1] - knee[1], ankle[0] - knee[1]) -
            Math.atan2(hip[1] - knee[1], hip[0] - knee[0]);
        return Math.abs((angRad * 180) / Math.PI);
    };

    const [lf_hip, lf_knee, lf_ankle] = [
        res[POSE_LANDMARKS_LEFT.LEFT_HIP],
        res[POSE_LANDMARKS_LEFT.LEFT_KNEE],
        res[POSE_LANDMARKS_LEFT.LEFT_ANKLE],
    ].map(proc_lm);
    const [rt_hip, rt_knee, rt_ankle] = [
        res[POSE_LANDMARKS_RIGHT.RIGHT_HIP],
        res[POSE_LANDMARKS_RIGHT.RIGHT_KNEE],
        res[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE],
    ].map(proc_lm);
    const lf_angle = calcAngle(lf_hip, lf_knee, lf_ankle);
    const rt_angle = calcAngle(rt_hip, rt_knee, rt_ankle);
    if (
        lf_angle <= downThreshold &&
        rt_angle <= downThreshold &&
        state == SquatState.Up
    ) {
        state = SquatState.Down;
        counter += 1;
    } else if (lf_angle >= upThreshold && rt_angle >= upThreshold) {
        state = SquatState.Up;
    }
    return {
        state,
        counter,
    };
};
