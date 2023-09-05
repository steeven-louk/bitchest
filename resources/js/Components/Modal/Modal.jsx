import React from 'react'
import { Button, Modal } from 'antd'
import { Line } from 'react-chartjs-2';

export const ModalComponent = ({openModal, btnText, handleCancel, crypto}) => {
 console.log('cryptoModel', crypto.cryptocurrency)
  // const {id, cotation, logo, name} = crypto.cryptocurrency;
  // const chartData = {
  //       labels: crypto.cryptocurrency.name,
  //       datasets: [
  //           {
  //               label:crypto.cryptocurrency.name,
  //               data: [12,55,2,4,2],
  //               // data: data.map((item)=>item.cotation),
  //               borderColor: 'red',
  //               backgroundColor: ['green','blue'],
  //               fill: true,
  //               tension: 0.1

  //           },
  //       ],
  //       options:{
  //           animation: true,
  //       }
      
  //   };
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
          </Modal>
    </>
  )
}
