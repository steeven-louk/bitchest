import React, { useEffect, useState } from "react";

import { Card, Layout, Space, theme } from "antd";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import Sidebar from "../../Components/Sidebar";
import { getHistory } from "../../services/ApiFunction";
const { Header, Content, Sider } = Layout;

const DashboardLayout = ({ children }) => {
    const [history, setHistory] = useState([]);
    const username = useSelector((state) => state.user?.userData?.name);
    const userEmail = useSelector((state) => state.user?.userData?.email);
    const role = useSelector((state) => state.user?.userData?.status);
    const user_id = useSelector((state) => state.user?.userData?.id);

    const wallets = useSelector((state) => state?.user?.userData?.solde);

    useEffect(async () => {
        await getHistory(setHistory, user_id);
    }, []);

    const handleLogout = () => {
        try {
            Swal.fire({
                title: "LOGOUT",
                text: "You won't logout!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, log out!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.post("/logout");
                    window.location.reload();
                }
            });
        } catch (error) {
            toast(error.message);
            console.error("Erreur lors de la déconnexion :", error);
        }
    };

    return (
        <Layout className=" overflow-hidden overflow-y-hidden">
            <Sidebar
                role={role}
                wallets={wallets}
                handleLogout={handleLogout}
            />

            <Layout>
                <Header>
                    <h3 className="shadow capitalize text-white">
                        hello, {username}
                    </h3>
                </Header>
                <Content
                    style={{
                        margin: "20px 16px 0",
                        overflow: "hidden",
                    }}
                >
                    {children}
                </Content>
            </Layout>
            <Sider
                style={{ height: "100vh" }}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                className="mx-auto flex justify-center"
            >
                <Space direction="vertical" size={8} className=" translate-y-5">
                    <Card className="text-center justify-center p-0 flex flex-col">
                        <div className="card-head border-b-4 ">
                            <img
                                src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
                                alt="profil image"
                                className=" object-cover flex rounded-full w-20 h-20"
                            />
                        </div>
                        <p>{username}</p>
                        <small>
                            {userEmail ? userEmail : "attente@gmail.com"}
                        </small>
                    </Card>
                    {role === "user" && history.length > 0 && (
                        <Card title="Transactions">
                            <div className="flex flex-col gap-2">
                                {history?.slice(0, 5).map((crypto) => (
                                    <article className="flex align-baseline gap-1.5">
                                        <img
                                            src={`assets/${crypto.logo}.png`}
                                            alt="crypto"
                                            className=" w-[45px] object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <span>{crypto.crypto_name}</span>
                                            <span
                                                className={`font-bold ${
                                                    crypto.transaction_type ===
                                                    "sell"
                                                        ? "text-red-800"
                                                        : "text-green-800"
                                                }`}
                                            >
                                                {crypto.transaction_type}
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </Card>
                    )}
                </Space>
            </Sider>
        </Layout>
    );
};

export default DashboardLayout;
