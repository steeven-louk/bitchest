import { buyUserCrypto, getCrypto } from "../../services/ApiFunction";
import { ModalComponent } from "../../Components/Modal/Modal";
import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cryptos = () => {
    const [crypto, setCrypto] = useState([]);
    const [cryptoData, setCryptoData] = useState();
    const [openModal, setOpenModal] = useState(false);
    const user_id = useSelector((state) => state?.user?.userData?.id);
    const userRole = useSelector((state) => state.user?.userData?.status);

    const dataSource = crypto;

    const showModal = (item) => {
        setOpenModal(true);
        setCryptoData(item);
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCryptoData("");
    };

    const buyCrypto = async (item) => {
        await buyUserCrypto(item, user_id);
    };

    useEffect(async () => {
        await getCrypto(setCrypto);
    }, []);

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
        },
        {
            title: "Cotation",
            dataIndex: "cotation",
            key: "cotation",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",

            render: (_, record) => (
                <Space size="middle" className="gap-3">
                    <a
                        className="text-white p-2 rounded-md bg-green-800"
                        onClick={() => showModal(record)}
                    >
                        view{" "}
                    </a>
                    {userRole === "user" && (
                        <a
                            className="text-white p-2 rounded-md bg-blue-800"
                            onClick={() => buyCrypto(record)}
                        >
                            buy
                        </a>
                    )}
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
                btnText="buy"
            />
        </>
    );
};

export default Cryptos;
