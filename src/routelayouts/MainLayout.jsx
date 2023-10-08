import React from 'react'
import { Navbar } from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
        <Navbar />
        <main className='mb-[10rem]'>
            <Outlet />
        </main>
    </>
  )
}

export default MainLayout