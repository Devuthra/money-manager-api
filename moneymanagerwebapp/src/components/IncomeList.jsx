import { Download, Mail, Plus } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transaction, onDelete, onAdd ,onDownload,onEmail}) => {
    return (
        <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-medium text-gray-800">Income Sources</h5>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onAdd}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-200"
                    >
                        <Plus size={15} />
                        Add Income
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg transition-all duration-200 hover:border-purple-500 hover:shadow-[0_0_0_2px_rgba(168,85,247,0.25)]" onClick={onEmail}>
                        <Mail size={15}  />
                        Email
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg transition-all duration-200 hover:border-purple-500 hover:shadow-[0_0_0_2px_rgba(168,85,247,0.25)]" onClick={onDownload}>
                        <Download size={15} />
                        Download
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transaction?.map((income) => (
                    <TransactionInfoCard
                        key={income.id}
                        title={income.name}
                        icon={income.icon}
                        date={moment(income.date).format('DD MMM YYYY')}
                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default IncomeList;