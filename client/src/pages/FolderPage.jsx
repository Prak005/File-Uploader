import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function FolderPage() {
    const { id } = useParams();
    const [folder, setFolder] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    async function fetchFolder() {
        try{
            const response = await api.get(`/folders/${id}`);
            setFolder(response.data);
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFolder();
    }, [id]);

    async function handleUpload(e) {
        e.preventDefault();
        if(!selectedFile){
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        try{
            await api.post(`/folders/${id}/upload`, formData);
            await fetchFolder();
            setSelectedFile(null);
        }catch(error) {
            console.log(error);
        }
    }

    if(!folder){
        return <p>Loading...</p>
    }

    return(
        <div className="p-8">
            <h1 className="text-3xl font-bold">
                {folder.name}
            </h1>
            <form onSubmit={handleUpload}>
                <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <button type="submit">
                    Upload
                </button>
            </form>
            {folder.files.map((file) => (
                <div key={file.id}>
                    <a href={`http://localhost:3000/${file.path}`} target="_blank">
                        {file.name}
                    </a>
                </div>
            ))}
        </div>
    );
}

export default FolderPage;