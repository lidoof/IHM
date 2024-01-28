import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import { SessionRepository } from '../../state/auth/auth.store';
import { Profil } from '../../state/profil/profil.model';
import { ProfilRepo } from '../../state/profil/profil.store';

import { RoomType, RoomTypeString } from '../../state/listRoom/detailRoom.enum';
import { format } from 'date-fns';



export interface ReservationRequest{
  customerId: string;
  roomTypes:[string] ;
  checkInDate: Date ;
  numberOfNights: number ;
}


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


  constructor(private readonly fb: UntypedFormBuilder,
    public dialog: MatDialog,
    private detailRoom: listRoomRepo,
    private sessionRepo: SessionRepository,
    private profilRepo: ProfilRepo,
    private wallet: WalletRepo,
    ){}


  form: UntypedFormGroup | undefined;
 detailRoom$:Observable<listRoom> = this.detailRoom.getFirstEntity();
  customerId: Observable<string>= this.sessionRepo.getFirstEntity();
  profil :Observable<Profil> = this.profilRepo.getFirstEntity();
   checkInDate: Date = new Date();

   reservation:ReservationRequest = {
     customerId: '',
     roomTypes: [''],
     checkInDate: new Date(),
     numberOfNights: 0
   }

   today:Date =new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
   checkInDateModified :any = null;
  ngOnInit(): void {
    this.form = this.fb.group({
      checkInDate:[new Date(),Validators.required],
      numberOfNights:[null,Validators.required]
    })
    this.detailRoom$.subscribe((x)=>{
      console.log("dqsd",x)
    })
}

format(){
  
  return format(this.checkInDate.toISOString(),'yyyy-mm-dd')
}
  reserver(){
    this.form?.markAllAsTouched();
    if(this.form?.invalid){
      return;
    }
    console.log("foooooooorm:; fdsf s",this.form?.get('numberofNights')?.value)
    this.customerId.subscribe((session:any) =>{
      this.reservation ={
        ...this.reservation,
        customerId : session.customerId
      }
    })
    this.detailRoom$.subscribe((detailRoom:any) => {
      console.log('detasl:',detailRoom.$values[0].type )
      switch (detailRoom.$values[0].type ) {
        case RoomType.STANDARD:
          console.log('standatrd')
            this.reservation = {
              ...this.reservation,
              roomTypes : [RoomTypeString.STANDARD]
            }
          break;
          case RoomType.SUITE:
            this.reservation = {
              
              ...this.reservation,
              roomTypes : [RoomTypeString.SUITE]
            }
          break;
          case RoomType.SUPERIEUR:
            console.log('standatrd')
            this.reservation = {
              ...this.reservation,
              roomTypes : [RoomTypeString.SUPERIEUR]
            }
          break;
          
        default:
          break;
      }

      this.reservation  = {
        ...this.reservation,
        numberOfNights:this.form?.get('numberOfNights')?.value,
        checkInDate:this.form?.get('checkInDate')?.value,
      }
      
    })
    dispatch(ReservationSubmit({reservation:this.reservation}))
  }

}
