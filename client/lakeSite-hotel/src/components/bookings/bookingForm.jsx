import React, { useEffect, useState } from "react";
import { bookRoom, getRoomById } from "../utils/apiFunctions";
import moment from "moment"
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormControl, Button } from "react-bootstrap";
import BookingSummary from "./bookingSummary";



const BookingForm = () => {
  const [isValidated, setIsValidated] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [roomPrice, setRoomPrice] = useState(0)

  const currentUser = localStorage.getItem("userId")
  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: currentUser,
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: "",
    numberOfChildren: ""
  })

  const [roomInfo, setRoomInfo] = useState ({
    photo: "",
    roomType: "",
    roomPrice: ""
  })

  const {roomId} = useParams()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setBooking ({...booking, [name]: value})
    setErrorMessage("")

  }

  const getRoomPriceById = async (roomId) => {
    try{
      const response = await getRoomById (roomId)
      setRoomPrice(response.roomPrice)
    } catch (error) {
      throw new Error (error)
    }
  }

  useEffect(() => {
    getRoomPriceById(roomId)
  }, [roomId])

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)

    const diffDays = checkOutDate.diff(checkInDate, "days") 
    const price = roomPrice ? roomPrice : 0
    return diffDays*price
  }

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numberOfAdults)
    const childrenCount = parseInt(booking.numberOfChildren)
    const totalCount = adultCount + childrenCount
    return totalCount >= 1 && adultCount >=1
  }

  const isCheckOutDateValid = () => {
    if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
      setErrorMessage("Check-out date must come before check-in date")
      return false
    } else {
      setErrorMessage("")
      return true
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity()===false || !isGuestCountValid() || !isCheckOutDateValid()){
      e.stopPropagation()
    } else {
      setIsSubmitted(true)
    }
    setIsValidated(true)

  }

  const handleBooking = async() => {
    try {
      const confirmationCode = await bookRoom(roomId, booking)
      setIsSubmitted(true)
      navigate("/booking-success", {state: {message: confirmationCode}})
    } catch (error) {
      setErrorMessage(error.message)
      navigate("/booking-success", {state: {error: errorMessage}})
    }
  }

  
  return (
    
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body mt-5">
              <h4 className="card card-title"> Reserve Room </h4>
              <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="guestFullName">
                    Full Name: 
                  </Form.Label>
                  <FormControl 
                  required
                  type="text"
                  id="guestFullName"
                  name="guestFullName"
                  value={booking.guestFullName}
                  placeholder="Enter your fullname"
                  onChange={handleInputChange} />

                  <Form.Control.Feedback
                  type="invalid">
                    Please enter your full name
                  </Form.Control.Feedback>
                </Form.Group>


                <Form.Group>
                    <Form.Label htmlFor="guestEmail">
                      Email: 
                    </Form.Label>
                    <FormControl 
                    required
                    type="email"
                    id="guestEmail"
                    name="guestEmail"
                    value={booking.guestEmail}
                    placeholder="Enter your Email"
                    onChange={handleInputChange}
                    disabled />

                  <Form.Control.Feedback
                  type="invalid">
                    Please enter your Email
                  </Form.Control.Feedback>
                </Form.Group>


                <fieldset style={{border: "2px"}}>
                  <legend>
                    Lodgin period
                  </legend>

                  <div className="row">
                    <div className="col-6">

                    
                      <Form.Label htmlFor="checkInDate">
                        Check-in Date 
                      </Form.Label>
                      <FormControl 
                      required
                      type="date"
                      id="checkInDate"
                      name="checkInDate"
                      value={booking.checkInDate}
                      placeholder="check-in Date"
                      onChange={handleInputChange} />

                      <Form.Control.Feedback
                      type="invalid">
                        Please select a check-in Date
                      </Form.Control.Feedback>
                    

                    </div>

                    <div className="col-6">

                    
                      <Form.Label htmlFor="checkOutDate">
                        Check-out Date 
                      </Form.Label>
                      <FormControl 
                      required
                      type="date"
                      id="checkOutDate"
                      name="checkOutDate"
                      value={booking.checkOutDate}
                      placeholder="check-outn Date"
                      onChange={handleInputChange} />

                      <Form.Control.Feedback
                      type="invalid">
                        Please select a check-out Date
                      </Form.Control.Feedback>
                    

                    </div>

                    {errorMessage && <p className="error-message text-danger"> {errorMessage}</p>}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>
                    Number Of Guests
                  </legend>

                  <div className="row">
                    <div className="col-6">

                    
                      <Form.Label htmlFor="numberOfAdults">
                        Adults:  
                      </Form.Label>
                      <FormControl 
                      required
                      type="number"
                      id="numberOfAdults"
                      name="numberOfAdults"
                      value={booking.numberOfAdults}
                      placeholder="0"
                      min={1}
                      onChange={handleInputChange} />

                      <Form.Control.Feedback
                      type="invalid">
                        Please select at least 1 adult.
                      </Form.Control.Feedback>
                    

                    </div>

                    <div className="col-6">

                    
                      <Form.Label htmlFor="numberOfChildren">
                        Children:  
                      </Form.Label>
                      <FormControl 
                      required
                      type="number"
                      id="numberOfChildren"
                      name="numberOfChildren"
                      value={booking.numberOfChildren}
                      placeholder="0"
                      min={0}
                      onChange={handleInputChange} />

                    </div>
                  </div>
                </fieldset>

                <div className="form-group mt-2 mb-2">
                  <button type="submit" className="btn btn-hotel">
                    Continue
                  </button>

                </div>
              </Form>
            </div>
            
          </div>

          <div className="col-md-4">
            {isSubmitted && (
              <BookingSummary
              booking={booking}
              payment={calculatePayment()}
              isFormValid={isValidated}
              onConfirm={handleBooking}
              />
            )}
          </div>

        </div>
      </div>
    </>
    
  )
}

export default BookingForm