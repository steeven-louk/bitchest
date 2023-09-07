
import React, { useEffect, useState } from 'react'

import { Card } from 'antd';
import axios from 'axios';
import CryptoChart from '../Components/CryptoCharts/CryptoChart';

const Home = () => {

  const [crypto, setCrypto] = useState([]);
  const [T, setT] = useState([]);


  const getCrypto = async()=>{
    try {
      const data = await axios.get("http://localhost:8000/api/get-currencies");
      if(data.status === 200) setCrypto(data.data);
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  const cota = "bitcoin";
 

  const getCryptoT = async()=>{
    try {
      const {data} = await axios.get("http://localhost:8000/api/get-cotation/"+cota);
      setT(data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCryptoT();
getCrypto();
  }, [])

  console.log("dgdg",T)
  return (
    <>
      <div className="cryptoList flex gap-2 md:overflow-x-scroll ">

      {crypto?.map((item)=>(
        <Card  className='text-green-700 w-[350px] rounded-md' key={item.id}>
          <div className="gap-3 text-center font-bold">
            <div className="card-img">
              <img src={`assets/${item.logo}.png`} alt={item.name} className=' object-cover text-center' width="80%" />
            </div>
            <h5 className="capitalize">{item.name}</h5>
          </div>
        </Card>
      ))}
        
      </div>

      <article className='flex gap-2 mt-2'>

        <Card className="w-[100%]">
        <CryptoChart data={crypto}/>

        </Card>
      </article>
    </>
  )
}

export default Home