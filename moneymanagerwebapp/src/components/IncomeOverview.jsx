import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/helper";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions,onAddIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (transactions?.length > 0) {
            const result = prepareIncomeLineChartData(transactions);
            setChartData(result);
        } else {
            setChartData([]);
        }
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Trace your earnings over time and analyze your income trends.
                    </p>
                </div>
            </div>
        
            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
            
        </div>
    );
};

export default IncomeOverview;