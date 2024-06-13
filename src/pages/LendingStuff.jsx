import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Lending({titleModal}) {
    const[lending, setLending] = useState([]);
    

    const navigate = useNavigate();

    useEffect(() => {
        getLending()
    }, []);

    function getLending() {
        axios.get(`http://localhost:8000/lending/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setLending(res.data.data);
        })
        .catch(err => {
            console.log(err.response)
            if (err.response.status == 401) {
                navigate('/login?message' + encodeURIComponent('Anda belum login!'));
            }
        })
    };

    const headers = [
        "#",
        "Name",
        "Barang",   
        "Date Time",
        "Notes",
        "Total Stuff",
        ];

    const endpointModal = {
        "data_detail": "http://localhost:8000/lending/show/{id}",
        "delete": "http://localhost:8000/lending/delete",
        "store": "http://localhost:8000/lending/store",
    };

    const columnIdentitasDelete = 'name';

 
    const inputData ={
        "stuff_id" : {
            "tag": "input",
            "type": "numerik",
            "option": null
        },
        "user_id" : {
            "tag": "input",
            "type": "numerik",
            "option": null
        },
        "date_time" : {
            "tag": "input",
            "type": "date",
            "option": null
        },
        "notes" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "name" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "total_stuff" : {
            "tag": "input",
            "type": "text",
            "option": null,
        }

    };

    const buttons = [
        "create",
        // "trash",
        // "edit",
        "delete",
    ];

    const tdColumn = {
        "name": null,
        // "user_id": "username",
        // "stuff_id": "name",
        "stuff": "name",
        "date_time": null,
        "notes": null,
        "total_stuff": null,
    };

   
    const title = 'Lending';
    return (
        <Case>
            <Table headers={headers} data={lending} endpoint={endpointModal} inputData={inputData} identitasColumn={columnIdentitasDelete} titleModal={titleModal} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}