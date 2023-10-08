import React from 'react'
import { Navbar } from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className='mb-[10rem]'>
        <Outlet />
      </main>
      <Toaster position='bottom-right'/>
    </>
  )
}

export default MainLayout