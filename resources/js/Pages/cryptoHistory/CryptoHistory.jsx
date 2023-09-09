import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CryptoHistory = () => {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const getHistory =async ()=>{
            try {
                const data = await axios.get('http://localhost:8000/api/get-cryptoHistory');
                if(data.status === 200){
                    setHistory(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getHistory();
    }, []);

    console.log('history',history);
    const columns = [
        {
          title: 'id',
          dataIndex: 'id',
          rowScope: 'row',
        },
        {
          title: 'Name',
          dataIndex: 'crypto_name',
          key: 'name',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'Transaction',
          dataIndex: 'transaction_type',
          key: 'transaction_type',
          render:(_, record) => (
            <span className={`p-2 px-2 uppercase text-white text-center font-bold rounded-sm ${record.transaction_type === "sell" ? "bg-red-800": "bg-green-800"}`}>{record.transaction_type}</span>
          )
        },
       
      ];
      
      const dataSource = history

  return (
    <div>
        <Table rowKey={(record)=> record.id} dataSource={dataSource} columns={columns} />;
    </div>
  )
}

export default CryptoHistory 