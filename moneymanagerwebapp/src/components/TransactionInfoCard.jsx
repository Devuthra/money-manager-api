import { UtensilsCrossed, Trash2 } from "lucide-react";

const TransactionInfoCard = ({ icon, title, date, amount, type, hideDeleteBtn, onDelete }) => {
    const getAmountStyles = () =>
        type === 'income' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800';

    return (
        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
                {icon && icon.trim() !== "" ? (
                    <span className="text-2xl">{icon}</span>
                ) : (
                    <UtensilsCrossed size={20} className="text-purple-800" />
                )}
            </div>

            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-700 font-medium">{title}</p>
                    <p className="text-xs text-gray-400 mt-1">{date}</p>
                </div>

                <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getAmountStyles()}`}>
                    {type === 'income' ? '+' : '-'}₹{amount?.toLocaleString()}
                </div>
            </div>

            {!hideDeleteBtn && (
                <button
                    onClick={onDelete}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"
                >
                    <Trash2 size={15} />
                </button>
            )}
        </div>
    );
};

export default TransactionInfoCard;