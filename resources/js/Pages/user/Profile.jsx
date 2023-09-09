import axios from 'axios';
import { Button, Card, Form, Input, Radio, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { userAmount } from '../../redux/userSlice';
import { toast } from 'react-toastify';
import { ModalComponent } from '../../Components/Modal/Modal';
import { Head } from '@inertiajs/inertia-react';

const Profile = () => {

    const [history, setHistory] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const [userWallet, setUserWallet] = useState([]);
    const [cryptoData, setCryptoData] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [updateCard, setUpdateCard] = useState(false);

    useEffect(() => {
        const getHistory =async ()=>{
            try {
                const data = await axios.get('http://localhost:8000/api/get-cryptoHistory');
                if(data.status === 200){
                    setHistory(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getHistory();
    }, []);

    const handleUpdate =async()=>{

      try {
       await axios.put("http://localhost:8000/api/admin/get-users/" + userId,{
        name: name,
        email: email,
        status:role
        }).then(async(item)=>{
          if(item.status === 200){
            console.log('itemUpdate', item);
            setName('');
            setEmail('');
            setRole('');
            setOpenModal(false);
            toast(item.data.message);
            await getUsers();
    
          }
        });
      
      } catch (error) {
        console.log('error', error);
      }
    }
    
    const [form] = Form.useForm();
      const [formLayout, setFormLayout] = useState('vertical');
      const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
      };
      const formItemLayout =
        formLayout === 'horizontal'
          ? {
              labelCol: {
                span: 4,
              },
              wrapperCol: {
                span: 14,
              },
            }
          : null;
      const buttonItemLayout =
        formLayout === 'horizontal'
          ? {
              wrapperCol: {
                span: 14,
                offset: 4,
              },
            }
          : null;
    
    

    const columns = [
        {
          title: 'id',
          dataIndex: 'id',
          rowScope: 'row',
        },
        {
          title: 'Name',
          dataIndex: 'crypto_name',
          key: 'name',
        },
        {
          title: 'price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'quantity',
          dataIndex: 'quantity',
          key: 'quantity',
        },
       
      ];
      
      const dataSource = history;

    
      const user_id = useSelector(state => state.user?.userData?.id);
      const username = useSelector(state => state.user?.userData?.name);
      const userEmail = useSelector(state => state.user?.userData?.email);
      const userRole = useSelector(state => state.user?.userData?.status);

  
      
      const showModal = (item) => {
        setOpenModal(true);
        setCryptoData(item);
      };
      const handleCancel = () => {
        setOpenModal(false);
        setCryptoData("");
      };
      // const id = 2;
    
    
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
          const response = await axios.post("http://localhost:8000/api/sell-crypto/"+item.id, data);
    
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
    
    // useEffect(() => {
    //  //Calculate total portfolio value
    //  const totalValue = userWallet.reduce((total, wallet)=>{
    //   return total + (wallet.quantity * wallet.cryptocurrency.cotation)
    //  }, 0);
    //  dispatch(userAmount(totalValue));
    // }, [userWallet]);
    
    
  return (
   <>
    <Head title="profile" />

   <div className="profile h-[90vh] overflow-y-scroll">
      <Card className="mx-auto mb-5 justify-center text-center ">
        <img src="assets/cardano.png" alt={`profil-${username}`} className='w-20 h-20 mx-auto mb-3 rounded-full p-1 object-cover' />
        <h2>{username}</h2>
        <h4>{userEmail}</h4>

        <button type='button' onClick={()=> setUpdateCard(true)} className='bg-blue-800 rounded-md mt-4 text-white p-2 capitalize font-bold'>update profil</button>
      </Card>

      <Card title="UPDATE" className={`p-2 my-5 rounded-4 ${updateCard ? ' block' : ' '}`}>
      <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{
        layout: formLayout,
      }}
      onValuesChange={onFormLayoutChange}
      style={{
        maxWidth: formLayout === 'inline' ? 'none' : 600,
      }}
    >

        <Form.Item label="Name">
          <Input placeholder="Name" name='name' value={name} onChange={(e) => setName(e.target.value)} className='border-sm border-green-600 rounded-md' />
        </Form.Item>
        <Form.Item label="Email">
          <Input placeholder="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} type='email' className='border-sm border-green-600 rounded-md' />
        </Form.Item>
        <Form.Item label="Status">
          <Radio.Group name='status'>
            <Radio value="client" onChange={(e) => setRole(e.target.value)} className='font-bold'> Client </Radio>
            <Radio value="admin" onChange={(e) => setRole(e.target.value)} className='font-bold'> Admin </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="submit" onClick={handleUpdate} className='bg-blue-800 text-white'>Update</Button>
        </Form.Item>

</Form>
    </Card>

    {userRole === "user"  &&
   <>
   <Card title="TRANSACTION">
            <Table rowKey={(record) => record.id} dataSource={dataSource} columns={columns} />

          </Card><Card title="PORTFOLIO" className='mt-4'>
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
                  {userWallet?.map((item, index) => (
                    <>
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className=' align-baseline inline-flex gap-3'><img src={`assets/${item.cryptocurrency.logo}.png`} alt={`logo ${item.cryptocurrency.name}`} /> {item.cryptocurrency.name}</td>
                        <td className='capitalize'>{item.cryptocurrency.cotation} $</td>
                        <td className='font-semibold'>{item.quantity}</td>
                        <td className='flex gap-3 text-center'>
                          <span onClick={() => sellUserCrypto(item)} className='text-white bg-green-800 rounded-md font-semibold p-2 cursor-pointer'>sell</span>
                          <span onClick={()=> showModal(item)} className='text-white bg-blue-800 rounded-md font-semibold p-2 cursor-pointer'>view</span>
                        </td>
                      </tr>

                      <div>
                        <ModalComponent openModal={openModal} handleCancel={handleCancel} crypto={cryptoData} btnText="sell" />
                      </div></>
                  ))}

                </tbody>
              </table>
            </Card></>
    }
   </div>
      </>
  )
}

export default Profile