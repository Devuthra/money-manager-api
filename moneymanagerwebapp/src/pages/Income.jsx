import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Dashboard from "../components/DashBoard";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import AddIncomeForm from "../components/AddIncomeForm";
import IncomeOverview from "../components/IncomeOverview";
import DeleteAlert from "../components/DeleteAlert";

const Income = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
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
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            toast.success("Income deleted successfully");
            setOpenDeleteAlert({ show: false, data: null });
            fetchIncomeDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete income");
        }
    };

    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch income categories");
        }
    };

    const handleAddIncome = async (income) => {
        const { name, amount, date, icon, categoryId } = income;

        if (!name.trim()) {
            toast.error("Please enter a name");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0");
            return;
        }
        if (!date) {
            toast.error("Please select a date");
            return;
        }
        const today = new Date().toISOString().split("T")[0];
        if (date > today) {
            toast.error("Date cannot be in the future");
            return;
        }
        if (!categoryId) {
            toast.error("Please select a category");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            });
            if (response.status === 201) {
                setOpenAddIncomeModal(false);
                toast.success("Income added successfully");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        } catch (error) {
            console.log("Error adding income", error);
            toast.error(error.response?.data?.message || "Failed to add income");
        }
    };

    const handleDownloadIncomeDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "income_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url); // ✅ fixed typo: was revakeObjectURL
            toast.success("Income details downloaded successfully");
        } catch (error) {
            console.log("Error downloading income details", error);
            toast.error(error.response?.data?.message || "Failed to download income");
        }
    };

    const handleEmailIncomeDetails = () => {
        console.log("Email income details");
    };

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    }, []);

    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto px-4 max-w-5xl">

                <IncomeOverview
                    transactions={incomeData}
                    onAddIncome={() => setOpenAddIncomeModal(true)}
                />

                {loading ? (
                    <div className="flex items-center justify-center h-40">
                        <span className="text-gray-400 text-sm">Loading...</span>
                    </div>
                ) : (
                    <IncomeList
                        transaction={incomeData}
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                        onAdd={() => setOpenAddIncomeModal(true)}
                        onDownload={handleDownloadIncomeDetails}
                        onEmail={handleEmailIncomeDetails}
                    />
                )}

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm
                        onAddIncome={(income) => handleAddIncome(income)}
                        categories={categories}
                    />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Income"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this income entry?"
                        onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
                    />
                </Modal>

            </div>
        </Dashboard>
    );
};

export default Income;