import React, { useEffect, useState } from "react";

import { Card } from "antd";
import CryptoChart from "../Components/CryptoCharts/CryptoChart";
import { getCrypto } from "../services/ApiFunction";

const Home = () => {
    const [crypto, setCrypto] = useState([]);

    useEffect(async () => {
        await getCrypto(setCrypto);
    }, []);

    return (
        <>
            <div className="cryptoList flex gap-2 md:overflow-x-scroll ">
                {crypto?.map((item) => (
                    <Card
                        className="text-green-700 w-[350px] rounded-md"
                        key={item.id}
                    >
                        <div className="gap-3 text-center font-bold">
                            <div className="card-img">
                                <img
                                    src={`assets/${item.logo}.png`}
                                    alt={item.name}
                                    className=" object-cover text-center"
                                    width="80%"
                                />
                            </div>
                            <h5 className="capitalize">{item.name}</h5>
                        </div>
                    </Card>
                ))}
            </div>

            <article className="w-full gap-2 mt-2">
                <Card>
                    <CryptoChart data={crypto} />
                </Card>
            </article>

            
        </>
    );
};

export default Home;
