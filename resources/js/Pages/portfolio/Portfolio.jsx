
import React, { useEffect, useState } from 'react'
// import { Button } from 'antd'
import axios from 'axios';
import { ModalComponent } from '../../Components/Modal/Modal';
import { useDispatch } from 'react-redux';
import { userAmount } from '../../redux/userSlice';

const Portfolio = () => {

  const [userWallet, setUserWallet] = useState([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState();
  const [cryptoData, setCryptoData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  
  
  const showModal = (item) => {
    setOpenModal(true);
    setCryptoData(item);
    console.log('itemModal', item)
  };
  const handleCancel = () => {
    setOpenModal(false);
    setCryptoData(null);
  };
  const id = 2;

  console.log('cryptollll', cryptoData)

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
    const price = item.cryptocurrency.cotation * item.quantity;

    const data ={
      // id: item.id,
      crypto_name: item.cryptocurrency.name,
      logo: item.cryptocurrency.logo,
      price: price,
      quantity: item.quantity,
      cotation: item.cryptocurrency.cotation,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/sell-crypto/"+item.id, data);

      console.log('data', response);
      await getUserWallets();
    } catch (error) {
      console.log('error', error)
    }
  }

  // console.log('userWallet', userWallet)
const dispatch = useDispatch();
useEffect(() => {
  getUserWallets();
}, [id]);

useEffect(() => {
 //Calculate total portfolio value
 const totalValue = userWallet.reduce((total, wallet)=>{
  return total + (wallet.quantity * wallet.cryptocurrency.cotation)
 }, 0);
 dispatch(userAmount(totalValue));
 setTotalPortfolioValue(totalValue);
}, [userWallet]);



  return (
    <>
      <table className="table w-[100%] hover:border-collapse">
  <thead>
    <tr>
      <th>#</th>
      <th>name</th>
      <th>cotation</th>
      <th>quantity</th>
      <th>action</th>
    </tr>
  </thead>
  <tbody className='text-center'>
    {userWallet?.map((item, index)=>(
      <><tr key={item?.id}>
        <td>{index +1}</td>
        <td className=' align-baseline inline-flex gap-3'><img src={`assets/${item.cryptocurrency.logo}.png`} alt={`logo ${item.cryptocurrency.name}`} /> {item.cryptocurrency.name}</td>
        <td className='capitalize'>{item.cryptocurrency.cotation} $</td>
        <td className='font-semibold'>{item.quantity}</td>
        <td>
          <span onClick={()=>sellUserCrypto(item)} className='text-red-800 font-semibold cursor-pointer'>sell</span>
          <span onClick={()=>showModal(item)} className='text-red-800 font-semibold cursor-pointer'>view</span>
        </td>
      </tr><div>
          {/* <Modal
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
          </Modal> */}

          <ModalComponent openModal={openModal} handleCancel={handleCancel} crypto={cryptoData} btnText="sell" />
        </div></>
    ))}
    <span className='font-bold'>{totalPortfolioValue} $</span>

  </tbody>
</table>


    </>
  )
}

export default Portfolio