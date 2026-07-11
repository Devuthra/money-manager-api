import { useState } from "react";
import Dashboard from "../components/DashBoard";
import { Search, LoaderCircle } from "lucide-react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import moment from "moment";
import TransactionInfoCard from "../components/TransactionInfoCard";

const Filter = () => {
    const [type, setType] = useState("income");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortField, setSortField] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.APPLY_FILTERS, {
                params: {
                    type,
                    startDate,
                    endDate,
                    keyword,
                    sortField,
                    sortOrder,
                },
            });
            
            setTransaction(response.data);
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
            toast.error(error.response?.data?.message || "Failed to fetch transactions. Please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dashboard activeMenu="Filter">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Filter Transactions</h2>
                </div>
                <div className="card p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Select the Filters</h5>
                    </div>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="type">Type</label>
                            <select
                                value={type}
                                id="type"
                                className="w-full border rounded px-3 py-2"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="startdate" className="block text-sm font-medium mb-1">Start Date</label>
                            <input
                                value={startDate}
                                id="startdate"
                                type="date"
                                className="w-full border rounded px-3 py-2"
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="enddate" className="block text-sm font-medium mb-1">End Date</label>
                            <input
                                value={endDate}
                                id="enddate"
                                type="date"
                                className="w-full border rounded px-3 py-2"
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="sortField" className="block text-sm font-medium mb-1">Sort By</label>
                            <select
                                value={sortField}
                                id="sortField"
                                className="w-full border rounded px-3 py-2"
                                onChange={(e) => setSortField(e.target.value)}
                            >
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                                <option value="category">Category</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="sortorder" className="block text-sm font-medium mb-1">Sort Order</label>
                            <select
                                value={sortOrder}
                                id="sortorder"
                                className="w-full border rounded px-3 py-2"
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>

                        <div className="flex items-end gap-2">
                            <div className="w-full">
                                <label htmlFor="keyword" className="block text-sm font-medium mb-1">Search</label>
                                <input
                                    value={keyword}
                                    id="keyword"
                                    type="text"
                                    placeholder="Search....."
                                    className="w-full border rounded px-3 py-2"
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="p-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded flex items-center justify-center cursor-pointer shrink-0 disabled:opacity-60"
                            >
                                {loading ? (
                                    <LoaderCircle size={18} className="animate-spin" />
                                ) : (
                                    <Search size={18} />
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
                    <h5 className="text-lg font-medium text-gray-800 mb-4">Results</h5>

                    {loading ? (
                        <div className="flex items-center justify-center h-40">
                            <span className="text-gray-400 text-sm">Loading...</span>
                        </div>
                    ) : transaction.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-10">
                            No transactions found. Adjust your filters and search.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {transaction.map((item) => (
                                <TransactionInfoCard
                                    key={item.id}
                                    title={item.name}
                                    icon={item.icon}
                                    date={moment(item.date).format("DD MMM YYYY")}
                                    amount={item.amount}
                                    type={type}
                                    hideDeleteBtn
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Dashboard>
    );
};

export default Filter;