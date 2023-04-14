import { Landmark } from "@mediapipe/pose";

export const proc_lm = (lm: Landmark) => [lm.x, lm.y] as [number, number]