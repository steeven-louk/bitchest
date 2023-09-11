import { getHistory } from "../../services/ApiFunction";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CryptoHistory = () => {
    const [history, setHistory] = useState([]);
    const user_id = useSelector((state) => state.user?.userData?.id);

    useEffect(async () => {
        await getHistory(setHistory, user_id);
    }, []);


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
            render: (_, record) => (
                <span>{record?.price} €</span>
            ),
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
    const dataSource = history;

    return (
        <div>
            <Table
                rowKey={(record) => record?.id}
                dataSource={dataSource}
                columns={columns}
            />
            ;
        </div>
    );
};

export default CryptoHistory;
