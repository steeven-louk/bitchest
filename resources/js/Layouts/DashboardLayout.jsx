import React from 'react'


import { Layout, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
const { Header, Content, Sider } = Layout;

const DashboardLayout = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();

      const isAdmin = false;

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
            <div className="demo-logo-vertical" />
           <div className='align-middle justify-around flex flex-col h-[100%]'>
           <span className="logo">logo</span>
           <ul className='text-white mx-auto gap-4 flex flex-col p-2'>
                <li className="nav-item"><Link to="dashboard" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Dashboard</Link></li>
                <li className="nav-item"><a href="" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Wallet</a></li>
                <li className="nav-item"><a href="" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Profil</a></li>
                {!isAdmin &&     <li className="nav-item"><Link to="portfolio" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Portfolio</Link></li> }
            {!isAdmin &&    <li className="nav-item"><Link to="user-management" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Manage user</Link></li>}
                <li className="nav-item"><a href="" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Setting</a></li>
            </ul>
            <button className='uppercase text-md tracking-tight p-3 text-white font-semibold bg-green-500 hover:bg-red-500 transition hover:ease-in-out duration-300'>Logout</button>
           </div>
          </Sider>
          <Layout>
          <Header >
                <h3 className='shadow capitalize text-white'>hello, david</h3>
            </Header>
             <Content
              style={{
                // margin: '24px 16px 0',
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