import { toast } from "react-toastify";
import Swal from "sweetalert2";

const API_URL = "http://localhost:8000/api"


export const getCrypto = async(setCrypto)=>{
    try {
      const data = await axios.get(`${API_URL}/get-currencies`);
      if(data.status === 200) setCrypto(data.data);
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

export const getUsers= async (setGetUser)=>{
    try {
      const data = await axios.get(`${API_URL}/admin/get-users`);
      if(data.status == 200) setGetUser(data?.data);
    // return data;
    } catch (error) {
      console.log(error)
    }
   }

  export const getHistory =async (setHistory, user_id)=>{
    try {
        const data = await axios.get(`${API_URL}/user/cryptoHistory/${user_id}`);
        if(data.status === 200){
            setHistory(data.data);
        }
    } catch (error) {
        console.log(error);
    }
}

 export const getUserWallets = async(setUserWallet, user_id)=>{
    try {
      const data = await axios.get(`${API_URL}/user/wallets/${user_id}`);
      if(data.status === 200) setUserWallet(data?.data);

    } catch (error) {
      console.log(error)
    }
  }

   export const deleteUser = async(id)=>{
  
    try {
  
      Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async(result) => {
  
    if (result.isConfirmed) {
      const data = await axios.delete(`${API_URL}/admin/get-users/${id}`);
  
      if(data.status === 200){
        // console.log("datasupp", data);
        Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
       await getUsers();
      }
     
    }
  });
} catch (error) {
        console.log(error)
      }
}


export const buyUserCrypto = async(item, user_id)=>{
    console.log('buy2', item)
    const quantity = 10.00;
    const price = item.cotation * quantity;

    const data ={
     
      name: item.name,
      logo: item.logo,
      cotation: item.cotation,
      price: price,
      quantity: quantity,
    };

    try {
      const response = await axios.post(`${API_URL}/buy-crypto/${user_id}`, data);

      console.log('data-buy', response);
      toast(response.data.message);
    } catch (error) {
      console.log('error', error)
    }
  }

 export const sellUserCrypto = async(item, user_id)=>{

    const data ={
      crypto_name: item.name,
      logo: item.logo,
      price: item.price,
      quantity: item.quantity,
      cotation: item.cotation,
    };

    try {
      const response = await axios.post(`${API_URL}/user/sell-crypto/${user_id}/${item.id}`, data);

      toast(response.data.message);
    } catch (error) {
      console.log('error', error)
    }
  }