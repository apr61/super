import { Link, NavLink } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonIcon from '@mui/icons-material/Person';
import Dropdown from './Dropdown';
import { useAuthContext } from '../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const NavbarDropdownStyles = 'mt-6 block';
const dropDownButtonStyles = 'text-gray-500 hover:bg-primary-500 hover:text-black flex items-center gap-2'

export const Navbar = () => {
  const { currentUser, logOutUser } = useAuthContext()
  const isLoggedIn = currentUser

  return (
    <>
      <nav role='navigation' className='px-6 py-1 shadow-lg sticky top-0 left-0 right-0 bg-white z-20'>
        <ul className='flex gap-2 items-center'>
          <li className='mr-auto text-xl'>
            <Link to='/' className='flex flex-col'>
              <p className='text-yellow-400 text-2xl font-bold text-center'>Super</p>
              <p className='text-primary-200 text-[1rem] font-semibold '>Everything app</p>
            </Link>
          </li>
          <ul>
            <Dropdown
              dropDownlistStyles={NavbarDropdownStyles}
              dropdownName={'Super for business'}
              Icon={KeyboardArrowDownIcon}
              dropDownButtonStyles={dropDownButtonStyles}>
              <li>
                <Link to='/business/new' className='p-2 rounded-md text-gray-500 hover:bg-primary-500 hover:text-black flex items-center gap-2'>
                  <AddBusinessIcon /> Add a Business
                </Link>
              </li>
              <li>
                <Link to='/business/my' className='p-2 rounded-md text-gray-500 hover:bg-primary-500 hover:text-black flex items-center gap-2'>
                  <PersonIcon /> My Businesses
                </Link>
              </li>
            </Dropdown>
          </ul>
          <li>
            <NavLink to='/writeareview'
              className={({ isActive }) => `px-4 py-2 rounded-md hover:bg-primary-500 hover:text-black ${isActive ? 'text-black' : 'text-gray-500'}`}>
              Write a Review
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' className={({ isActive }) => `px-4 py-2 rounded-md hover:bg-primary-500 hover:text-black ${isActive ? 'text-black' : 'text-gray-500'}`}>About</NavLink>
          </li>
          {
            isLoggedIn ? (
              <>
                <li>
                  <Dropdown
                    dropdownName={''}
                    Icon={AccountCircleIcon}
                    dropDownlistStyles={'mt-6 right-2 p-4 flex flex-col gap-2'}
                    dropDownButtonStyles={''}>
                    <Link to="/account" className='p-2 rounded-md text-gray-500 hover:bg-primary-500 hover:text-black flex items-center gap-2'><PersonIcon /> Account</Link>
                    <button className='bg-red-500 px-4 py-2 text-white rounded-md' onClick={() => logOutUser()}><LogoutIcon /> Log Out</button>
                  </Dropdown>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className='px-4 py-2 rounded-md text-primary-300 hover:bg-primary-500'
                    to='/login'>Log In</Link>
                </li>
                <li>
                  <Link className='px-4 py-2 rounded-md text-center bg-primary-200 text-white hover:opacity-90'
                    to='signup'>Sign Up</Link>
                </li>
              </>
            )
          }

        </ul >
      </nav >
    </>
  )
}
