import React, { useEffect, useState } from "react";

import axios from "axios";
import { ModalComponent } from "../../Components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { getUserWallets, sellUserCrypto } from "../../services/ApiFunction";

const Portfolio = () => {
    const [userWallet, setUserWallet] = useState([null]);
    const [cryptoData, setCryptoData] = useState();
    const [openModal, setOpenModal] = useState(false);
    console.log("userWallet", userWallet);
    const user_id = useSelector((state) => state.user?.userData?.id);

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
            <table className="table w-[100%] hover:border-collapse">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>price</th>
                        <th>cotation</th>
                        <th>quantity</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {userWallet?.map((item, index) => (
                        <>
                            <tr key={item?.id}>
                                <td>{index + 1}</td>
                                <td className=" align-baseline inline-flex gap-3">
                                    <img
                                        src={`assets/${item?.logo}.png`}
                                        alt={`logo ${item?.name}`}
                                    />{" "}
                                    {item?.name}
                                </td>
                                <td className="capitalize">{item?.price} $</td>
                                <td className="capitalize">
                                    {item?.cotation} $
                                </td>
                                <td className="font-semibold">
                                    {item?.quantity}
                                </td>
                                <td className="flex gap-3 text-center">
                                    <span
                                        onClick={() => sellCrypto(item)}
                                        className="text-white bg-green-800 rounded-md font-semibold p-2 cursor-pointer"
                                    >
                                        sell
                                    </span>
                                    <span
                                        onClick={() => showModal(item)}
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
            </table>
        </>
    );
};

export default Portfolio;
