import React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const Beranda = () => {
  return (
    <div>
        <div className="flex">
            <Sidebar/>
            <div className="w-full ml-16 md:ml-56">
                <Header/>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Beranda