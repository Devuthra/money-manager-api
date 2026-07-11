export const prepareIncomeLineChartData = (transactions) => {
    if (!transactions || transactions.length === 0) return [];

    const sortedData = [...transactions].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    return sortedData.map((transaction) => ({
        month: new Date(transaction.date).toLocaleString("default", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }),
        amount: transaction.amount,
        name: transaction.name,
    }));
};

export const prepareExpenseLineChartData = (transactions) => {
    if (!transactions || transactions.length === 0) return [];

    const sortedData = [...transactions].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    return sortedData.map((transaction) => ({
        month: new Date(transaction.date).toLocaleString("default", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }),
        amount: transaction.amount,
        name: transaction.name,
    }));
};