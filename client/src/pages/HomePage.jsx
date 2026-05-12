import { useEffect, useState } from "react";
import api from "../api/axios";

function HomePage() {
    const [folders, setFolders ] = useState([]);
    const [folderName, setFolderName] = useState("");
    useEffect(() => {
        async function fetchFolders() {
            try{
                const response = await api.get("/folders");
                setFolders(response.data);
            } catch(error) {
                console.log(error);
            }
        }
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
                <div key={folder.id}>
                    {folder.name}
                </div>
            ))}
        </div>
    );
}

export default HomePage;