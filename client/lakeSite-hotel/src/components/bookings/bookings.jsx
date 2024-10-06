import React, { useEffect, useState } from "react";
import { cancelBooking, getAllBookings } from "../utils/apiFunctions";
import BookingsTable from "./bookingsTable";
import Header from "../common/Header";

const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  
  //best practice to explictly fetch updated after changes in server to remove redundant re-fetches
  useEffect (() => {
    setTimeout(() => {
      getAllBookings().then((data) => {
        setBookingInfo(data)
        setIsLoading(false)
      }).catch((error) => {
        setError(error.message)
        setIsLoading(false)
      })
    }, 1000)
  }, [])

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId)
      //refetch after changes in the server
      const data = await getAllBookings()
      setBookingInfo(data)

    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section style={{backgroundColor: "whitesmoke"}}>
      <Header title={"Existing Bookings"} />
      {error && (<div className="text-danger"> {error}</div>)}
      {isLoading ? (
        <div>
          Loading Existing Bookings
        </div>
      ): (
        <BookingsTable bookingInfo={bookingInfo} handleBookingCancellation={handleBookingCancellation}/>
      )}
    </section>
  )
}

export default Bookings