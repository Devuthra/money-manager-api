import { createContext, useState, useContext,useEffect } from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.jsx";

export const AppContext = createContext({});  //  added export

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const clearUser=()=>{
        setUser(null);
    }

    const contextValue = {
        user,
        setUser,
        clearUser
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !user) {
            const fetchUser = async () => {
                try {
                    const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);
                    setUser(response.data);
                } catch (error) {
                    console.error("Failed to fetch user", error);
                    clearUser();
                }
            };
            fetchUser();
        }
    }, []);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);