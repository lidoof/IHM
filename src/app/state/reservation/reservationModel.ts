export interface Reservation {
    id: string;
    customerId: string;
    reservationRooms: ReservationRoom[];
    checkInDate: Date;
    checkOutDate: Date;
    deposit: number;
    status: number;
  }
  
 export interface ReservationRoom {
    reservationId: string;
    reservation: string;
    roomType: number;
  }