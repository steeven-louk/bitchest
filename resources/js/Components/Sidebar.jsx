import Sider from 'antd/es/layout/Sider';
import React from 'react'
import { Link } from 'react-router-dom';

// import Cryptos from '../cryptocurrencies/Cryptos';
// import Home from '../Home';
// import Portfolio from '../portfolio/Portfolio';
// import Profile from '../user/Profile';
// import UserManagement from '../admin/UserManagement';

const Sidebar = ({role, wallets,handleLogout} ) => {
  return (
    <Sider

    breakpoint="lg"
    collapsedWidth="0"
    onBreakpoint={(broken) => {
      console.log(broken);
    } }
    onCollapse={(collapsed, type) => {
      console.log(collapsed, type);
    } }
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
        {role === "user" && <li className="nav-item"><Link to="portfolio" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Portfolio</Link></li>}
        {role === "admin" && <li className="nav-item"><Link to="user-management" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Manage user</Link></li>}
        {role === "user" && <li className="nav-item"><Link to="create-user" className="nav-link text-xl sm:text-md hover:text-green-400 selection:text-white font-semibold">Create user</Link></li>}
      </ul>
      <div className="btn-group flex flex-col">
        {role === "user" && <span className='text-white text-xl shadow-green-500 shadow-sm text-center mb-3 font-bold uppercase'>solde : {wallets}$</span>}
        <button onClick={()=>handleLogout()} className='uppercase text-md tracking-tight p-3 text-white font-semibold bg-green-500 hover:bg-red-500 transition hover:ease-in-out duration-300'>
          Logout
        </button>
      </div>
    </div>
  </Sider>
  )
}

export default Sidebar