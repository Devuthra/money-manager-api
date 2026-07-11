import { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../util/helper";
import CustomLineChart from "./CustomLineChart";

const ExpenseOverview = ({ transactions }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (transactions?.length > 0) {
            const result = prepareExpenseLineChartData(transactions);
            setChartData(result);
        } else {
            setChartData([]);
        }
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">Expense Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your spending over time and analyze your expense trends.
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <CustomLineChart
                    data={chartData}
                    color="#ef4444"
                    emptyText="No expense data to display"
                />
            </div>
        </div>
    );
};

export default ExpenseOverview;