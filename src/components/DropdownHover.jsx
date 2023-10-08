import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useBusinesses } from '../context/Businesses'

const DropdownHover = ({ children, dropDownlistStyles, dropdownName, Icon, dropDownButtonStyles }) => {
  const { prevSearchParams } = useBusinesses()
  const navigate = useNavigate()
  function handleOnclick() {
    navigate({
      pathname: "/search",
      search: createSearchParams({ ...prevSearchParams, find_desc: dropdownName}).toString(),
    })
  }
  return (
    <div className='group inline-block'>
      <button className={`relative px-4 py-2 rounded-md flex gap-2 ${dropDownButtonStyles}`} onClick={handleOnclick}>
        {dropdownName}
        <Icon />
      </button>
      <ul className={`absolute hidden p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md z-10 bg-white ${dropDownlistStyles}`}>
        {children}
      </ul>
    </div>
  )
}

export default DropdownHover