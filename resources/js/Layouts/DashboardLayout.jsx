import React, { useEffect, useState } from 'react'


import { Card, Layout, Space, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const { Header, Content, Sider } = Layout;

const DashboardLayout = () => {

  const username = useSelector((state)=> state.user?.userInfo?.userData.name)
  const userEmail = useSelector((state)=>state.user?.userInfo.email);
  const role = useSelector(state => state.user?.userInfo?.userData?.status);


    const {
        token: { colorBgContainer },
      } = theme.useToken();


     const name = useSelector(state => state.user.userInfo.userData.name);
     const wallets = useSelector(state => state.user.wallets);

     const [history, setHistory] = useState([]);

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

    
     const handleLogout =()=>{
      try {
        Swal.fire({
          title: 'LOGOUT',
          text: "You won't logout!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, log out!'
        }).then(async(result) => {
        
          if (result.isConfirmed) {
          await axios.post('/logout');
           
          }
        });
       
    } catch (error) {
      toast(error.message)
        console.error('Erreur lors de la déconnexion :', error);
    }
     }

     return (
        <Layout className=' overflow-hidden overflow-y-hidden'>
          <Sider
          
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            className=' h-screen'
          >
           <Link to="/" className="logo">
            <img src="assets/bitchest_logo.png" alt="logo" />
           </Link>
           <div className='align-middle justify-around flex flex-col h-[100%]'>
           <ul className='text-white mx-auto gap-4 flex flex-col p-2'>
                <li className="nav-item"><Link to="dashboard" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Dashboard</Link></li>
                {role === "user" && <li className="nav-item"><Link to="crypto-history" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">histories</Link></li>}
                <li className="nav-item"><Link to="profile" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Profil</Link></li>
         <li className="nav-item"><Link to="cryptocurrencies" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Cryptocurrencies</Link></li>
             {role === "user" && <li className="nav-item"><Link to="portfolio" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Portfolio</Link></li> }
            {role === "admin" &&    <li className="nav-item"><Link to="user-management" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Manage user</Link></li>}
            </ul>
            <div className="btn-group flex flex-col">
          {role === "user" &&  <span className='text-white text-xl shadow-green-500 shadow-sm text-center mb-3 font-bold uppercase'>solde : {wallets}$</span> }
            <button onClick={handleLogout} className='uppercase text-md tracking-tight p-3 text-white font-semibold bg-green-500 hover:bg-red-500 transition hover:ease-in-out duration-300'>
              Logout
            </button>
            </div>
           </div>
          </Sider>

          <Layout className=''>
          <Header >
            <h3 className='shadow capitalize text-white'>hello, {name}</h3>
          </Header>
             <Content
              style={{
                margin: '20px 16px 0',
                overflow: 'hidden',
              }}
            >
                <Outlet/>
            </Content>
          </Layout>


       <Sider
          style={{ height: '100vh'}}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            className='mx-auto flex justify-center'
          >
           <Space direction="vertical" size={8} className=' translate-y-5' >
    <Card
  
      className='text-center justify-center p-0 flex flex-col'
    >
    <div className="card-head border-b-4 ">
      <img src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
      alt="profil image" className=' object-cover rounded-full w-20 h-20' />
    </div>
     <p>{username}</p>
     <small>{userEmail ? userEmail : 'attente@gmail.com'}</small>
    </Card>
{role === "user" &&
    <Card title="Transactions">
        <div className='flex flex-col gap-2'>
            {history?.map((crypto)=>(
              <article className='flex align-baseline gap-1.5'>
                <img src={`assets/${crypto.logo}.png`} alt="crypto" className=' w-[45px] object-cover' />
                <div className='flex flex-col'>
                <span>{crypto.crypto_name}</span>
                  <span className={`font-bold ${crypto.transaction_type === "sell" ? "text-red-800": "text-green-800"}`}>
                    {crypto.transaction_type}
                  </span>
                </div>
              </article>
            ))} 
        </div>
    </Card>
}
  </Space>
   
          </Sider>


        </Layout>
 
      );
    };
  


export default DashboardLayout