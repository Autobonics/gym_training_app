import * as nj from 'numjs';
import { Landmark } from "@mediapipe/pose";

export const proc_lm = (lm: Landmark) => nj.array([lm.x, lm.y])

