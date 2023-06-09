import React, {useState, useRef, useEffect} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, Route, Rountes} from 'react-router-dom'

import { Sidebar, UserProfile } from '../component';

import {client} from '../client'
import logo from '../assets/logo.png'
import Pins from './Pins'
import { userQuery } from '../utils/data'

const Home = () => {

  const [toggleSiderbar, setToggleSiderbar] = useState(false)
  const [user, setUser] = useState(null)

  const userInfo = localStorage.getItem('user') !== 'undefined' 
    ? JSON.parse(localStorage.getItem('user'))
    : localStorage.clear()


  useEffect(()=>{
    const query = userQuery(userInfo?.sub)
    client.fetch(query)
      .then((data)=>{
        setUser(data[0])
      })
  },[])

  return (
    <div className='flex bg-grey-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user&&user} closeToggle={setToggleSiderbar}/>
      </div>
      <div className='flex md:hidden flex-row'>
        <HiMenu fontSize={40} className='cursor-pointer' onClick={()=> setToggleSiderbar(true) }/>
        <Link to='/'>
          <img src={logo} alt='logo' className='w-28'/>
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt='logo' className='w-28'/>
        </Link>

      </div>
      {toggleSiderbar && (
        <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
          <div className='absolute w-full flex justify-end items-center p-2'>
            <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={()=> setToggleSiderbar(false)}/>
          </div>
          <Sidebar user={user&&user} closeToggle={setToggleSiderbar}/>
        </div>
      )}
    </div>
  )
}

export default Home
