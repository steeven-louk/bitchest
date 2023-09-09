
import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { ModalComponent } from '../../Components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { userAmount } from '../../redux/userSlice';
import { toast } from 'react-toastify';


const Portfolio = () => {

  const [userWallet, setUserWallet] = useState([]);
  const [cryptoData, setCryptoData] = useState();
  const [openModal, setOpenModal] = useState(false);

  const user_id = useSelector(state => state.user?.userInfo?.userData?.id);
  
  const showModal = (item) => {
    setOpenModal(true);
    setCryptoData(item);
  };
  const handleCancel = () => {
    setOpenModal(false);
    setCryptoData("");
  };



  const getUserWallets = async()=>{
    try {
      const data = await axios.get("http://localhost:8000/api/get-wallets/"+ user_id);
      if(data.status === 200) setUserWallet(data.data);
    // console.log(data)
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
      const response = await axios.post("http://localhost:8000/api/sell-crypto/"+user_id+'/'+item.id, data);

      console.log('data', response);
      toast(response.data.message);
      await getUserWallets();
    } catch (error) {
      console.log('error', error)
    }
  }

const dispatch = useDispatch();
useEffect(() => {
  getUserWallets();
}, [user_id]);

useEffect(() => {
 //Calculate total portfolio value
 const totalValue = userWallet.reduce((total, wallet)=>{
  return total + (wallet.quantity * wallet.cryptocurrency.cotation)
 }, 0);
 dispatch(userAmount(totalValue));
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
        <td className='flex gap-3 text-center'>
          <span onClick={()=>sellUserCrypto(item)} className='text-white bg-green-800 rounded-md font-semibold p-2 cursor-pointer'>sell</span>
          <span onClick={()=>showModal(item)} className='text-white bg-blue-800 rounded-md font-semibold p-2 cursor-pointer'>view</span>
        </td>
      </tr>
      
      <div>
          <ModalComponent openModal={openModal} handleCancel={handleCancel} crypto={cryptoData} btnText="sell" />
      </div></>
    ))}

  </tbody>
</table>


    </>
  )
}

export default Portfolio