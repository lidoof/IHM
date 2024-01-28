import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { dispatch } from '@ngneat/effects';
import { ReservationCancelmSubmit, ReservationConfirmSubmit } from '../../../state/reservation/reservation.action';
import { ReservationRepo } from '../../../state/reservation/reservation.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'confirmation',
  templateUrl: 'confirmation.html',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule, MatButtonModule
  ],
})
export class DateRangePickerComponent implements OnInit{
  reservation$:Observable<any> = this.reservationRepo.getFirstEntity();
  reservation:string ='';
  ngOnInit(): void {
      this.reservation$.subscribe((reservation) => {
        console.log('reser:',reservation.reservationRooms.$values[0].reservationId)
        this.reservation = reservation.reservationRooms.$values[0].reservationId
        console.log("fdsdf",this.reservation)
      })
  }
cancel() {
 dispatch(ReservationCancelmSubmit({ReservationConfirm:this.reservation}))
}
confirmer() {
  dispatch(ReservationConfirmSubmit({ReservationConfirm:this.reservation}));
}

  constructor(private reservationRepo: ReservationRepo) {


    
  }
  


  
}
