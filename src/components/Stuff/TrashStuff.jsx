import React, { useEffect, useState } from "react";
import Case from "../Case";
import Table from "../Table";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function TrashStuff({   titleModal }) {
    const [stuffsTrash, setStuffsTrash] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/stuff/trash`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setStuffsTrash(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message' + encodeURIComponent('Anda belum login!'));
            }
        })
    }, [])

    const headers = [
        "No",
        "Name",
        "Category"
    ]

    const endpointModal = {
        "restore": "http://localhost:8000/stuff/restore/{id}",
        "delete_permanent": "http://localhost:8000/stuff/permanent/{id}",
    }

    const inputData = {}

    const title = 'Stuff'

    const columnIdentitasDelete = 'name'

    const buttons = [
        "restore",
        "permanentDeletes",
    ]

    const tdColumn = {
        "name": null,
        "category": null,
}
  return (
    <>
        <Case>
            <Table headers={headers} data={stuffsTrash} endpoint={endpointModal} inputData={inputData} titleModal={titleModal} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    </>
  )
}