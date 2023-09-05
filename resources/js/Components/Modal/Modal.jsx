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

  const cryptoName = crypto?.cryptocurrency?.name;

const getCotationFor = async()=>{
   try {
    const data = await axios.get("http://localhost:8000/api/get-crypto/" + cryptoName);

    setCryptoCotation(data)
   } catch (error) {
    console.log('error', error)
   }
  }

  useEffect(() => {
    getCotationFor();
  }, [cryptoName]);

  const testtt = CryptoCotation?.data?.response?.map((item)=>item.cotation )
  const labels = CryptoCotation?.data?.response?.map((item)=>item.date);


  const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'test',
                data: testtt,
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
            open={openModal}
            // title={crypto.cryptocurrency}
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
           {/* <Line data={chartData} className='w-[100%]' />
            */}
            <h5>fdf</h5>
            <Line data={chartData} />
          </Modal>
    </>
  )
}
