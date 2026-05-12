import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import api from "../api/axios";

function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    async function handleLogout() {
        try {
            await api.post("/auth/logout");
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <nav className="sticky top-0 z-50 flex items-center gap-2 px-8 h-16 bg-zinc-950 border-b border-zinc-800">
            <Link to="/" className="font-semibold text-white text-sm tracking-wide mr-auto">
                FileVault
            </Link>

            {user && (
                <span className="text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1">
                    @{user.username}
                </span>
            )}

            <Link to="/" className="text-sm text-zinc-400 hover:text-white px-3 py-1.5 rounded-md hover:bg-zinc-800 transition-colors">
                Home
            </Link>
            <Link to="/login" className="text-sm text-zinc-400 hover:text-white px-3 py-1.5 rounded-md hover:bg-zinc-800 transition-colors">
                Login
            </Link>
            <Link to="/register" className="text-sm text-zinc-400 hover:text-white px-3 py-1.5 rounded-md hover:bg-zinc-800 transition-colors">
                Register
            </Link>

            {user && (
                <button
                    onClick={handleLogout}
                    className="text-sm text-zinc-400 hover:text-red-400 px-3 py-1.5 rounded-md border border-zinc-800 hover:border-red-900 hover:bg-red-950/40 transition-colors"
                >
                    Logout
                </button>
            )}
        </nav>
    );
}

export default Navbar;