import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function MyVideos() {
    const [videos, setVideos] = useState([]);

    const getVideos = () => {
        const token = sessionStorage.getItem('token')
        axios.get('/user-videos', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            setVideos(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getVideos();
    }, [])
    return (
        <div>
            <section className='lg:w-10/12 w-full px-2 mx-auto py-20'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Video URL
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {videos.length > 0 ? <>
                                {videos.map((video, index) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <span className='truncate text-eliipsis overflow-hidden max-w-[300px]'>{video?.title}</span>
                                        </th>
                                        <td className="px-6 py-4">
                                            <span className='truncate text-eliipsis overflow-hidden max-w-[300px]'>{video?.category}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className='truncate text-eliipsis overflow-hidden max-w-[300px]'>{video?.description}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={video?.video_url} target='blank' className='truncate text-eliipsis overflow-hidden max-w-[200px]'>{video?.video_url}</a>
                                        </td>
                                    </tr>
                                ))}
                            </> : <>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" colSpan={4} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        No videos found for you.
                                    </th>
                                </tr>
                            </> }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}
