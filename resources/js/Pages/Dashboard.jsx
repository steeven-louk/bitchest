import React from 'react';
import Authenticated from '../Layouts/Authenticated';
// import { Head } from '@inertiajs/inertia-react';
import DashboardLayout from '../Layouts/DashboardLayout';
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
export default function Dashboard(props) {

    const role = useSelector(state => state.user?.userInfo?.userData?.status);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
    <Routes>
        <Route path="/" exact element={<DashboardLayout/>}>
            <Route  path="/dashboard" element={<Home/>} />

            <Route path="cryptocurrencies" element={<Cryptos/>} />
            {role === "client" &&  <Route path="portfolio" element={<Portfolio/>} />}
           
            <Route path="profile" element={<Profile/>} />
            {role === "admin" &&  <Route path="user-management" element={<UserManagement/>}/>}
            <Route path="crypto-history" element={<CryptoHistory />} />
        </Route>
    </Routes>

            <ToastContainer />
        </Authenticated>
    );
}
