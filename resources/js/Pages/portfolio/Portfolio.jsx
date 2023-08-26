
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'

const Portfolio = () => {

  const [userWallet, setUserWallet] = useState([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState();
  const [openModal, setOpenModal] = useState(false);
  
  const showModal = () => {
    setOpenModal(true);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const id = 2;

  const getUserWallets = async()=>{
    try {
      const data = await axios.get("http://localhost:8000/api/get-wallets/"+id);
      if(data.status === 200) setUserWallet(data.data);
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }


  const sellUserCrypto = async(item)=>{
    console.log('item',item);
  }

  console.log('userWallet', userWallet)

useEffect(() => {
  getUserWallets();
}, [id]);

useEffect(() => {
 //Calculate total portfolio value
 const totalValue = userWallet.reduce((total, wallet)=>{
  return total + (wallet.quantity * wallet.cryptocurrency.cotation)
 }, 0);
 setTotalPortfolioValue(totalValue);
}, [userWallet])

  return (
    <>
      <table className="table w-[100%] hover:border-collapse">
  <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>cotation</th>
      <th>quantity</th>
      <th>action </th>
    </tr>
  </thead>
  <tbody className='text-center'>
    {userWallet?.map((item)=>(
      <><tr key={item.id}>
        <td>{item.id}</td>
        <td className=' align-middle flex'><img src={`assets/${item.cryptocurrency.logo}.png`} alt={`logo ${item.cryptocurrency.name}`} /> {item.cryptocurrency.name}</td>
        <td className='capitalize'>{item.cryptocurrency.cotation} $</td>
        <td className='font-semibold'>{item.quantity}</td>
        <td>
          <span onClick={()=>sellUserCrypto(item)} className='text-red-800 font-semibold cursor-pointer'>sell</span>
          <span onClick={showModal} className='text-red-800 font-semibold cursor-pointer'>view</span>
        </td>
      </tr><div>
          <Modal
            open={openModal}
            title="update user"
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>,
            ]}
          >
            <span>test</span>
          </Modal>
        </div></>
    ))}
    <span className='font-bold'>{totalPortfolioValue} $</span>

  </tbody>
</table>


    </>
  )
}

export default Portfolio