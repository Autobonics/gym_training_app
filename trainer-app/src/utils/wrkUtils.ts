import { WorkoutInfo, BmiCategory, WorkoutCategory } from "../Types";

export const getWorkoutInfo = (category: BmiCategory): WorkoutInfo => {
    switch (category) {
        case BmiCategory.UnderWeight:
            return {
                bmiCategory: BmiCategory.UnderWeight,
                workouts: [
                    {
                        wrkCategory: WorkoutCategory.Squats,
                        weight: 20,
                        sets: 3,
                        reps: 12,
                        cal: 12,
                    },
                    {
                        wrkCategory: WorkoutCategory.Pushup,
                        sets: 3,
                        reps: 12,
                        cal: 14,
                    },
                    {
                        wrkCategory: WorkoutCategory.Dumbell,
                        weight: 10,
                        sets: 3,
                        reps: 12,
                        cal: 13,
                    },
                ],
            };
        case BmiCategory.Normal:
            return {
                bmiCategory: BmiCategory.Normal,
                workouts: [
                    {
                        wrkCategory: WorkoutCategory.Squats,
                        weight: 30,
                        sets: 3,
                        reps: 12,
                        cal: 15
                    },
                    {
                        wrkCategory: WorkoutCategory.Pushup,
                        sets: 3,
                        reps: 12,
                        cal: 12
                    },
                    {
                        wrkCategory: WorkoutCategory.Dumbell,
                        weight: 15,
                        sets: 3,
                        reps: 12,
                        cal: 14,
                    },
                ],
            };
        case BmiCategory.OverWeight:
            return {
                bmiCategory: BmiCategory.OverWeight,
                workouts: [
                    {
                        wrkCategory: WorkoutCategory.Squats,
                        weight: 40,
                        sets: 2,
                        reps: 15,
                        cal: 12,
                    },
                    {
                        wrkCategory: WorkoutCategory.Pushup,
                        sets: 2,
                        reps: 15,
                        cal: 10,
                    },
                    {
                        wrkCategory: WorkoutCategory.Dumbell,
                        weight: 20,
                        sets: 2,
                        reps: 15,
                        cal: 16,
                    },
                ],
            };
        case BmiCategory.Obese:
            return {
                bmiCategory: BmiCategory.Obese,
                workouts: [
                    {
                        wrkCategory: WorkoutCategory.Squats,
                        weight: 20,
                        sets: 2,
                        reps: 12,
                        cal: 11,
                    },
                    {
                        wrkCategory: WorkoutCategory.Pushup,
                        sets: 2,
                        reps: 12,
                        cal: 10,
                    },
                    {
                        wrkCategory: WorkoutCategory.Dumbell,
                        weight: 10,
                        sets: 2,
                        reps: 12,
                        cal: 13,
                    },
                ],
            };
    }
}


