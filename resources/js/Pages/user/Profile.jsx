import axios from "axios";
import { Button, Card, Form, Input, Radio, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { ModalComponent } from "../../Components/Modal/Modal";
import { Head } from "@inertiajs/inertia-react";
import {
    getHistory,
    getUserWallets,
    sellUserCrypto,
} from "../../services/ApiFunction";


const Profile = () => {

    const [history, setHistory] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [userWallet, setUserWallet] = useState([]);
    const [cryptoData, setCryptoData] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [role, setRole] = useState("");

    const user_id = useSelector((state) => state.user?.userData?.id);
    const username = useSelector((state) => state.user?.userData?.name);
    const userEmail = useSelector((state) => state.user?.userData?.email);
    const userRole = useSelector((state) => state.user?.userData?.status);

    const dataSource = history;
    const dataUserWalletSource = userWallet;

    useEffect(async () => {
        await getHistory(setHistory, user_id);
    }, []);

    const handleUpdate = async () => {
        try {
            await axios
                .put("http://localhost:8000/api/admin/get-users/" + user_id, {
                    name: name,
                    email: email,
                    status: role,
                })
                .then(async (item) => {
                    if (item.status === 200) {
                        setName("");
                        setEmail("");
                        setRole("");
                        setOpenModal(false);
                        toast(item.data.message);
                    }
                });
        } catch (error) {
            console.log("error", error);
        }
    };

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState("vertical");
    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };
    const formItemLayout =
        formLayout === "horizontal"
            ? {
                  labelCol: {
                      span: 4,
                  },
                  wrapperCol: {
                      span: 14,
                  },
              }
            : null;
    const buttonItemLayout =
        formLayout === "horizontal"
            ? {
                  wrapperCol: {
                      span: 14,
                      offset: 4,
                  },
              }
            : null;

    const columns = [
        {
            title: "id",
            dataIndex: "id",
            rowScope: "row",
        },
        {
            title: "Name",
            dataIndex: "crypto_name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (_, record) => <span>{record?.price} €</span>,
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Transaction",
            dataIndex: "transaction_type",
            key: "transaction_type",
            render: (_, record) => (
                <span
                    className={`p-2 px-2 uppercase text-white text-center font-bold rounded-sm ${
                        record?.transaction_type === "sell"
                            ? "bg-red-800"
                            : "bg-green-800"
                    }`}
                >
                    {record?.transaction_type}
                </span>
            ),
        },
    ];

    const portfolioColumns = [
        {
            title: "id",
            dataIndex: "id",
            rowScope: "row",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (_, record) => (
                <div className="flex gap-2">
                    <img
                        src={`assets/${record?.logo}.png`}
                        alt={record?.name}
                    />
                    <span>{record?.name}</span>
                </div>
            ),
        },
        {
            title: "Cotation",
            dataIndex: "cotation",
            key: "cotation",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",

            render: (_, record) => (
                <Space size="middle" className="gap-3">
                    <a className="text-white bg-green-800 rounded-md font-semibold p-2 cursor-pointer" onClick={() => sellCrypto(record)} > sell</a>
                    <a
                        className="text-white bg-blue-800 rounded-md font-semibold p-2 cursor-pointer"
                        onClick={() => showModal(record)}
                    >
                        view
                    </a>
                   
                </Space>
            ),
        },
    ];

    const showModal = (item) => {
        setOpenModal(true);
        setCryptoData(item);
    };
    const handleCancel = () => {
        setOpenModal(false);
        setCryptoData("");
    };

    const sellCrypto = async (item) => {
        await sellUserCrypto(item, user_id);
        await getUserWallets(setUserWallet, user_id);
    };

    useEffect(async () => {
        await getUserWallets(setUserWallet, user_id);
    }, [user_id, setUserWallet]);

    return (
        <>
            <Head title="profile" />

            <div className="profile h-[90vh] overflow-y-scroll">
                <Card className="mx-auto mb-5 justify-center text-center ">
                    <img
                        src="assets/cardano.png"
                        alt={`profil-${username}`}
                        className="w-20 h-20 mx-auto mb-3 rounded-full p-1 object-cover"
                    />
                    <h2>{username}</h2>
                    <h4>{userEmail}</h4>
                </Card>

                <Card title="UPDATE" className="p-2 my-5 rounded-4 block">
                    <Form
                        {...formItemLayout}
                        layout={formLayout}
                        form={form}
                        initialValues={{
                            layout: formLayout,
                        }}
                        onValuesChange={onFormLayoutChange}
                        style={{
                            maxWidth: formLayout === "inline" ? "none" : 600,
                        }}
                    >
                        <Form.Item label="Name">
                            <Input
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border-sm border-green-600 rounded-md"
                            />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input
                                placeholder="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="border-sm border-green-600 rounded-md"
                            />
                        </Form.Item>
                        <Form.Item label="Status">
                            <Radio.Group name="status">
                                {userRole === "user" ? (
                                    <Radio
                                        value="user"
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                        className="font-bold"
                                        defaultChecked={true}
                                    >
                                        {" "}
                                        User{" "}
                                    </Radio>
                                ) : (
                                    <Radio
                                        value="admin"
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                        className="font-bold"
                                        defaultChecked={true}
                                    >
                                        {" "}
                                        Admin{" "}
                                    </Radio>
                                )}
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button
                                type="submit"
                                onClick={handleUpdate}
                                className="bg-blue-800 text-white"
                            >
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                {userRole === "user" && (
                    <>
                        <Card title="TRANSACTION">
                            <Table
                                rowKey={(record) => record.id}
                                dataSource={dataSource}
                                columns={columns}
                            />
                        </Card>
                        <Card title="PORTFOLIO" className="mt-4">
                            {/* <table className="table w-[100%] hover:border-collapse">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>name</th>
                                        <th>cotation</th>
                                        <th>quantity</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {userWallet?.map((item, index) => (
                                        <>
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td className=" align-baseline inline-flex gap-3">
                                                    <img
                                                        src={`assets/${item?.logo}.png`}
                                                        alt={`logo ${item?.name}`}
                                                    />{" "}
                                                    {item?.name}
                                                </td>
                                                <td className="capitalize">
                                                    {item?.cotation} $
                                                </td>
                                                <td className="font-semibold">
                                                    {item.quantity}
                                                </td>
                                                <td className="flex gap-3 text-center">
                                                    <span
                                                        onClick={() =>
                                                            sellCrypto(item)
                                                        }
                                                        className="text-white bg-green-800 rounded-md font-semibold p-2 cursor-pointer"
                                                    >
                                                        sell
                                                    </span>
                                                    <span
                                                        onClick={() =>
                                                            showModal(item)
                                                        }
                                                        className="text-white bg-blue-800 rounded-md font-semibold p-2 cursor-pointer"
                                                    >
                                                        view
                                                    </span>
                                                </td>
                                            </tr>

                                            <div>
                                                <ModalComponent
                                                    openModal={openModal}
                                                    handleCancel={handleCancel}
                                                    crypto={cryptoData}
                                                    btnText="sell"
                                                />
                                            </div>
                                        </>
                                    ))}
                                </tbody>
                            </table> */}
                            <Table
                                rowKey={(record) => record.id}
                                dataSource={dataUserWalletSource}
                                columns={portfolioColumns}
                            />
                                        <ModalComponent
                openModal={openModal}
                handleCancel={handleCancel}
                crypto={cryptoData}
                btnText="sell"
            />
                        </Card>
                    </>
                )}
            </div>
        </>
    );
};

export default Profile;
