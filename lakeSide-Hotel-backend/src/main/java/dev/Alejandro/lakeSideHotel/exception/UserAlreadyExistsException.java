package dev.Alejandro.lakeSideHotel.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
        super (message);
    }
}
