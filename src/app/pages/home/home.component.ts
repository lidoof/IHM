import { Component, OnInit } from '@angular/core';
import { dispatch } from '@ngneat/effects';
import { listRoomSubmit } from '../../state/listRoom/listRoom.action';
import { Observable } from 'rxjs';
import { listRoom } from '../../state/listRoom/listRoom.model';
import { listRoomRepo } from '../../state/listRoom/listRoom.store';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DetailsRoomComponent } from './detailsRoom/details-room/details-room.component';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone:true,
  imports: [MatButtonModule, MatDialogModule,
  MatSidenavModule,MatIconModule
  ],
})
export class HomeComponent implements OnInit{

    constructor(
      private listRoomStore : listRoomRepo,
      public dialog: MatDialog,
      private router:Router

    ){

    }

  listRoom:Observable <listRoom[]> | null = null;

  ngOnInit(): void {
    dispatch(listRoomSubmit)
  }


  getDetail(){
    const dialogRef = this.dialog.open(DetailsRoomComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.router.navigate(['makereservation']);
      }
    });
  }
  }

