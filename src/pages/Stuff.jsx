import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Stuff() {
    //set = menampung value, tanpa set = menampilkan
    const [Stuffs, setStuffs] = useState([]);
    //navigate = yang ada didalam route
    const navigate = useNavigate();

    //useEffect = mejalankan suatu aksi
    useEffect(() => {
        getStuffs()
    }, []);
    //kondisi [] = render diawal

    function getStuffs() {
        axios.get(`http://localhost:8000/stuff/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message' + encodeURIComponent('Anda belum login!'));
            }
        })
    }

    const headers = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec"
    ]

    const endpointModal = {
        "data_detail": "http://localhost:8000/stuff/{id}",
        "delete": "http://localhost:8000/stuff/delete/{id}",
        "update": "http://localhost:8000/stuff/{id}",
        "store": "http://localhost:8000/stuff/store",
    }

    const inputData = {
        "name": {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "category": {
            "tag": "select",
            "type": "select",
            "option": ["HTL", "KLN", "Teknisi/Sarpras"]
        }
    };

    const buttonStuff = [
        "create",
        "trash",
        "edit",
        "delete",
    ];

    const tdColumn = {
        "name": null,
        "category": null,
        "stuff_stock": "total_available",
        "stuff_stock*": "total_defec"
    };

    const columnIdentitasDelete = 'name';
    const title = 'Stuff';

    return (
        <Case>
            <Table headers={headers} data={Stuffs} endpoint={endpointModal} inputData={inputData} titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttonStuff} columnForTd={tdColumn}></Table>
        </Case>
    )
}