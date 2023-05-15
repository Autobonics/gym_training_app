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

export const getPlan = (category: BmiCategory): DietPlan | undefined => {
    switch (category) {
        case BmiCategory.UnderWeight:
            return {
                morning: [
                    ["Oats", 150, "/images/food/oats.png"],
                    ["Almond", 200, "/images/food/almond.png"],
                    ["Greek Yogurt", 120, "/images/food/greek-yogurt.png"],
                ],
                noon: [
                    ["Chicken Breast", 300, "/images/food/chicken-breast.png"],
                    ["Brown Rice", 150, "/images/food/brown-rice.png"],
                    ["Broccoli", 50, "/images/food/broccoli.png"],
                ],
                night: [
                    ["Salmon", 250, "/images/food/salmon.png"],
                    ["Quinoa", 150, "/images/food/quinoa.png"],
                    ["Spinach Salad", 50, "/images/food/spinach-salad.png"],
                ],
            };
        case BmiCategory.Normal:
            return {
                morning: [
                    ["Scrambled Eggs", 200, "/images/food/scrambled-eggs.png"],
                    ["Whole Wheat Toast", 100, "/images/food/whole-wheat-toast.png"],
                    ["Orange Juice", 50, "/images/food/orange-juice.png"],
                ],
                noon: [
                    ["Grilled Chicken Sandwich", 400, "/images/food/grilled-chicken-sandwich.png"],
                    ["Sweet Potato Fries", 200, "/images/food/sweet-potato-fries.png"],
                    ["Green Salad", 100, "/images/food/green-salad.png"],
                ],
                night: [
                    ["Baked Salmon", 350, "/images/food/baked-salmon.png"],
                    ["Brown Rice", 150, "/images/food/brown-rice.png"],
                    ["Steamed Broccoli", 50, "/images/food/broccoli.png"],
                ],
            };
        case BmiCategory.OverWeight:
            return {
                morning: [
                    ["Whole Wheat Toast", 100, "/images/food/whole-wheat-toast.png"],
                    ["Peanut Butter", 200, "/images/food/peanut-butter.png"],
                    ["Banana", 100, "/images/food/banana.png"],
                ],
                noon: [
                    ["Grilled Chicken Breast", 300, "/images/food/grilled-chicken-breast.png"],
                    ["Brown Rice", 200, "/images/food/brown-rice.png"],
                    ["Mixed Vegetables", 100, "/images/food/mixed-vegetables.png"],
                ],
                night: [
                    ["Grilled Fish", 300, "/images/food/grilled-fish.png"],
                    ["Quinoa", 150, "/images/food/quinoa.png"],
                    ["Roasted Asparagus", 50, "/images/food/asparagus.png"],
                ],
            };
    }
}