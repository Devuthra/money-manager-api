import { createContext, useState, useContext } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const contextValue = {
        user,
        setUser  // ✅ good practice to expose setUser too
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// ✅ custom hook for easy access
export const useAppContext = () => useContext(AppContext);