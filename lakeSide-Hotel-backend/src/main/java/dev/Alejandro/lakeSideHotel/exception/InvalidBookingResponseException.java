package dev.Alejandro.lakeSideHotel.exception;

public class InvalidBookingResponseException extends RuntimeException {
    public InvalidBookingResponseException(String message) {
        super(message);
    }
}
