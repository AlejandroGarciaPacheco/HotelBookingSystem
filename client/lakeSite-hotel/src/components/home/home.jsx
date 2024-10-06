import React from 'react'
import MainHeader from "../layout/mainHeader"
import HotelService from '../common/hotelService'
import Parallax from '../common/parallax'
import RoomCarousel from '../common/roomCarousel'
import RoomSearch from '../common/roomSearch'
import { useLocation } from 'react-router-dom'
const Home = () =>{
  const location = useLocation()
  const message = location.state && location.state.message
  const currentUser = localStorage.getItem("userId")
  return (
    <section>
      {message && <p className='text-warning px-5'>{message}</p>}
      {currentUser && <h6 className='text-success text-center'> You are logged in as {currentUser}</h6>}
      <MainHeader />

      <section className='container'>
        <RoomSearch />
        <RoomCarousel />
        <Parallax />
        <RoomCarousel />
        <HotelService />
        <Parallax />
        <RoomCarousel />


        
      </section>
    </section>
  )
}

export default Home