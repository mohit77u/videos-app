import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header({user}) {
    const [mobileMenu, setMobileMenu] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()

    const Logout = () => {
        sessionStorage.removeItem('token');
        navigate('/sign-in');
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        if(token) {
            setLoggedIn(true);
        }
    }, [user])

    return (
        <>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-sm">
                <div className="container lg:w-10/12 w-full px-2 flex flex-wrap items-center justify-between mx-auto">
                    <Link to="/" className="flex items-center">
                        <img src="/video-icon.png" className="max-w-[70px]" alt="Logo" />
                    </Link>
                    {/* dropdown menu */}
                    <div className="flex items-center md:order-2 relative">
                        <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={() => {setDropdown(!dropdown)}}>
                            <span className="sr-only">Open user menu</span>
                            <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="user-icon" />
                        </button>
                        {dropdown && (
                            <div className="z-50 absolute right-0 top-full min-w-[200px] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 dark:text-white">{user.name}</span>
                                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{user.phone_number}</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button" onClick={() => {setDropdown(false)}}>
                                    <li>
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/upload-video" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Upload Video</Link>
                                    </li>
                                    <li>
                                        <Link to="/my-videos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Videos</Link>
                                    </li>
                                    {loggedIn ? <>
                                        <li>
                                            <span className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => {Logout()}}>Sign out</span>
                                        </li>
                                    </> : <>
                                        <li>
                                            <Link to="/sign-in" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign In</Link>
                                        </li>
                                        <li>
                                            <Link to="/sign-up" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign UP</Link>
                                        </li>
                                    </>}
                                </ul>
                            </div>
                        )}
                        {/* menu toggle */}
                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false" onClick={(e) => setMobileMenu(!mobileMenu)}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="menu items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700" onClick={() => {setDropdown(false)}}>
                            <li>
                                <Link to="/" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
                            </li>
                            <li>
                                <Link to="/upload-video" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Upload Video</Link>
                            </li>
                            <li>
                                <Link to="/profile" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</Link>
                            </li>
                            <li>
                                <Link to="/my-videos" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Videos</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {mobileMenu && (
                    <div className="mobile-menu fixed w-[300px] bg-slate-900 h-full top-0 left-0 z-50" id="mobile-menu-2">
                        <button onClick={(e) => setMobileMenu(false)} className='absolute right-6 top-3 z-50 text-white text-2xl'>&times;</button>
                        <ul className="flex flex-col py-12" onClick={(e) => setMobileMenu(false)}>
                            <li>
                                <Link to="/" className="block py-2 px-4 text-gray-400 hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700">Home</Link>
                            </li>
                            <li>
                                <Link to="/upload-video" className="block py-2 px-4 text-gray-400 hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700">Upload Video</Link>
                            </li>
                            <li>
                                <Link to="/profile" className="block py-2 px-4 text-gray-400 hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700">Profile</Link>
                            </li>
                            <li>
                                <Link to="/my-videos" className="block py-2 px-4 text-gray-400 hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700">My Videos</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>


        </>
    )
}
