import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-sm font-semibold text-purple-600">
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

const CustomLineChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                No income data to display
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

                {/* ✅ these 3 props fix touch */}
                <Tooltip
                    content={<CustomTooltip />}
                    trigger="hover"
                    allowEscapeViewBox={{ x: false, y: false }}
                    wrapperStyle={{ zIndex: 100 }}
                />

                <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#875cf5"
                    strokeWidth={2.5}
                    dot={{ r: 5, fill: "#875cf5", strokeWidth: 0 }}
                    activeDot={{ r: 7, fill: "#875cf5" }}  // ✅ bigger tap target
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;