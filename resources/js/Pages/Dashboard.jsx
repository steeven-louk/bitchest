import React from 'react';
import Authenticated from '../Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import DashboardLayout from '../Layouts/DashboardLayout';

export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
           <DashboardLayout/>

            
        </Authenticated>
    );
}
