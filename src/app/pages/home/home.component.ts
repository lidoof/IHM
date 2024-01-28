import { Component, OnInit } from '@angular/core';
import { dispatch } from '@ngneat/effects';
import { listRoomSubmit } from '../../state/listRoom/listRoom.action';
import { Observable, mergeAll, mergeMap, reduce, toArray } from 'rxjs';
import { listRoom } from '../../state/listRoom/listRoom.model';
import { listRoomRepo } from '../../state/listRoom/listRoom.store';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DetailsRoomComponent } from './detailsRoom/details-room/details-room.component';
import { WalletComponent } from './wallet/wallet.component';
import {MatIconModule} from '@angular/material/icon';
import { Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { walletSubmit } from '../../state/wallet/wallet.action';
import { ProfilRepo } from '../../state/profil/profil.store';
import { Profil } from '../../state/profil/profil.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone:true,
  imports: [MatButtonModule, MatDialogModule,
  MatSidenavModule,MatIconModule,CommonModule,
  WalletComponent],
})
export class HomeComponent implements OnInit {
  constructor(
    private profilRepo: ProfilRepo,
    public dialog: MatDialog,
    private router: Router
  ) {}


  cards = [
    {
      title: 'Suite',
      text: 'Description pour la carte 1',
      moreDetails: 'Plus de détails sur la carte 1',
      imageUrl: '../../../assets/Suite.png',
    },
    {
      title: 'Standard',
      text: 'Description pour la carte 2',
      moreDetails: 'Plus de détails sur la carte 2',
      imageUrl: '../../../assets/Standard.png',
    },
    {
      title: 'Superieur',
      text: 'Description pour la carte 3',
      moreDetails: 'Plus de détails sur la carte 3',
      imageUrl: '../../../assets/Superieur.png',
    },
  ];

  
  profil:Observable<Profil> = this.profilRepo.getFirstEntity();

  ngOnInit(): void {
    dispatch(listRoomSubmit);
    this.profil.subscribe((profil:Profil) => {
      dispatch(walletSubmit({walledId:profil.walletId}))
    })
  }

  getDetail(index: number) {
    const selectedCard = this.cards[index];
    console.log(`Details for card: ${selectedCard.title}`);

    const dialogRef = this.dialog.open(DetailsRoomComponent, {
      data: selectedCard ,
      
    });
    var y :Params | undefined;
    dialogRef.afterClosed().pipe(
    ).subscribe((x:any)=>{
      console.log(x);
      y=x
    })
    this.router.navigate(['makeReserveation']);
  }
}

