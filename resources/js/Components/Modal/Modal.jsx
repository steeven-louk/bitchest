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

ChartJS.register(LineElement,LinearScale,PointElement
, CategoryScale)

export const ModalComponent = ({openModal, btnText, handleCancel,crypto}, ) => {

  const [CryptoCotation, setCryptoCotation] = useState();
  const [gainMessage, setGainMessage] = useState('');
  const [cotationOfToday,setCotationOfToday] = useState();
  

  const cryptoName = crypto?.name;
  const cotation = crypto?.cotation;
  const gain = cotation + cotationOfToday


  const getCotationFor = async()=>{
   try {
    const data = await axios.get("http://localhost:8000/api/get-crypto/" + cryptoName);
    setCotationOfToday(data.data.cotation);
    setCryptoCotation(data)
   } catch (error) {
    console.log('error', error)
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

  const getCotation = CryptoCotation?.data?.response?.map((item)=>item.cotation )
  const labels = CryptoCotation?.data?.response?.map((item)=>item.date);


  const chartData = {
        labels: labels,
        datasets: [
            {
                label: cryptoName,
                data: getCotation,
                borderColor: 'red',
                backgroundColor: ['green','blue'],
                fill: true,
                tension: 0.1
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
              <Button>
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
