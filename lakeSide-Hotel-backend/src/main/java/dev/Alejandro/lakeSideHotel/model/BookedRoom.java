package dev.Alejandro.lakeSideHotel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class BookedRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    @Column(name = "check_In")
    private LocalDate checkInDate;
    @Column(name = "check_Out")
    private LocalDate checkOutDate;
    @Column(name = "guest_FullName")
    private String guestFullName;
    @Column(name = "guest_Email")
    private String guestEmail;
    @Column(name = "adults")
    private int numberOfAdults;
    @Column(name = "children")
    private int numberOfChildren;
    @Column(name = "total_Guests")
    private int totalNumberOfGuests;
    @Setter
    @Column(name = "confirmation_Code")
    private String bookingConfirmationCode;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;


    public void calculateTotalGuests(){
        this.totalNumberOfGuests = this.numberOfAdults + this.numberOfChildren;
    }

    public void setNumberOfAdults(int numOfAdults){
        numberOfAdults = numOfAdults;
        calculateTotalGuests();

    }

    public void setNumberOfChildren(int numOfChildren){
        numberOfChildren = numOfChildren;
        calculateTotalGuests();
    }

}
