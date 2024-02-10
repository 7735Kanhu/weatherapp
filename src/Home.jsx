import React from 'react'
import mainbg from './image/home.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div className='w-full h-[100vh] bg-cover flex flex-col' style={{ backgroundImage: `url(${mainbg})` }}>
      <div className='m-auto w-max p-7 text-gray-100  backdrop-blur rounded-md flex flex-col gap-6 align-middle justify-center'>
        <h1 className='text-4xl font-bold'>Welcome To Weather App</h1>
      <button className='bg-green-700 w-max py-4 px-8 m-auto rounded-full text-xl hover:bg-green-900'><Link to="/weather">Search Weather</Link></button>
      </div>
    </div>
      </>
  )
}

export default Home
