import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function UploadVideo() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [selectedFile, setSelectedFile] = useState("")

    // handle change
    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.name === 'phone_number') {
            e.target.value =  e.target.value.slice(0, 10)
        }
        setFormData((old) => ({...old, [e.target.name] : e.target.value}));
    }

    // handle submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = sessionStorage.getItem('token')
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
            }
        }

        let data = new FormData();
        data.append('file', selectedFile)
        data.append('title', formData?.title)
        data.append('description', formData?.description)
        data.append('category', formData?.category)
        data.append('file_url', formData?.file_url)
        data.append('file_name', formData?.file_name)

        axios.post('/upload-video', data, config)
        .then((res) => {
            setSuccess('Video uploaded successfully.')
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            setError('Error on upload video.')
        })
    }

    // get user
    const getUser = () => {
        const token = sessionStorage.getItem('token')
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

    // handle upload file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(e.target.files[0]);
        setFormData((old) => ({...old, 'file_url' : URL.createObjectURL(file)}));
        setFormData((old) => ({...old, 'file_name' : file.name}));
    }

    useEffect(() => {
        getUser();
    }, [])
    return (
        <>
            {/* main form */}
            <div className="add-order min-h-[80vh] py-12 flex items-center justify-center">
                <div className="h-full md:h-auto mx-auto">
                    <div className="form p-4 mb-5 bg-white shadow-lg border border-gray-300 rounded-lg sm:min-w-[480px] min-w-[300px]">
                        <p className="text-center font-bold text-2xl pb-5">Upload Video</p>
                        {error && (
                            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                {success}
                            </div>
                        )}
                            <form onSubmit={handleSubmit} method="POST" id="video-upload" encType="multipart/form-data">
                                <div className="form-group mb-4">
                                    <input type="text" placeholder="Title" className="text-lg border border-gray-200 focus:outline-none focus:border-blue-500 block p-3 rounded w-full" name="title" onChange={(e) => {handleChange(e)}} />
                                </div>
                                <div className="form-group mb-4">
                                    <textarea type="text" placeholder="Description" className="text-lg border border-gray-200 focus:outline-none focus:border-blue-500 block p-3 rounded w-full" name="description" onChange={(e) => {handleChange(e)}} rows={5} ></textarea>
                                </div>
                                <div className="form-group mb-4">
                                    <select name="category" id="category" className='text-lg border border-gray-200 focus:outline-none focus:border-blue-500 block p-3 rounded w-full' onChange={(e) => {handleChange(e)}} >
                                        <option value="sports">Sports</option>
                                        <option value="travel">Travel</option>
                                        <option value="gaming">Gaming</option>
                                        <option value="comedy">Comedy</option>
                                        <option value="vehicles">Vehicles</option>
                                        <option value="nature">Nature</option>
                                        <option value="pets-and-animals">Pets and Animals</option>
                                    </select>
                                </div>
                                <div className="form-group mb-4">
                                    <input type="file" className="text-lg border border-gray-200 focus:outline-none focus:border-blue-500 block rounded w-full" name="video" onChange={(e) => {handleFileChange(e)}} rows={5} />
                                </div>
                                <div className="form-group mb-4">
                                    <button className="text-center gap-2 w-full rounded p-3 bg-blue-500 text-white text-xl font-bold" type="submit">
                                        {loading ? <>
                                            <span>Loading...</span> 
                                        </> : <>
                                            <span>Upload Video</span> 
                                        </>}
                                    </button>
                                </div>
                            </form>               
                        </div>
                </div>
            </div>
        </>
    )
}
