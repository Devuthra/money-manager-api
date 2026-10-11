import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                <p className="text-xs font-semibold text-purple-800 mb-1">
                    {payload[0].name}
                </p>
                <p className="text-sm text-gray-600">
                    Amount:{" "}
                    <span className="text-sm font-medium text-gray-900">
                        ₹{payload[0].value}
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

const CustomLegend = ({ payload }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-2">
            {payload.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center space-x-2">
                    <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-xs text-gray-700 font-medium">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

const CustomPieChart = ({
    data,
    label,
    totalAmount,
    colors,
    showTextAnchor,
}) => {
    return (
        <div>
            <ResponsiveContainer width="100%" height={380}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        innerRadius={100}
                        labelLine={false}
                    >
                        {data?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>

                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} />

                    {showTextAnchor && (
                        <>
                            <text
                                x="50%"
                                y="50%"
                                dy={-25}
                                textAnchor="middle"
                                fill="#666"
                                fontSize="14px"
                            >
                                {label}
                            </text>
                            <text
                                x="50%"
                                y="50%"
                                dy={8}
                                textAnchor="middle"
                                fill="#333"
                                fontSize="24px"
                                fontWeight="600"
                            >
                                {totalAmount}
                            </text>
                        </>
                    )}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;