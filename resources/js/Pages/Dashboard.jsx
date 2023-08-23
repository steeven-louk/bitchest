import React from 'react';
import Authenticated from '../Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import DashboardLayout from '../Layouts/DashboardLayout';
import { Route, Routes } from 'react-router-dom'
import Home from './Home';
import Portfolio from './portfolio/Portfolio';
import UserManagement from './admin/UserManagement';

export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
           <Routes>
        <Route path="/" exact element={<DashboardLayout/>}>
            <Route path="dashboard" element={<Home/>} />
            <Route path="portfolio" element={<Portfolio/>} />
            <Route path="user-management" element={<UserManagement/>} />
        </Route>
    </Routes>
    {/* <DashboardLayout>
        <Home />
        <UserManagement/>
    </DashboardLayout> */}
            
        </Authenticated>
    );
}
