import React from 'react'
import { Outlet } from 'react-router-dom'

export default function SecondaryLayout() {

    return (
        <div>
            {/* main content */}
            <Outlet />
        </div>
    )
}
