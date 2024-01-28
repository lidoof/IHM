import { Component,Inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../../component/loader/loader.component';
import { dispatch } from '@ngneat/effects';
import * as detailRoomAction from '../../../../state/listRoom/listRoom.action'
import { Observable } from 'rxjs/internal/Observable';
import { listRoomRepo } from '../../../../state/listRoom/listRoom.store';
import { AsyncPipe, CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { listRoom } from '../../../../state/listRoom/listRoom.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import { ReservationComponent } from '../../../reservation/reservation.component';
@Component({
  selector: 'app-details-room',
  templateUrl: './details-room.component.html',
  styleUrl: './details-room.component.scss',
  standalone:true,
  imports: [MatDialogModule, MatButtonModule,LoaderComponent,AsyncPipe,
    MatProgressSpinnerModule, CommonModule ],
})
export class DetailsRoomComponent implements OnInit {

    constructor(private router:Router,
                private listRoomRepo :listRoomRepo,
                @Inject(MAT_DIALOG_DATA) public data:any ="",
                public dialogRef: MatDialogRef<DetailsRoomComponent> ){

    }
    @Input() ddata :any =""
    loading$: Observable<boolean> = this.listRoomRepo.loading$;
    info$: Observable<listRoom> = this.listRoomRepo.getFirstEntity();
    ngOnInit(): void {

        console.log("dsqdé",this.data.title);

        dispatch(detailRoomAction.listRoomSubmit({roomType:this.data.title}))
       
    }

  async makeReservation(){
    this.dialogRef.close(this.data.title)
  }
}


