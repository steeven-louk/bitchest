import React from 'react'


import { Layout, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
const { Header, Content, Sider } = Layout;

const DashboardLayout = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();

      const isAdmin = false;

     const name = useSelector(state => state.user.userInfo.userData.name);
     const wallets = useSelector(state => state.user.wallets);
console.log('aaaaaaaa',wallets)
     return (
        <Layout className=' overflow-hidden overflow-y-hidden'>
          <Sider
          style={{ height: '100vh', }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            
          >
           <Link to="/" className="logo">
            <img src="assets/bitchest_logo.png" alt="logo" />
           </Link>
           <div className='align-middle justify-around flex flex-col h-[100%]'>
           <ul className='text-white mx-auto gap-4 flex flex-col p-2'>
                <li className="nav-item"><Link to="dashboard" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Dashboard</Link></li>
                <li className="nav-item"><a href="" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Wallet</a></li>
                <li className="nav-item"><a href="" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Profil</a></li>
            {!isAdmin &&    <li className="nav-item"><Link to="cryptocurrencies" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Cryptocurrencies</Link></li>}
                {!isAdmin &&     <li className="nav-item"><Link to="portfolio" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Portfolio</Link></li> }
            {!isAdmin &&    <li className="nav-item"><Link to="user-management" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Manage user</Link></li>}
            </ul>
            <div className="btn-group flex flex-col">
            <span className='text-white text-xl shadow-green-500 shadow-sm text-center mb-3 font-bold uppercase'>solde : {wallets}$</span>
            <button className='uppercase text-md tracking-tight p-3 text-white font-semibold bg-green-500 hover:bg-red-500 transition hover:ease-in-out duration-300'>
              <Link to={"logout"}>Logout</Link>
            </button>
            </div>
           </div>
          </Sider>

          <Layout>
          <Header >
            <h3 className='shadow capitalize text-white'>hello, {name}</h3>
          </Header>
             <Content
              style={{
                margin: '24px 16px 0',
                overflow: 'hidden',
              }}
            >
                <Outlet/>
            </Content>
          </Layout>
        </Layout>
      );
    };
  


export default DashboardLayout