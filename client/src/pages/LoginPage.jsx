import {useState} from "react";
import api from "../api/axios";

function LoginPage () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const response = await api.post("/auth/login", {
                username,
                password,
            });
            console.log(response.data);
        } catch(error) {
            console.log(error.response.data);
        }
    }
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">
                Login Page
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" className="border p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;