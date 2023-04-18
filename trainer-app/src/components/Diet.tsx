import { BmiCategory, DietPlan, Food } from "../Types";
import { getCategory, getPlan } from "../utils/dietUtils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
        <Paper sx={{ backgroundColor: "grey.200" }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{props.time} Food:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Food</TableCell>
                                    <TableCell align="right">
                                        Calories
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.food.map(([food, calories]) => (
                                    <TableRow
                                        key={food}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell align="right">
                                            {food}
                                        </TableCell>
                                        <TableCell align="right">
                                            {calories}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
};
const getDietPlan = (bmi: number): JSX.Element => {
    const BmiCategory: BmiCategory = getCategory(bmi);
    const dietPlan: DietPlan = getPlan(BmiCategory);
    return (
        <div>
            <h2>Diet Plan</h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
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
