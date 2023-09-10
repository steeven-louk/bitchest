import { ModalComponent } from '../../Components/Modal/Modal';
import { Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Cryptos = () => {
    const [crypto, setCrypto] = useState([]);
    const [cryptoData, setCryptoData] = useState();
    const [openModal, setOpenModal] = useState(false);
    const user_id = useSelector(state => state?.user?.userData?.id);
    const userRole = useSelector(state => state.user?.userData?.status);

    const dataSource = crypto;

    const showModal = (item) => {
      setOpenModal(true);
      setCryptoData(item);
      // console.log('itemBuy', item);
    };
    const handleCancel = () => {
      setOpenModal(false);
      setCryptoData("");
    };
console.log('crypto buy', crypto)
    const getCrypto = async()=>{
        try {
          const data = await axios.get("http://localhost:8000/api/get-currencies");
          if(data.status === 200) setCrypto(data.data);
        console.log(data)
        } catch (error) {
          console.log(error)
        }
      }


      const buyUserCrypto = async(item)=>{
        console.log('buy2', item)
        const quantity = 10.00;
        const price = item.cotation * quantity;
        // let user_id = 2;
        // let cryptocurrency_id = item.id;
        const data ={
          // user_id: user_id,
          // cryptocurrency_id: cryptocurrency_id,
          name: item.name,
          logo: item.logo,
          cotation: item.cotation,
          price: price,
          quantity: quantity,
        };
    
        try {
          const response = await axios.post("http://localhost:8000/api/buy-crypto/"+ user_id, data);
    
          console.log('data-buy', response);
          toast(response.data.message);
        } catch (error) {
          console.log('error', error)
        }
      }

      const columns = [
        {
          title: 'id',
          dataIndex: 'id',
          rowScope: 'row',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Cotation',
          dataIndex: 'cotation',
          key: 'cotation',
        },
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
         
          render:(_, record) => (
              <Space size="middle" className='gap-3'>
                <a className='text-white p-2 rounded-md bg-green-800' onClick={()=>showModal(record)}>view </a>
               {userRole === "user" && <a className='text-white p-2 rounded-md bg-blue-800' onClick={()=>buyUserCrypto(record)}>buy</a>}
              </Space>
            )
        },
      ];


      useEffect(() => {
        getCrypto();
      }, []);

  return (
    <>
      <Table rowKey={(record)=> record.id} dataSource={dataSource} columns={columns} />
      <ModalComponent openModal={openModal} handleCancel={handleCancel} crypto={cryptoData} btnText="buy" />
    </>
  )
}

export default Cryptos