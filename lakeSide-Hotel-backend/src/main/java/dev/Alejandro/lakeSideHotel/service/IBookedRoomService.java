package dev.Alejandro.lakeSideHotel.service;

import dev.Alejandro.lakeSideHotel.model.BookedRoom;

import java.util.List;

public interface IBookedRoomService {
    void cancelBooking(Long bookingId);

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> getAllBookings();
    List<BookedRoom> getBookingsByUserEmail(String email);
}
