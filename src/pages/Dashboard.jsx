import React, { useEffect, useState } from "react";
import Case from '../components/Case';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const [stuffs, setStuffs] = useState([]);
    const [users, setUsers] = useState([]);
    const [sarprasCount, setSarprasCount] = useState([]);
    const [HTLsCount, setHTLCount] = useState([]);
    const [KLNCount, setKLNCount] = useState([]);
    const [lendings, setLendings] = useState([]);
    const [lendingGrouped, setLendingGrouped] = useState([]);
    

    const navigate = useNavigate();

    useEffect(() => {
        getDataStuffs();
        getDataUsers();
        getDataLendings();
    }, []);

    function getDataStuffs() {
        axios.get('http://localhost:8000/stuff/data', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            const allStuffs = res.data.data;
            setStuffs(allStuffs);
    
            // ini untuk memfilter sesuai category(Teknisi/Sarpras)
            const sarprasStuffs = allStuffs.filter(stuff => stuff.category === 'Teknisi/Sarpras');
            setSarprasCount(sarprasStuffs.length);

            // ini untuk memfilter sesuai category(HTL)
            const HTLStuffs = allStuffs.filter(stuff => stuff.category === 'HTL');
            setHTLCount(HTLStuffs.length);

            // ini untuk memfilter sesuai category(KLN)
            const KLNStuffs = allStuffs.filter(stuff => stuff.category === 'KLN');
            setKLNCount(KLNStuffs.length);

        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        });
    }
    

    function getDataUsers() {
        axios.get('http://localhost:8000/user/data/', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setUsers(res.data.data);
        })
        .catch(err => {
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        });
    }

    // function getDataSarpras() {
    //     axios.put('http://localhost:8000/stuff/data', {
    //         headers: {
    //             'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //         }
    //     })
    //     .then(res => {
    //         setSarprasCount(res.data.data);
    //         category(res.sarpras)
    //     })
    //     .catch(err => {
    //         if (err.response && err.response.status === 401) {
    //             navigate('/login?message=' + encodeURIComponent('Anda belum login'));
    //         }
    //     });
    // }



    function getDataLendings() {
        axios.get('http://localhost:8000/lending/data', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            const data = res.data.data;
            setLendings(data);
    
            const groupedData = {};
    
            data.forEach(entry => {
                const date = new Date(entry.date_time).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                }).replace(/ /g, '-'); 
                if (!groupedData[date]) {
                    groupedData[date] = 0;
                }
                groupedData[date] += entry.total_stuff;
            });
    
            const processedData = Object.keys(groupedData).map(date => ({
                date,
                totalStuff: groupedData[date]
            }));
    
            setLendingGrouped(processedData);
        })
        .catch(err => {
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        });
    }
    

    return (
        <Case>
                    <div className="flex flex-wrap justify-center m-10">
                <div className="p-4 w-1/3">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                                <h2 className="text-white dark:text-white text-lg font-medium">Data Stuff</h2>
                            </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{stuffs.length}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-1/3">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{users.length}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-1/3">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data Sarpras</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{sarprasCount}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-1/3">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data HTL</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{HTLsCount}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-1/3">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data KLN</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{KLNCount}</h1>
                    </div>
                </div>
            </div>
        </div>

            
            

            <div className="flex flex-wrap justify-center ">
                <div className="p-4 w-full">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Lending Data</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={lendingGrouped}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="totalStuff" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </Case>
    );
}