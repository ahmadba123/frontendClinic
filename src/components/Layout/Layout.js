import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../sideBar/sideBar';

function Layout() {
    return (
        <div><SideBar /><Outlet /></div>
    )
}

export default Layout