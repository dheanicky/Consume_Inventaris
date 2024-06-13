import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from '../components/Table';
import Case from '../components/Case';

export default function Lending() {

    const [lending, setLending] = useState([]);
    //const [stuffs, setStuffs] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        getLending();
    }, []);

    function getLending() {
        axios.get("http:///localhost:8000/lending/data", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                setLending(res.data.data);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status == 401) {
                    navigate("/login?message=" + encodeURIComponent("Anda Belum Login!"));
                }
            });
    }

    const headers = [
        "no",
        "name",
        "stuff-id",
        "user-id",
        "date",
        "total_stuff",
        "note",
    ]


    const endpointModal = {
        store: "http://localhost:8000/lending/store",
    };

    // const inputData = {
    //     name: {
    //         tag: "input",
    //         type: "text",
    //         option: "null",
    //     },

    //     stuff_id: {
    //         tag: "input",
    //         type: "number",
    //         option: "null",
    //     },

    //     user_id: {
    //         tag: "input",
    //         type: "number",
    //         option: "null",
    //     },

    //     date_time: {
    //         tag: "input",
    //         type: "datetime-local",
    //         option: "null",
    //     },

    //     total_stuff: {
    //         tag: "input",
    //         type: "number",
    //         option: "null",
    //     },

    //     notes: {
    //         tag: "input",
    //         type: "text",
    //         option: "null",
    //     },
    // };

    const title = "Lending";

    const columnIdentitasDelete = "name";


    const buttons = [
        // "create",
    ]

    const tdColumn = {
        "name": null,
        "stuff": "name",
        "user": "username",
        "date_time": null,
        "total_stuff": null,
        "notes": null,
    }


    return (

        <Case>
            <Table headers={headers} data={lending} endpoint={endpointModal} titleModal={title} opsiButton={buttons} columnForTd={tdColumn} identitasColumn={columnIdentitasDelete} >
            </Table>
        </Case>

    )
}