import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import Loader from '../components/Loader'

const Account = () => {
    const { currentUser, isLoading } = useAuthContext()
    if(isLoading) (<Loader />)
    return (
        <div className='max-w-[40rem] mx-auto mt-12 flex flex-col gap-4 items-center'>
            <div className='w-40 h-40 rounded-full overflow-hidden'>
                <img src={currentUser.photoURL} alt={currentUser.displayName} />
            </div>
            <table>
                <tbody className='flex flex-col gap-4'>
                    <tr>
                        <td className='text-md font-medium text-gray-500 px-4'>Name</td>
                        <td className='mt-1 text-md text-gray-900'>{currentUser.displayName}</td>
                    </tr>
                    <tr>
                        <td className='text-md font-medium text-gray-500 px-4'>Email</td>
                        <td className='mt-1 text-md text-gray-900'>{currentUser.email}</td>
                    </tr>
                    <tr>
                        <td className='text-md font-medium text-gray-500 px-4'>Joined on</td>
                        <td className='mt-1 text-md text-gray-900'>{currentUser.metadata.creationTime}</td>
                    </tr>
                    <tr>
                        <td className='text-md font-medium text-gray-500 px-4'>Last Login</td>
                        <td className='mt-1 text-md text-gray-900'>{currentUser.metadata.lastSignInTime}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Account