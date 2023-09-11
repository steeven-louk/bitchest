import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
} from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { buyUserCrypto, sellUserCrypto } from '../../services/ApiFunction';

ChartJS.register(LineElement,LinearScale,PointElement
, CategoryScale)

export const ModalComponent = ({openModal, btnText, handleCancel,crypto}, ) => {

  const [CryptoCotation, setCryptoCotation] = useState();
  const [gainMessage, setGainMessage] = useState('');
  const [cotationOfToday,setCotationOfToday] = useState();
  const user_id = useSelector((state)=> state.user?.userData?.id)
  const role = useSelector((state)=> state.user?.userData?.status)
  

  const cryptoName = crypto?.name;
  const cotation = crypto?.cotation;
  const gain = cotation + cotationOfToday
  // console.log('crypto, crypto1', crypto?.price)
  // console.log('crypto, crypto2', parseFloat(crypto?.price) + 1720)

  const getCotationFor = async()=>{
   try {
    const data = await axios.get("http://localhost:8000/api/get-crypto/" + cryptoName);
    setCotationOfToday(data.data.cotation);
    setCryptoCotation(data)
   } catch (error) {
    console.log('error', error)
   }
  }

  const buyOrSellCrypto = async()=>{
    try {
      let cotationPrice = gain * crypto.quantity;
      let price =  parseFloat(crypto?.price) + cotationPrice;
      const item ={
        'id': crypto.id,
        'name':crypto.name,
        'cotation': gain,
        'logo': crypto.logo,
        'quantity': crypto.quantity,
        'price': price
      }
      if(btnText === "sell"){
       await sellUserCrypto(item,user_id)
       handleCancel();
      }else{
       await buyUserCrypto(item, user_id)
       handleCancel();

      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCotationFor();
  }, [cryptoName]);

  useEffect(()=>{
    if(gain < cotation){
      setGainMessage(`vous faites une moins value de ${gain}`)
    }else{
      setGainMessage(`vous faites une plus value de ${gain}`)

    }
  },[gain]);
  const filteredData = CryptoCotation?.data?.response?.filter(item => item?.cotation >= 0);
  const getCotation = filteredData.map((item)=>item.cotation )
  const labels = CryptoCotation?.data?.response?.map((item)=>item.date);


  const chartData = {
        labels: labels,
        datasets: [
            {
                label: cryptoName,
                data: getCotation,
                borderColor: 'green',
                backgroundColor: ['red','blue'],
                fill: false,
                // tension: 0.1
            },
        ],
        options:{
            animation: true,
        }
      
    };

  return (
    <>
        <Modal
            className='w-[50em]'
            open={openModal}
            title={cryptoName}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>,
              <Button onClick={buyOrSellCrypto}>
                {btnText}
              </Button>
            ]}
          >
         
            <Line data={chartData} />

            <h2> {gainMessage} </h2>
          </Modal>
    </>
  )
}
