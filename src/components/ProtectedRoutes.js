import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function ProtectedRoutes() {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const authCheker = () => {
        if (token) return <Outlet />
        return navigate('/login')
    }

    return (
        //  authCheker()
        <></>
    )
}
