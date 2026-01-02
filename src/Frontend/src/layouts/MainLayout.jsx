import React from 'react'
import '../App.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/SideBar.jsx'

function MainLayout() {
  return (
    <>
      <div className=" bg-white flex flex-col min-h-screen w-full overflow-hidden">
        <Header />
        <Sidebar />
        <div className="flex-grow mb-8 px-8 justify-center">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}




export default MainLayout;
