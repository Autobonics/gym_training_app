import { BmiCategory, DietPlan } from "../Types";
export const getCategory = (bmi: number) => {
    if (bmi < 18.5) {
        return BmiCategory.UnderWeight;
    } else if (bmi >= 18.5 && bmi < 25) {
        return BmiCategory.Normal;
    } else if (bmi >= 25 && bmi < 30) {
        return BmiCategory.OverWeight;
    } else {
        return BmiCategory.Obese;
    }
};

export const getPlan = (category: BmiCategory): DietPlan => {
    switch (category) {
        case BmiCategory.UnderWeight:
            return {
                morning: [
                    ["Oats", 150],
                    ["almond", 200],
                    ["GreekYogurt", 120],
                ],
                noon: [
                    ["Chicken Breast", 300],
                    ["Brown Rice", 150],
                    ["Broccoli", 50],
                ],
                night: [
                    ["Salmon", 250],
                    ["Quinoa", 150],
                    ["Spinach Salad", 50],
                ],
            };
        case BmiCategory.Normal:
            return {
                morning: [
                    ["Scrambled Eggs", 200],
                    ["Whole Wheat Toast", 100],
                    ["Orange Juice", 50],
                ],
                noon: [
                    ["Grilled Chicken Sandwich", 400],
                    ["Sweet Potato Fries", 200],
                    ["Green Salad", 100],
                ],
                night: [
                    ["Baked Salmon", 350],
                    ["Brown Rice", 150],
                    ["Steamed Broccoli", 50],
                ],
            };
        case BmiCategory.OverWeight:
            return {
                morning: [
                    ["Whole Wheat Toast", 100],
                    ["Peanut Butter", 200],
                    ["Banana", 100],
                ],
                noon: [
                    ["Grilled Chicken Breast", 300],
                    ["Brown Rice", 200],
                    ["Mixed Vegetables", 100],
                ],
                night: [
                    ["Grilled Fish", 300],
                    ["Quinoa", 150],
                    ["Roasted Asparagus", 50],
                ],
            };
        case BmiCategory.Obese:
            return {
                morning: [
                    ["Oatmeal", 150],
                    ["Low-Fat Milk", 50],
                    ["Blueberries", 50],
                ],
                noon: [
                    ["Grilled Salmon", 400],
                    ["Quinoa", 150],
                    ["Steamed Broccoli", 50],
                ],
                night: [
                    ["Grilled Chicken Breast", 300],
                    ["Brown Rice", 200],
                    ["Mixed Vegetables", 100],
                ],
            };
    }
};