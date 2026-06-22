export const BASE_URL = "https://money-manager-api-1-92tu.onrender.com/api/v1.0";

const CLOUDINARY_CLOUD_NAME = "dygn8mern"

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    DELETE_CATEGORY: (id) => `/categories/${id}`,
    GET_ALL_INCOMES: "/incomes",
    UPDATE_CATEGORY:(categoryId)=>`/categories/${categoryId}`,
    CATEGORY_BY_TYPE:(type)=>`/categories/${type}`,
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}