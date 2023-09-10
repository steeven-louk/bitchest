import React from 'react';
import Authenticated from './Layouts/Authenticated';
// import { Head } from '@inertiajs/inertia-react';
import DashboardLayout from './Layouts/DashboardLayout';
import { Route, Routes } from 'react-router-dom'
import Home from './Home';
import Portfolio from './portfolio/Portfolio';
import UserManagement from './admin/UserManagement';
import Cryptos from './cryptocurrencies/Cryptos';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CryptoHistory from './cryptoHistory/CryptoHistory';
import Profile from './user/Profile';
import { useSelector } from 'react-redux';
import CreateUser from './admin/CreateUser';


export default function Dashboard(props) {

    const role = useSelector(state => state.user?.userData?.status);
console.log('propsss', props);
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
    <DashboardLayout>
    <Routes>

            <Route exact path="/dashboard" element={<Home/>} />

            <Route path="cryptocurrencies" element={<Cryptos/>} />
            {role === "user" &&  <Route path="portfolio" element={<Portfolio/>} />}
           
            <Route path="profile" element={<Profile/>} />
            {role === "admin" &&  <Route path="user-management" element={<UserManagement/>}/>}
            {role === "user" &&  <Route path="create-user" element={<CreateUser/>}/>}
            <Route path="crypto-history" element={<CryptoHistory />} />
    </Routes>
    </DashboardLayout>

            <ToastContainer />
        </Authenticated>
    );
}
