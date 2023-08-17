import React from 'react'


import { Layout, theme } from 'antd';
const { Header, Content, Sider } = Layout;

const DashboardLayout = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
      return (
        <Layout>
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
            <ul className='text-white block mx-auto p-2'>
                <li className="nav-item"><a href="" className="nav-link hover:text-green-400 selection:text-white font-semibold">Dashboard</a></li>
                <li className="nav-item"><a href="" className="nav-link">Wallet</a></li>
                <li className="nav-item"><a href="" className="nav-link">Profil</a></li>
                <li className="nav-item"><a href="" className="nav-link">Portfolio</a></li>
                <li className="nav-item"><a href="" className="nav-link">Manage user</a></li>
                <li className="nav-item"><a href="" className="nav-link">Setting</a></li>
            </ul>
            <button className='text-uppercase text-white font-semibold bg-green-500'>Logout</button>
          </Sider>
          <Layout>
          <Header >
                <h3 className='shadow capitalize text-white'>hello, david</h3>
            </Header>
             <Content
              style={{
                margin: '24px 16px 0',
                overflow: 'initial',
                padding: "10px"
              }}
            >
                {/* <Outlet/> */}
            </Content>
          </Layout>
        </Layout>
      );
    };
  


export default DashboardLayout