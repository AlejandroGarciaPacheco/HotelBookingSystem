import moment from "moment";
import React, { useState } from "react";
import { getAvailableRooms } from "../utils/apiFunctions";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RoomSearchResults from "./roomSearchResults";
import RoomTypeSelector from "./roomTypeSelector"

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState ({
    checkInDate: "",
    checkOutDate: "",
    roomType: ""
  })

  const [errorMessage, setErrorMessage] = useState("")
  const [availableRooms, setAvailableRooms] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault();
    const checkIn = moment(searchQuery.checkInDate)
    const checkOut = moment(searchQuery.checkOutDate)
    if (!checkIn.isValid() || !checkOut.isValid()){
      setErrorMessage("Please, enter a valid date range")
      return
    }

    if (!checkOut.isSameOrAfter(checkIn)){
      setErrorMessage("Check-In date must come before check-out date")
      return
    }

    setIsLoading(true)
    getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType).then((response) => {
      setAvailableRooms(response.data)
      setTimeout(()=>{
        setIsLoading(false)
      }, 2000)
    }).catch((error) => {
      console.error(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setSearchQuery({ ...searchQuery, [name]: value })
    const checkIn = moment(searchQuery.checkInDate)
    const checkOut = moment(searchQuery.checkOutDate)
    if (checkIn.isValid() && checkOut.isValid()){
      setErrorMessage("")
    }
  }

  const clearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: ""
    })
  }


  return (
    <>
    <Container className="mt-5 mb-5p py-5 shadow">
      <Form onSubmit={handleSearch}>
        <Row className="justify-content-center">
          <Col xs={12} md={3}>
            <Form.Group controlId="checkInDate">
              <Form.Label>Check-In date</Form.Label>
              <Form.Control 
              type="date"
              name="checkInDate"
              value={searchQuery.checkInDate}
              onChange={handleInputChange}
              min={moment().format("YYYY-MM-DD")}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={3}>
            <Form.Group controlId="checkOutDate">
              <Form.Label>Check-Out date</Form.Label>
              <Form.Control 
              type="date"
              name="checkOutDate"
              value={searchQuery.checkOutDate}
              onChange={handleInputChange}
              min={moment().format("YYYY-MM-DD")}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={3}>
            <Form.Group>
              <Form.Label>room Type</Form.Label>
              <div className="d-flex">
                <RoomTypeSelector
										handleRoomInputChange={handleInputChange}
										newRoom={searchQuery}
									/>
                <Button variant="secondary" type="submit">
                  Search
                </Button>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {isLoading ? (
        <p>Finding available rooms...</p>
      ): availableRooms ? (
        <RoomSearchResults results={availableRooms}
        onClearSearch={clearSearch}/>
      ): (
        <p>No rooms available for the selected dates and room types</p>
      )}

      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </Container>
    </>
  )
}

export default RoomSearch