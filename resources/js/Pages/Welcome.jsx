import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Login from './Auth/Login';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />     
            <Login />
        </>
    );
}
