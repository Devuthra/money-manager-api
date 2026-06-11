export const  BASE_URL="https://money-manager-api-1-92tu.onrender.com/api/v1.0";

const CLOUDINARY_CLOUD_NAME="dygn8mern"

export const API_ENDPOINTS={
    LOGIN: "/login",
    REGISTER:"/register",
    GET_USER_INFO: "/profile",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}