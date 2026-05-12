import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function FolderPage() {
    const { id } = useParams();
    const [folder, setFolder] = useState(null);
    useEffect(() => {
        async function fetchFolder() {
            try{
                const response = await api.get(`/folders/${id}`);
                setFolder(response.data);
            }catch(error) {
                console.log(error);
            }
        }
        fetchFolder();
    }, [id]);

    if(!folder){
        return <p>Loading...</p>
    }

    return(
        <div className="p-8">
            <h1 className="text-3xl font-bold">
                {folder.name}
            </h1>
        </div>
    );
}

export default FolderPage;