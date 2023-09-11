import React, { useEffect, useState } from "react";

import { ModalComponent } from "../../Components/Modal/Modal";
import { useSelector } from "react-redux";

import { getUserWallets, sellUserCrypto } from "../../services/ApiFunction";
import { Space, Table } from "antd";

const Portfolio = () => {
    const [userWallet, setUserWallet] = useState();
    const [cryptoData, setCryptoData] = useState();
    const [openModal, setOpenModal] = useState(false);

    const user_id = useSelector((state) => state?.user?.userData?.id);

    const dataSource = userWallet;

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

    const columns = [
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
                    <a
                        className="text-white bg-green-800 rounded-md font-semibold p-2 cursor-pointer"
                        onClick={() => sellCrypto(record)}
                    >
                        sell
                    </a>
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

    return (
        <>
            <Table
                rowKey={(record) => record.id}
                dataSource={dataSource}
                columns={columns}
            />
            <ModalComponent
                openModal={openModal}
                handleCancel={handleCancel}
                crypto={cryptoData}
                btnText="sell"
            />
        </>
    );
};

export default Portfolio;
