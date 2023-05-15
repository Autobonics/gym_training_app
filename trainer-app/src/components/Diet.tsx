import { BmiCategory, DietPlan, Food } from "../Types";
import { getCategory, getPlan } from "../utils/dietUtils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
interface FoodTableProps {
    time: string;
    food: Food[];
}
const FoodTable = (props: FoodTableProps): JSX.Element => {
    return (
        <Paper sx={{ backgroundColor: "#1A1320", maxWidth: "400px" }}>
            <TableContainer component={Paper}>
                <Table
                    sx={{
                        maxWidth: "400px",
                        backgroundColor: "#1A1320",
                        border: "1px solid #7C1FC4",
                    }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Food</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.food.map(([food, calories, foodImg]) => (
                            <TableRow
                                key={food}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="right">{food}</TableCell>
                                <TableCell align="right">{calories}</TableCell>
                                <TableCell align="right">
                                    <img src={foodImg} alt={food} width={40} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
const getDietPlan = (bmi: number): JSX.Element => {
    const BmiCategory: BmiCategory = getCategory(bmi);
    const dietPlan: DietPlan = getPlan(BmiCategory) as DietPlan;
    return (
        <div>
            <h2>Diet Plan</h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    margin: "20px",
                }}
            >
                <FoodTable time="Morning" food={dietPlan.morning} />
                <FoodTable time="Noon" food={dietPlan.noon} />
                <FoodTable time="Night" food={dietPlan.night} />
                <br />
            </div>
        </div>
    );
};
