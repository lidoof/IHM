import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DateRangePickerComponent } from './date-picker/date-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { dispatch } from '@ngneat/effects';
import { ReservationSubmit } from '../../state/reservation/reservation.action';
import { ActivatedRoute } from '@angular/router';
import { Observable, mergeMap } from 'rxjs';
import { listRoomRepo } from '../../state/listRoom/listRoom.store';
import { listRoom } from '../../state/listRoom/listRoom.model';
import { WalletRepo } from '../../state/wallet/wallet.store';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule,MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,]
})
export class ReservationComponent implements OnInit {
getDate() {
  const dialogRef = this.dialog.open(DateRangePickerComponent, {
  })

  dialogRef.afterClosed().subscribe((result) => {
    console.log("result: ")
    if (result) {
      console.log("result: ")
      console.log(result);
    }
  });
}
  constructor(private readonly fb: UntypedFormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private detailRoom: listRoomRepo,
    private wallet: WalletRepo
    ){}

  ngOnInit(): void {
      this.form = this.fb.group({
        checkInDate:[new Date(),Validators.required],
        numberOfNights:[,Validators.required, Validators.pattern('^[1-9]*')]
      })
      this.detailRoom$.subscribe((x)=>{
        console.log("dqsd",x)
      })
  }
  form: UntypedFormGroup | undefined;
 detailRoom$:Observable<listRoom> = this.detailRoom.getFirstEntity();
  customerId: string=""
  checkInDate: Date = new Date();
  numberOfNights: number =0


  reserver(){

  }

}
