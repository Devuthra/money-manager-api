import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Dashboard from "../components/DashBoard";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseOverview from "../components/ExpenseOverview";
import DeleteAlert from "../components/DeleteAlert";

const Expense = () => {
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if (response.status === 200) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch expense details:", error);
            toast.error(error.response?.data?.message || "Failed to fetch expense details");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            toast.success("Expense deleted successfully");
            setOpenDeleteAlert({ show: false, data: null });
            fetchExpenseDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete expense");
        }
    };

    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch expense categories");
        }
    };

    const handleAddExpense = async (expense) => {
        const { name, amount, date, icon, categoryId } = expense;

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
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            });
            if (response.status === 201) {
                setOpenAddExpenseModal(false);
                toast.success("Expense added successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        } catch (error) {
            console.log("Error adding expense", error);
            toast.error(error.response?.data?.message || "Failed to add expense");
        }
    };

    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "expense_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Expense details downloaded successfully");
        } catch (error) {
            console.log("Error downloading expense details", error);
            toast.error(error.response?.data?.message || "Failed to download expense");
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto px-4 max-w-5xl">

                <ExpenseOverview transactions={expenseData} />

                {loading ? (
                    <div className="flex items-center justify-center h-40">
                        <span className="text-gray-400 text-sm">Loading...</span>
                    </div>
                ) : (
                    <ExpenseList
                        transaction={expenseData}
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                        onAdd={() => setOpenAddExpenseModal(true)}
                        onDownload={handleDownloadExpenseDetails}
                    />
                )}

                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm
                        onAddExpense={(expense) => handleAddExpense(expense)}
                        categories={categories}
                    />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Expense"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this expense entry?"
                        onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
                    />
                </Modal>

            </div>
        </Dashboard>
    );
};

export default Expense;