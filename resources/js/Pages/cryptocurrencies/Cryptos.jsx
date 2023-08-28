import React, { useEffect, useState } from 'react'

const Cryptos = () => {
  const [crypto, setCrypto] = useState([]);
console.log("crypto", crypto);
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
        // const price = item.cryptocurrency.cotation * item.quantity;
        let user_id = 2;
        let cryptocurrency_id = item.id;
        const data ={
          user_id: user_id,
          cryptocurrency_id: cryptocurrency_id,
        //   price: price,
          quantity: 10.00,
        };
    
        try {
          const response = await axios.post("http://localhost:8000/api/payer-crypto", data);
    
          console.log('data-buy', response);
        } catch (error) {
          console.log('error', error)
        }
      }


      useEffect(() => {
        getCrypto();
      }, []);

  return (
    <table className="table table-hover w-[100%] table-inverse table-responsive">
        <thead className="thead-inverse">
            <tr>
                <th>#</th>
                <th>name</th>
                <th>cotation</th>
                <th colSpan={2}>action</th>
            </tr>
            </thead>
            <tbody>
               {crypto?.map((item)=>(
                <tr key={item.id}>
                    <td scope="row">{item.id}</td>
                    <td>
                        <img src={`assets/${item.logo}.png`} alt={item.name} className=' object-cover' />
                        {item.name}
                    </td>
                    <td scope="row">{item.cotation}</td>

                    <td className='btn-group inline-flex gap-2'>
                        <button className="text-white p-1 rounded-md bg-green-500">view</button>
                        <button onClick={()=>buyUserCrypto(item)} className="text-white p-1 rounded-md bg-blue-800">payer</button>
                    </td>
                </tr>
               ))}
                
            </tbody>
    </table>
  )
}

export default Cryptos