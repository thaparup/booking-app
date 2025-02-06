import React from 'react'
import { createCookieSessionStorage, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAppContext } from '../context/AppContext'
import SignOutButton from './SignOutButton'

const Header = () => {


    const { isLoggedIn } = useAppContext()
    console.log(isLoggedIn)
    return (
        <div className='bg-blue-800 py-6'>
            <div className='container mx-auto flex justify-between '>
                <span className='text-3xl text-white font-bold tracking-tight '>
                    <Link to=''>Holidays.com</Link>

                </span>
                <span className='flex space-x-2'>
                    {isLoggedIn ? (<>
                        <Link to='/my-bookings'>My Bookings</Link>
                        <Link to='/my-hotels'>My Hotels</Link>
                        <SignOutButton />
                    </>) : (
                        <Link to='/sign-in' className='flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100'>Sign In</Link>

                    )}

                </span>
            </div>
        </div>
    )
}

export default Header