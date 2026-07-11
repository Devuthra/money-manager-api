export const BASE_URL = "https://money-manager-api-1-92tu.onrender.com/api/v1.0";

const CLOUDINARY_CLOUD_NAME = "dygn8mern";

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    DELETE_CATEGORY: (id) => `/categories/${id}`,
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    GET_ALL_INCOMES: "/incomes",
    ADD_INCOME: "/incomes",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD: "/excel/download/income",
    GET_ALL_EXPENSES: "/expenses",
    ADD_EXPENSE: "/expenses",
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    EXPENSE_EXCEL_DOWNLOAD: "/excel/download/expense",
    APPLY_FILTERS:"/filter",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};