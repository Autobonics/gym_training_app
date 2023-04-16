import {
    LandmarkList,
    POSE_LANDMARKS_LEFT,
    POSE_LANDMARKS_RIGHT,
} from "@mediapipe/pose";
import { WorkoutRes, WorkoutArgs, ResCallBack, PoseProc } from "../pose";
import { proc_lm } from "../../utils/LmProc";

enum DumbellState {
    Up,
    Down,
    Idle,
}
interface RepRes {
    leftState: DumbellState;
    rightState: DumbellState;
    leftCounter?: number;
    rightCounter?: number;
}
interface DumbellRes extends WorkoutRes, RepRes {}

export const Dumbell = (): JSX.Element => {
    const args = { left_limit: 5, right_limit: 5 };
    const initRes: DumbellRes = {
        leftState: DumbellState.Idle,
        rightState: DumbellState.Idle,
        leftCounter: 0,
        rightCounter: 0,
        finish: false,
    };
    const callback: ResCallBack<WorkoutArgs, DumbellRes> = (
        res: LandmarkList,
        args: WorkoutArgs,
        curState: DumbellRes
    ): DumbellRes => {
        let finish = false;
        if (
            args?.left_limit &&
            args?.right_limit &&
            curState?.leftCounter &&
            curState?.rightCounter
        ) {
            finish =
                curState.leftCounter >= args.left_limit &&
                curState.rightCounter >= args.right_limit;
        } else {
            finish = false;
        }
        const wktRes = dumbellRep(
            res,
            curState.leftCounter as number,
            curState.rightCounter as number,
            curState.leftState,
            curState.rightState
        );
        return {
            ...wktRes,
            finish: finish,
        };
    };

    return <PoseProc callback={callback} args={args} initState={initRes} />;
};

const dumbellRep = (
    res: LandmarkList,
    lf_count: number,
    rt_count: number,
    lf_state: DumbellState,
    rt_state: DumbellState
): RepRes => {
    const [lf_shoulder, lf_elbow, lf_wrist] = [
        res[POSE_LANDMARKS_LEFT.LEFT_SHOULDER],
        res[POSE_LANDMARKS_LEFT.LEFT_ELBOW],
        res[POSE_LANDMARKS_LEFT.LEFT_WRIST],
    ].map(proc_lm);

    const [rt_shoulder, rt_elbow, rt_wrist] = [
        res[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER],
        res[POSE_LANDMARKS_RIGHT.RIGHT_ELBOW],
        res[POSE_LANDMARKS_RIGHT.RIGHT_WRIST],
    ].map(proc_lm);
    const [leftState, leftCount, _left_angle] = getDumbellRep(
        lf_shoulder,
        lf_elbow,
        lf_wrist,
        lf_state,
        lf_count
    );
    const [rightState, rightCount, _right_angle] = getDumbellRep(
        rt_shoulder,
        rt_elbow,
        rt_wrist,
        rt_state,
        rt_count
    );
    return {
        leftCounter: leftCount,
        rightCounter: rightCount,
        leftState: leftState,
        rightState: rightState,
    };
};

type Angle = number;

const getDumbellRep = (
    shoulder: [number, number],
    elbow: [number, number],
    wrist: [number, number],
    dumbell_state: DumbellState,
    dumbell_count: number,
    up_threshold = 30,
    down_threshold = 130
): [DumbellState, number, Angle] => {
    const ang_rad =
        Math.atan2(wrist[1] - elbow[1], wrist[0] - elbow[0]) -
        Math.atan2(shoulder[1] - elbow[1], shoulder[0] - elbow[0]);
    const angle = Math.abs((ang_rad * 180.0) / Math.PI);
    if (angle > down_threshold) {
        return [DumbellState.Down, dumbell_count, angle];
    }
    if (angle < up_threshold && dumbell_state == DumbellState.Down) {
        return [DumbellState.Up, dumbell_count + 1, angle];
    }
    return [dumbell_state, dumbell_count, angle];
};
