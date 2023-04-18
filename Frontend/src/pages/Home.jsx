import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Home() {
    const [videos, setVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);

    const getVideos = () => {
        axios.get('/videos')
        .then((res) => {
            setVideos(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getFilteredVideos = (e) => {
        let value = e.target.value.toLowerCase();

        let filteredVideos = []

        for(let i = 0; i < videos.length; i++) {
            if(videos[i].title.includes(value) || videos[i].description.includes(value) ) {
                filteredVideos.push(videos[i])
            }
        }

        setFilteredVideos(filteredVideos)
    }

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <div>
            {/* main content */}
            <section className='lg:w-10/12 w-full px-2 mx-auto py-20'>
                <div className="search mb-5">
                    <input type="text" onKeyUp={(e) => {getFilteredVideos(e)}} className='bg-white py-3 px-4 border border-gray-200 rounded lg:w-4/12 md:w-6/12 sm:w-8/12 w-full' placeholder='Search here...' />
                </div>
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    {videos.length > 0 ? <>
                        {filteredVideos ? <>
                            {filteredVideos.map((video, index) => (
                            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={index}>
                                <iframe src={video?.video_url} title={video?.title} frameborder="0"></iframe>
                                <h5 className="mb-2 px-6 pt-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{video?.title}</h5>
                                <p className="mb-3 px-6 pt-2 font-normal text-gray-700 dark:text-gray-400">{video?.description}</p>
                            </div>
                        ))}
                        </> : <>
                            {videos.map((video, index) => (
                                <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <iframe src={video?.video_url} title={video?.title} frameborder="0"></iframe>
                                    <h5 className="mb-2 px-6 pt-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{video?.title}</h5>
                                    <p className="mb-3 px-6 pt-2 font-normal text-gray-700 dark:text-gray-400">{video?.description}</p>
                                </div>
                            ))}
                        </>}
                    </> : <>
                        <p className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            No videos found for you.
                        </p>
                    </> }
                </div>
            </section>
        </div>
    )
}
