import { WorkoutRes, WorkoutArgs, ResCallBack, PoseProc } from "../pose";
import {
    LandmarkList,
    POSE_LANDMARKS_LEFT,
    POSE_LANDMARKS_RIGHT,
} from "@mediapipe/pose";
import { proc_lm } from "../../utils/lmUtils";

enum PushupState {
    Up,
    Down,
}
interface RepRes {
    state: PushupState;
    counter?: number;
}
interface PushupRes extends WorkoutRes, RepRes {}

type Landmark = [number, number];

interface PushupProps {
    limit: number;
    finishState: boolean;
    setFinish: (newState: boolean) => void;
}
export const Pushup = (props: PushupProps): JSX.Element => {
    const args = { limit: props.limit };
    const initRes: PushupRes = {
        state: PushupState.Down,
        counter: 0,
        finish: false,
    };
    const callback: ResCallBack<WorkoutArgs, PushupRes> = (
        res: LandmarkList,
        args: WorkoutArgs,
        curState: PushupRes
    ): PushupRes => {
        let finish = false;
        if (args.limit && curState.counter) {
            finish = curState.counter >= args.limit;
        } else {
            finish = false;
        }
        const wrkRes = PushupRep(
            res,
            curState.counter as number,
            curState.state
        );
        props.setFinish(finish);
        return {
            ...wrkRes,
            finish: finish,
        };
    };
    return <PoseProc callback={callback} args={args} initState={initRes} />;
};
const PushupRep = (
    res: LandmarkList,
    counter: number,
    state: PushupState
): RepRes => {
    const upThreshold = 170;
    const downThreshold = 30;

    const calcAngle = (
        shoulder: Landmark,
        elbow: Landmark,
        wrist: Landmark
    ): number => {
        const angRad =
            Math.atan2(wrist[1] - elbow[1], wrist[0] - elbow[0]) -
            Math.atan2(shoulder[1] - elbow[1], shoulder[0] - elbow[0]);
        return Math.abs((angRad * 180.0) / Math.PI);
    };

    const [lf_shoulder, lf_elbow, lf_wrist] = [
        res[POSE_LANDMARKS_LEFT.LEFT_SHOULDER],
        res[POSE_LANDMARKS_LEFT.LEFT_ELBOW],
        res[POSE_LANDMARKS_LEFT.LEFT_WRIST],
    ].map(proc_lm);
    const lf_angle = calcAngle(lf_shoulder, lf_elbow, lf_wrist);
    const [rt_shoulder, rt_elbow, rt_wrist] = [
        res[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER],
        res[POSE_LANDMARKS_RIGHT.RIGHT_ELBOW],
        res[POSE_LANDMARKS_RIGHT.RIGHT_WRIST],
    ].map(proc_lm);
    const rt_angle = calcAngle(rt_shoulder, rt_elbow, rt_wrist);
    if (state == PushupState.Down) {
        if (lf_angle > downThreshold && rt_angle > downThreshold) {
            state = PushupState.Up;
        }
    } else {
        if (lf_angle < upThreshold && rt_angle < upThreshold) {
            counter += 1;
            state = PushupState.Down;
        }
    }
    return {
        counter,
        state,
    };
};
