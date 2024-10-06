import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingRooms from "./components/room/existingRooms"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/home/home"
import EditRoom from "./components/room/editRoom"
import AddRoom from "./components/room/addRoom"
import NavBar from "./components/layout/navbar"
import Footer from "./components/layout/Footer"
import RoomListing from "./components/room/roomListing"
import Admin from "./components/admin/admin"
import CheckOut from "./components/bookings/checkOut"
import BookingSuccess from "./components/bookings/bookingSuccess"
import Bookings from "./components/bookings/bookings"
import FindBooking from "./components/bookings/findBooking"
import Login from "./components/auth/Login"
import Registration from "./components/auth/Registration"
import Profile from "./components/auth/Profile"
import {AuthProvider} from "./components/auth/AuthProvider"
import Logout from "./components/auth/Logout"
import RequireAuth from "./components/auth/RequireAuth"

function App() {
  

  return (
    <AuthProvider>

      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />}/>
            <Route path="/existing-rooms" element={<ExistingRooms />}/>
            <Route path="/add-room" element={<AddRoom />}/>
            
            <Route
							path="/book-room/:roomId"
							element={
								<RequireAuth>
									<CheckOut />
								</RequireAuth>
							}
						/>
            <Route path="/browse-all-rooms" element={<RoomListing />}/>
            <Route path="/admin" element={<Admin />}/>
            <Route path="/booking-success" element={<BookingSuccess />}/>
            <Route path="/existing-bookings" element={<Bookings />}/>
            <Route path="/find-booking" element={<FindBooking />}/> 
            <Route path="/login" element={<Login />}/> 
            <Route path="/register" element={<Registration />}/> 
            <Route path="/profile" element={<Profile />}/> 
            <Route path="/logout" element={<Logout />}/> 


          
          </Routes>
        </Router>
        <Footer />
      </main>
      
    
    
    </AuthProvider>

  )
    
  
}

export default App;
