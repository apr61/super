import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useBusinesses } from '../context/Businesses';
import { createSearchParams, useNavigate } from 'react-router-dom';

const Search = ({ extraStyles }) => {
    const { prevSearchParams } = useBusinesses()
    const [desc, setDesc] = useState(prevSearchParams?.find_desc || "")
    const [location, setLocation] = useState(prevSearchParams?.find_location || "")
    const navigate = useNavigate()
    function handleOnclick() {
        navigate({
            pathname: "/search",
            search: createSearchParams({ ...prevSearchParams,find_desc: desc, find_location: location}).toString(),
        })
    }
    return (
        <div className={`w-[100%] flex rounded-md border overflow-hidden focus-within:shadow-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${extraStyles}`}>
            <input type='search' className="p-4 w-[47%] focus:outline-none" placeholder='Car mechanic, plumber, Biriyani' value={desc} onChange={(e) => setDesc(e.target.value)} />
            <input type='search' className='p-4 w-[47%] focus:outline-none' placeholder='Mahadevpura, Bangalore, IN' value={location} onChange={(e) => setLocation(e.target.value)} />
            <button className='w-[6%] grid place-content-center bg-primary-200 text-white text-4xl' onClick={handleOnclick}><SearchIcon /></button>
        </div>
    )
}

export default Search