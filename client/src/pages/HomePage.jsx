import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function HomePage() {
    const [folders, setFolders] = useState([]);
    const [folderName, setFolderName] = useState("");

    async function fetchFolders() {
        try {
            const response = await api.get("/folders");
            setFolders(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFolders();
    }, []);

    async function handleCreateFolder(e) {
        e.preventDefault();
        try {
            const response = await api.post("/folders", { name: folderName });
            setFolders([response.data, ...folders]);
            setFolderName("");
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteFolder(folderId) {
        try {
            await api.delete(`/folders/${folderId}`);
            fetchFolders();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-zinc-950">
        <div className="max-w-3xl mx-auto px-8 py-10">
            <p className="text-xs text-amber-400 font-medium tracking-widest uppercase mb-1">Dashboard</p>
            <h1 className="text-2xl font-bold text-white mb-8">My Folders</h1>

            {/* Create folder */}
            <form onSubmit={handleCreateFolder} className="flex gap-3 mb-8">
                <input
                    type="text"
                    placeholder="New folder name…"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    className="flex-1 max-w-xs bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/10 transition-colors"
                />
                <button
                    type="submit"
                    className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors active:scale-[0.98]"
                >
                    + Create
                </button>
            </form>

            {/* Count label */}
            <p className="text-xs text-zinc-600 uppercase tracking-wider font-medium mb-3 pb-3 border-b border-zinc-800">
                {folders.length} folder{folders.length !== 1 ? "s" : ""}
            </p>

            {/* Folder list */}
            {folders.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl text-zinc-600 text-sm">
                    <p className="text-3xl mb-3 opacity-40">📁</p>
                    No folders yet. Create one above.
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {folders.map((folder) => (
                        <div
                            key={folder.id}
                            className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl px-5 py-3.5 transition-colors"
                        >
                            <span className="text-base opacity-50">📁</span>
                            <Link
                                to={`/folders/${folder.id}`}
                                className="flex-1 text-sm text-zinc-300 hover:text-amber-400 font-medium transition-colors"
                            >
                                {folder.name}
                            </Link>
                            <button
                                onClick={() => handleDeleteFolder(folder.id)}
                                className="text-xs text-zinc-600 hover:text-red-400 px-3 py-1 rounded-md border border-transparent hover:border-red-900 hover:bg-red-950/40 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
}

export default HomePage;