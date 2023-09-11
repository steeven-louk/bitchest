import React from "react";

import Authenticated from "./Layouts/Authenticated";
import DashboardLayout from "./Layouts/DashboardLayout";

import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import Portfolio from "./portfolio/Portfolio";
import UserManagement from "./admin/UserManagement";
import Cryptos from "./cryptocurrencies/Cryptos";
import CryptoHistory from "./cryptoHistory/CryptoHistory";
import Profile from "./user/Profile";
import CreateUser from "./admin/CreateUser";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { useSelector } from "react-redux";

export default function Dashboard(props) {
    const role = useSelector((state) => state.user?.userData?.status);
    
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <DashboardLayout>
                <Routes>
                    <Route exact path="/dashboard" element={<Home />} />

                    <Route path="cryptocurrencies" element={<Cryptos />} />
                    {role === "user" && (
                        <Route path="portfolio" element={<Portfolio />} />
                    )}

                    <Route path="profile" element={<Profile />} />
                    {role === "admin" && (
                        <Route
                            path="user-management"
                            element={<UserManagement />}
                        />
                    )}
                    {role === "admin" && (
                        <Route path="create-user" element={<CreateUser />} />
                    )}
                    {role === "user" && (
                        <Route
                            path="crypto-history"
                            element={<CryptoHistory />}
                        />
                    )}
                </Routes>
            </DashboardLayout>

            <ToastContainer />
        </Authenticated>
    );
}
