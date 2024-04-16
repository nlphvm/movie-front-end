import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("user") !== null
    );

    const handleLogin = (data) => {
        // console.log(data);
        const user = data;
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    const getUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    }

    return (
        <AuthContext.Provider
            value={{isLoggedIn, handleLogin, handleLogout, getUser}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};