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
          title: 'price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'quantity',
          dataIndex: 'quantity',
          key: 'quantity',
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