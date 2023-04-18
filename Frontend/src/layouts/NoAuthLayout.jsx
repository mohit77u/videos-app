import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import axios from 'axios';

export default function NoAuthLayout() {

    const [user, setUser] = useState({});
    const token = sessionStorage.getItem('token');

    // get user
    const getUser = (token) => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        axios.get('/me', config)
        .then((res) => {
            setUser(res.data)
        })
    }

    // check if token then found user
    useEffect(() => {
        if(token) {
            getUser(token);
        } 
    }, [token]);

    return (
        <div>
            {/* Header */}
            <Header user = {user} />

            {/* main content */}
            <Outlet />
        </div>
    )
}
