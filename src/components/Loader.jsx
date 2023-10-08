import React from 'react'

const Loader = () => {
  return (
    <div className='grid place-content-center min-h-[50%]'>
        <div className='w-12 h-12 rounded-full border-4 border-primary-500 border-r-4 border-r-primary-300 animate-spin'>
        </div>
    </div>
  )
}

export default Loader