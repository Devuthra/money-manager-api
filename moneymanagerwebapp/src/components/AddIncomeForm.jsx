import { useState, useEffect } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm = ({ onAddIncome, categories }) => {

    const [income, setIncome] = useState({
        name: '',
        amount: '',
        date: '',
        icon: '',
        categoryId: ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (categories?.length > 0) {
            setIncome(prev => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories]);

    const categoryOptions = categories?.map(category => ({
        value: category.id,
        label: category.name
    }));

    const handleChange = (key, value) => {
        setIncome({ ...income, [key]: value });
    };

    const handleAddIncome = async () => {
        setLoading(true);
        try {
            await onAddIncome(income);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        if(categories.length>0 && income.categoryId){
            setIncome((prev)=>({...prev,categoryId:categories[0].id}))
        }

    },[categories,income.categoryId]);

    return (
        <div className="flex flex-col gap-4">
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input
                value={income.name}
                onChange={(e) => handleChange('name', e.target.value)}
                label="Income Source"
                placeholder="e.g., Salary, Freelance, Bonus"
                type="text"
            />

            <Input
                label="Category"
                value={income.categoryId}
                onChange={(e) => handleChange('categoryId', e.target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={income.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                label="Amount"
                placeholder="e.g., 500.00"
                type="number"
            />

            <Input
                value={income.date}
                onChange={(e) => handleChange('date', e.target.value)}
                label="Date"
                type="date"
            />

            <div className="flex justify-end mt-2">
                <button
                    onClick={handleAddIncome}
                    disabled={loading}
                    className={`flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="animate-spin w-4 h-4" />
                            Adding...
                        </>
                    ) : (
                        'Add Income'
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;