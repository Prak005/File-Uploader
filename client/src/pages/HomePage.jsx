import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function HomePage() {
    const [folders, setFolders ] = useState([]);
    const [folderName, setFolderName] = useState("");
    async function fetchFolders() {
        try{
            const response = await api.get("/folders");
            setFolders(response.data);
        } catch(error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchFolders();
    },[]);
    async function handleCreateFolder(e) {
        e.preventDefault();
        try{
            const response = await api.post("/folders", {
                name: folderName,
            });
            setFolders([response.data, ...folders]);
            setFolderName("");
        }catch(error) {
            console.log(error);
        }
    }
    async function handleDeleteFolder(folderId) {
        try{
            await api.delete(`/folders/${folderId}`);
            fetchFolders();
        }catch(error) {
            console.log(error);
        }
    }
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">
                Home Page
            </h1>
            <form onSubmit={handleCreateFolder}>
                <input
                    type="text"
                    placeholder="Folder Name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />
                <button type="submit">
                    Create Folder
                </button>
            </form>
            {folders.map((folder) => (
                <div key={folder.id} className="flex gap-2">
                    <Link to={`/folders/${folder.id}`}>
                        {folder.name}
                    </Link>
                    <button onClick={() => handleDeleteFolder(folder.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default HomePage;