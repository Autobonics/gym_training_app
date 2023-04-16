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
                    },
                    {
                        wrkCategory: WorkoutCategory.Pushup,
                        sets: 3,
                        reps: 12,
                    },
                    {
                        wrkCategory: WorkoutCategory.Dumbell,
                        weight: 10,
                        sets: 3,
                        reps: 12,
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
                    },
                    {
                        wrkCategory: WorkoutCategory.Pushup,
                        sets: 3,
                        reps: 12,
                    },
                    {
                        wrkCategory: WorkoutCategory.Dumbell,
                        weight: 15,
                        sets: 3,
                        reps: 12,
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
                    },
                    {
                        wrkCategory: WorkoutCategory.Pushup,
                        sets: 2,
                        reps: 15,
                    },
                    {
                        wrkCategory: WorkoutCategory.Dumbell,
                        weight: 20,
                        sets: 2,
                        reps: 15,
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
                    },
                    {
                        wrkCategory: WorkoutCategory.Pushup,
                        sets: 2,
                        reps: 12,
                    },
                    {
                        wrkCategory: WorkoutCategory.Dumbell,
                        weight: 10,
                        sets: 2,
                        reps: 12,
                    },
                ],
            };
    }
}


