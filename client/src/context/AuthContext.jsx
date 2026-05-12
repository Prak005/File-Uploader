import {createContext, useState, useEffect} from "react";
import api from "../api/axios";

const AuthContext = createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    console.log(user);
    useEffect(() => {
        async function fetchUser () {
            try{
                const response = await api.get("/auth/me");
                setUser(response.data);
            }catch(error) {
                setUser(null);
            }
        }
        fetchUser();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export {AuthProvider};
export default AuthContext;