import { BmiCategory, DietPlan } from "../Types";
import { getCategory, getPlan } from "../utils/dietUtils";

interface DietProps {
    bmi: number | undefined;
}
export const Diet = (props: DietProps): JSX.Element => {
    if (!props.bmi) {
        return <></>;
    } else {
        return getDietPlan(props.bmi);
    }
};

const getDietPlan = (bmi: number): JSX.Element => {
    const BmiCategory: BmiCategory = getCategory(bmi);
    const dietPlan: DietPlan = getPlan(BmiCategory);
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
