import { useState } from "react";
import api from "../api/axios";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await api.post("/auth/register", { username, password });
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-zinc-950 px-4">
            <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <p className="text-xs text-amber-400 font-medium tracking-widest uppercase mb-1">Get started</p>
                <h1 className="text-2xl font-bold text-white mb-7">Create account</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Username</label>
                        <input
                            type="text"
                            placeholder="choose_a_username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/10 transition-colors"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/10 transition-colors"
                        />
                        <p className="text-xs text-zinc-600 pl-0.5">Use a strong, unique password.</p>
                    </div>
                    <button
                        type="submit"
                        className="mt-1 w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-sm rounded-lg py-2.5 transition-colors active:scale-[0.98]"
                    >
                        Register
                    </button>
                </form>

                <div className="border-t border-zinc-800 mt-6 pt-5 text-center text-xs text-zinc-500">
                    Already have an account?{" "}
                    <a href="/login" className="text-amber-400 hover:underline font-medium">Sign in</a>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;