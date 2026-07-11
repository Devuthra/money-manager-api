import { Download, LoaderCircle, Plus } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const ExpenseList = ({ transaction, onDelete, onAdd, onDownload }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            await onDownload();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-medium text-gray-800">Expenses</h5>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onAdd}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-200"
                    >
                        <Plus size={15} />
                        Add Expense
                    </button>
                    <button disabled={loading} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg transition-all duration-200 hover:border-purple-500 hover:shadow-[0_0_0_2px_rgba(168,85,247,0.25)]" onClick={handleDownload}>
                        {loading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin" />
                                Downloading....
                            </>
                        ) : (
                            <>
                                <Download size={15} />
                                Download
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transaction?.map((expense) => (
                    <TransactionInfoCard
                        key={expense.id}
                        title={expense.name}
                        icon={expense.icon}
                        date={moment(expense.date).format('DD MMM YYYY')}
                        amount={expense.amount}
                        type="expense"
                        onDelete={() => onDelete(expense.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;