import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Profile(props) {

    const [user, setUser] = useState({});
    const token = sessionStorage.getItem('token');
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

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
            setFormData(res.data)
        })
    }

    // check if token then found user
    useEffect(() => {
        if(token) {
            getUser(token);
        } 
    }, [token]);

    // handle change
    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.name === 'phone_number') {
            e.target.value =  e.target.value.slice(0, 10)
        }
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    // handle submit 
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put('/update-user/' + user?._id, formData)
        .then((res) => {
            setSuccess(res?.data?.message);
        }).catch((err) => {
            setError(err?.response?.data?.message);
        })
    }

    return (
        <div>
            {/* main form */}
            <div className="add-order min-h-[80vh] py-12 flex items-center justify-center">
                <div className="h-full md:h-auto mx-auto">
                    <div className="form p-4 mb-5 bg-white shadow-lg border border-gray-300 rounded-lg min-w-[380px]">
                        <p className="text-center font-bold text-2xl pb-5">Update Profile</p>
                        {error && (
                            <div className="p-4 mb-4 text-sm text-red-500 rounded-md bg-red-50 " role="alert">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-4 mb-4 text-sm text-green-400 rounded-md bg-green-50 " role="alert">
                                {success}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} id="update-profile-form">
                            <div className="form-group mb-4">
                                <input type="text" placeholder="Name" className="text-lg border border-gray-200 focus:outline-none focus:border-blue-500 block p-3 rounded w-full" name="name" value={formData?.name} onChange={(e) => {handleChange(e)}} />
                            </div>
                            <div className="form-group mb-4">
                                <input type="text" placeholder="Phone Number" className="text-lg border border-gray-200 focus:outline-none focus:border-blue-500 block p-3 rounded w-full" name="phone_number" value={formData?.phone_number} onChange={(e) => {handleChange(e)}} />
                            </div>
                            <div className="form-group mb-4">
                                <input type="email" placeholder="Email" className="text-lg border border-gray-200 focus:outline-none focus:border-blue-500 block p-3 rounded w-full" name="email" value={formData?.email} onChange={(e) => {handleChange(e)}} />
                            </div>
                            <div className="form-group mb-4">
                                <button className="w-full rounded p-3 bg-blue-500 text-white text-xl font-bold" type="submit">Update Profile</button>
                            </div>
                        </form>               
                    </div>
                </div>
            </div>
        </div>
    )
}
