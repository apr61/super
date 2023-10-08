import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { getAllBusinessesByUidService } from '../services/business'
import { Link } from 'react-router-dom'
import { createRouterPath } from '../utils/routerUtils'
import toast from 'react-hot-toast'
import Loader from'../components/Loader'

const MyBusinesses = () => {
  document.title = 'My businesses'

  const { currentUser } = useAuthContext()
  const [isLoading, setIsLoading] = useState(true)
  const [userBusinesses, setUserBusinesses] = useState({})
  const getUserBusinesses = async (uid) => {
    try {
      setIsLoading(true)
      const data = await getAllBusinessesByUidService(uid)
      setUserBusinesses(data)
    } catch (err) {
      toast.error(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getUserBusinesses(currentUser.uid)
  }, [currentUser.uid])

  if (isLoading) return <Loader />

  return (
    <div className='max-w-[70rem] mx-auto my-8'>
      {
        Object.keys(userBusinesses).length === 0 ? (
          <div className='grid place-content-center min-h-[30rem]'>
            <h2 className='text-xl font-semibold'>You don't have any businesses</h2>
            <p>Click <Link to='/business/new' className='text-primary-200 hover:underline'>here</Link> to create one!!!</p>
          </div>
        ) : (
          <>
            <h1 className='text-2xl'>My Businesses</h1>
            <table className='my-4 w-full rounded-md overflow-hidden'>
              <thead className='bg-gray-200 text-gray-800'>
                <tr className='text-left'>
                  <th className='p-4'>S.No</th>
                  <th>Store Code</th>
                  <th>Business</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='text-left'>
                {
                  userBusinesses.length > 0 && userBusinesses.map((business, i) => (
                    <tr key={business.businessId} className={i % 2 == 0 ? 'bg-slate-100' : 'bg-slate-200'}>
                      <td className='px-6 py-4'>{i + 1}</td>
                      <td>{business.businessId}</td>
                      <td>
                        <Link to={`/business/${createRouterPath(business.businessName.toLowerCase() + ' ' + business.businessAddress.city.toLowerCase() + ' ' + business.businessId)}`}
                          className='hover:underline'>{business.businessName}</Link>
                      </td>
                      <td>
                        <p>{business.businessAddress.street}, {business.businessAddress.city}</p>
                        <p>{business.businessAddress.state}, {business.businessAddress.pincode}</p>
                      </td>
                      <td>{business.isVerified ? 'Verified' : 'Not Verified'}</td>
                      <td>
                        <Link>Get Verfied</Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </>
        )
      }

    </div>
  )
}

export default MyBusinesses