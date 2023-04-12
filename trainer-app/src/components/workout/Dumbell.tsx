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
interface DumbellRes extends WorkoutRes {
    left_state: DumbellState;
    right_state: DumbellState;
    left_count: number;
    right_count: number;
    finish: boolean;
}

export const Dumbell = () => {
    const args = { left_threshold: 5, right_threshold: 5 };
    const callback: ResCallBack<WorkoutArgs, DumbellRes> = (
        res: LandmarkList,
        args: WorkoutArgs,
        curState: DumbellRes
    ): DumbellRes => {
        let finish = false;
        if (
            curState.left_counter &&
            curState.right_counter &&
            args.left_threshold &&
            args.right_threshold
        ) {
            finish =
                curState.left_counter >= args.left_threshold &&
                curState.right_counter >= args.right_threshold;
        } else {
            finish = false;
        }
        const [lf_count, rt_count, lf_state, rt_state] = dumbellRep(
            res,
            curState.left_count,
            curState.right_count,
            curState.left_state,
            curState.right_state
        );
        return {
            left_count: lf_count,
            right_count: rt_count,
            left_state: lf_state,
            right_state: rt_state,
            finish: finish,
        };
    };

    return <PoseProc callback={callback} args={args} />;
};

const dumbellRep = (
    res: LandmarkList,
    left_count: number,
    right_count: number,
    left_state: DumbellState,
    right_state: DumbellState
): [number, number, DumbellState, DumbellState] => {
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
    return [left_count, right_count, left_state, right_state];
};
