interface DietProps {
    bmi: number | undefined;
}
enum DietCategory {
    UnderWeight,
    Normal,
    OverWeight,
    Obese,
}
type Calorie = number;
type Food = [string, Calorie];

interface DietPlan {
    morning: Array<Food>;
    noon: Array<Food>;
    night: Array<Food>;
}

export const Diet = (props: DietProps): JSX.Element => {
    if (!props.bmi) {
        return <></>;
    } else {
        return getDietPlan(props.bmi);
    }
};

const getCategory = (bmi: number) => {
    if (bmi < 18.5) {
        return DietCategory.UnderWeight;
    } else if (bmi >= 18.5 && bmi < 25) {
        return DietCategory.Normal;
    } else if (bmi >= 25 && bmi < 30) {
        return DietCategory.OverWeight;
    } else {
        return DietCategory.Obese;
    }
};

const getPlan = (category: DietCategory): DietPlan => {
    switch (category) {
        case DietCategory.UnderWeight:
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
        case DietCategory.Normal:
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
        case DietCategory.OverWeight:
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
        case DietCategory.Obese:
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
const getDietPlan = (bmi: number): JSX.Element => {
    const dietCategory: DietCategory = getCategory(bmi);
    const dietPlan: DietPlan = getPlan(dietCategory);
    return (
        <div>
            <h2>Diet Plan</h2>
            <h3>Morning Foods:</h3>
            <ul>
                {dietPlan.morning.map(([food, calories]) => (
                    <li key={food}>
                        {food}: {calories} calories
                    </li>
                ))}
            </ul>
            <h3>Noon Foods:</h3>
            <ul>
                {dietPlan.noon.map(([food, calories]) => (
                    <li key={food}>
                        {food}: {calories} calories
                    </li>
                ))}
            </ul>
            <h3>Night Foods:</h3>
            <ul>
                {dietPlan.night.map(([food, calories]) => (
                    <li key={food}>
                        {food}: {calories} calories
                    </li>
                ))}
            </ul>
        </div>
    );
};
