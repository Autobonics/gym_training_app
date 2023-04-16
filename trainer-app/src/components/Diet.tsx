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
    return <></>;
};
