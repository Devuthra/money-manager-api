import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label, color = "#875cf5" }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-sm font-semibold" style={{ color }}>
                    ₹{payload[0].value.toLocaleString()}
                </p>
                {payload[0].payload.name && (
                    <p className="text-xs text-gray-400 mt-0.5">{payload[0].payload.name}</p>
                )}
            </div>
        );
    }
    return null;
};

const CustomLineChart = ({ data, color = "#875cf5", emptyText = "No data to display" }) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                {emptyText}
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />

                <Tooltip
                    content={<CustomTooltip color={color} />}
                    trigger="hover"
                    allowEscapeViewBox={{ x: false, y: false }}
                    wrapperStyle={{ zIndex: 100 }}
                />

                <Line
                    type="monotone"
                    dataKey="amount"
                    stroke={color}
                    strokeWidth={2.5}
                    dot={{ r: 5, fill: color, strokeWidth: 0 }}
                    activeDot={{ r: 7, fill: color }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;