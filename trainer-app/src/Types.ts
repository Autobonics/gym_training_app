export interface BmiInfo {
    height?: number,
    weight?: number,
    bmi?: number,
}
export interface SubmitInfo {
    uname?: string,
    id?: string,
    bmiInfo?: BmiInfo,
}

export enum BmiCategory {
    UnderWeight,
    Normal,
    OverWeight,
    Obese,
}

export type Calorie = number;
export type Food = [string, Calorie];

export interface DietPlan {
    morning: Array<Food>;
    noon: Array<Food>;
    night: Array<Food>;
}

export interface WorkoutInfo {
    bmiCategory: BmiCategory;
    workouts: Array<Workout>;
}
export enum WorkoutCategory {
    Dumbell,
    Pushup,
    Squats,
}

export interface Workout {
    wrkCategory: WorkoutCategory;
    weight?: number;
    sets: number;
    reps: number;
}
