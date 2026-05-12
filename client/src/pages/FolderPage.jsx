import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function FolderPage() {
    const { id } = useParams();
    const [folder, setFolder] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    async function fetchFolder() {
        try {
            const response = await api.get(`/folders/${id}`);
            setFolder(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFolder();
    }, [id]);

    async function handleUpload(e) {
        e.preventDefault();
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            await api.post(`/folders/${id}/upload`, formData);
            await fetchFolder();
            setSelectedFile(null);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(fileId) {
        try {
            await api.delete(`/folders/files/${fileId}`);
            await fetchFolder();
        } catch (error) {
            console.log(error);
        }
    }

    if (!folder) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-zinc-950 text-zinc-600 text-sm">
                Loading…
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-zinc-950">
        <div className="max-w-3xl mx-auto px-8 py-10">
            <p className="text-xs text-amber-400 font-medium tracking-widest uppercase mb-1">Folder</p>
            <h1 className="text-2xl font-bold text-white mb-8">{folder.name}</h1>

            {/* Upload zone */}
            <div className="bg-zinc-900 border border-dashed border-zinc-700 rounded-xl p-5 mb-8">
                <p className="text-xs text-zinc-600 uppercase tracking-wider font-medium mb-3">Upload a file</p>
                <form onSubmit={handleUpload} className="flex gap-3 items-center flex-wrap">
                    <label className="flex items-center gap-2 bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm cursor-pointer hover:border-zinc-500 transition-colors">
                        <span>📎</span>
                        <span className={selectedFile ? "text-white font-medium" : "text-zinc-500"}>
                            {selectedFile ? selectedFile.name : "Choose file…"}
                        </span>
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={!selectedFile}
                        className="bg-amber-400 hover:bg-amber-300 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors active:scale-[0.98] disabled:cursor-not-allowed"
                    >
                        Upload
                    </button>
                </form>
            </div>

            <p className="text-xs text-zinc-600 uppercase tracking-wider font-medium mb-3 pb-3 border-b border-zinc-800">
                {folder.files.length} file{folder.files.length !== 1 ? "s" : ""}
            </p>

            {folder.files.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-zinc-800 rounded-xl text-zinc-600 text-sm">
                    No files uploaded yet.
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {folder.files.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl px-5 py-3.5 transition-colors"
                        >
                            <span className="text-base opacity-50">📄</span>
                            <a
                                href={`http://localhost:3000/${file.path}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 text-sm text-zinc-400 hover:text-amber-400 font-medium truncate transition-colors"
                            >
                                {file.name}
                            </a>
                            <button
                                onClick={() => handleDelete(file.id)}
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

export default FolderPage;