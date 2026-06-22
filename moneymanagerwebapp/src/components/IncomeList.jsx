import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transaction, onDelete }) => {
    return (
        <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-medium text-gray-800">Income Sources</h5>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg transition-all duration-200 hover:border-purple-500 hover:shadow-[0_0_0_2px_rgba(168,85,247,0.25)]">
                        <Mail size={15} />
                        Email
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg transition-all duration-200 hover:border-purple-500 hover:shadow-[0_0_0_2px_rgba(168,85,247,0.25)]">
                        <Download size={15} />
                        Download
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transaction?.map((income) => (
                    <TransactionInfoCard
                        key={income._id}
                        title={income.source}
                        icon={income.icon}
                        date={moment(income.date).format('DD MMM YYYY')}
                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default IncomeList;