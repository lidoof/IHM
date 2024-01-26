import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-room',
  templateUrl: './details-room.component.html',
  styleUrl: './details-room.component.scss',
  standalone:true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DetailsRoomComponent {

    constructor(private router:Router){

    }

  async makeReservation(){
   await this.router.navigate(['makeReservation']) 
  }
}
