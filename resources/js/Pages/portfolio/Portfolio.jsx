import Item from 'antd/es/list/Item';
import React, { useEffect, useState } from 'react'

const Portfolio = () => {

  const [userWallet, setUserWallet] = useState([]);
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
useEffect(() => {
  getUserWallets();
}, [id])

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
      <tr key={item.id}>
      <td>{item.id}</td>
      <td><img src={`assets/${item.cryptocurrency.logo}.png`} alt={`logo ${item.cryptocurrency.name}`}/> {item.cryptocurrency.name}</td>
      <td className='capitalize text-start'>{item.cryptocurrency.cotation} $</td>
      <td className='font-semibold'>{item.quantity}</td>
      <td><span className='text-red-800 font-semibold cursor-pointer'>sell</span></td>
    </tr>
    ))}

  </tbody>
</table>
    </>
  )
}

export default Portfolio