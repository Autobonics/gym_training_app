import { WorkoutRes, WorkoutArgs, ResCallBack, PoseProc } from "../pose";
import {
    LandmarkList,
    POSE_LANDMARKS_LEFT,
    POSE_LANDMARKS_RIGHT,
} from "@mediapipe/pose";
import { proc_lm } from "../../utils/LmProc";

enum SquatRep {
    Up,
    Down,
}

interface RepRes {
    state: SquatRep;
    counter?: number;
}
interface SquatRes extends WorkoutRes, RepRes {}
