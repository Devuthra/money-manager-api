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

export const addThousandsSeparator = (num) => {
    if (num === null || num === undefined || isNaN(num)) return "0";

    const [integerPart, fractionalPart] = num.toString().split(".");

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};