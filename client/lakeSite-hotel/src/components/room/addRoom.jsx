import React, { useState } from 'react';
import { addRoom } from '../utils/apiFunctions';
import RoomTypeSelector from '../common/roomTypeSelector';
import ExistingRooms from './existingRooms';
import { Link } from 'react-router-dom';

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value) && parseInt(value) > 0) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Submitting form...");
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
      console.log("Success status:", success);
      if (success!==undefined) {
        console.log("Setting success message...");
        setSuccessMessage("A new room has been added to the database!");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreview("");
        setErrorMessage("");
      } else {
        console.log("Setting error message...");
        setErrorMessage("There was an error adding the room to the database. Please try again.");
      }
    } catch (error) {
      console.log("Catch error:", error.message);
      setErrorMessage("Failed to add room: " + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-4">Add a New Room</h2>

            {successMessage && (
              <div className="alert alert-success fade show">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4 row">
                <label htmlFor="roomType" className="col-sm-3 col-form-label">Room Type</label>
                <div className="col-sm-9">
                  <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom} />
                </div>
              </div>
              <div className="mb-4 row">
                <label htmlFor="roomPrice" className="col-sm-3 col-form-label">Room Price</label>
                <div className="col-sm-9">
                  <input
                    required
                    type="number"
                    className="form-control"
                    id="roomPrice"
                    name="roomPrice"
                    value={newRoom.roomPrice}
                    onChange={handleRoomInputChange}
                    min="1"
                  />
                </div>
              </div>
              <div className="mb-4 row">
                <label htmlFor="photo" className="col-sm-3 col-form-label">Room Photo</label>
                <div className="col-sm-9">
                  <input
                    required
                    name="photo"
                    id="photo"
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview Room Photo"
                      style={{ maxWidth: "400px", maxHeight: "400px" }}
                      className="mt-3"
                    />
                  )}
                </div>
              </div>
              <div className="d-grid gap-2 d-md-flex mt-2">
              <label className="col-sm-3 col-form-label"></label>
                  <Link to={"/existing-rooms"} className='btn btn-outline-info'> 
                  Back
                  </Link>
                  <button className="btn btn-outline-primary" type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Room"}
                  </button>
                
              </div>

              
            </form>
          </div>
        </div>

        
      </section>
    </>
  );
};

export default AddRoom;
