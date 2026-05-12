import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import api from "../api/axios";

function Navbar() {
    const { user,setUser } = useContext(AuthContext);
    async function handleLogout() {
        try{
            await api.post("/auth/logout");
            setUser(null);
        }catch(error) {
            console.log(error);
        }
    }
    return (
        <nav className="p-4 border-b flex gap-4">
            {user && <p>{user.username}</p>}
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            {user && (
                <button onClick={handleLogout}>Logout</button>
            )}
        </nav>
    );
}

export default Navbar;