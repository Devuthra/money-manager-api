import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Dashboard from "../components/DashBoard";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";

const Income = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) {
                 console.log("income data:", response.data); 
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch income details:", error);
            toast.error(error.response?.data?.message || "Failed to fetch income details");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteIncome = async (id) => {
        try {
            await axiosConfig.delete(`${API_ENDPOINTS.DELETE_INCOME}/${id}`);
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete income");
        }
    };

    useEffect(() => {
        fetchIncomeDetails();
    }, []);

    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto px-4 max-w-5xl">
                {loading ? (
                    <div className="flex items-center justify-center h-40">
                        <span className="text-gray-400 text-sm">Loading...</span>
                        <button className="add-btn" onClick={()=>setOpenAddIncomeModal(true)}>
                            <Plus size={15} className="text-lg"/>Add Income
                        </button>
                    </div>
                ) : (
                    <IncomeList
                        transaction={incomeData}
                        onDelete={handleDeleteIncome}
                    />

                    

                )}
                <Modal 
                isOpen={openAddIncomeModal}
                onClose={()=>setOpenAddIncomeModal(false)}
                title="Add Income"
                
                >
                    Income form modal
                    </Modal>

            </div>
        </Dashboard>
    );
};

export default Income;