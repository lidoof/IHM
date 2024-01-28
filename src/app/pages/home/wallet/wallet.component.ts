import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { AddFundsDialogComponent } from './add-funds-dialog.component';
import { WalletRepo } from '../../../state/wallet/wallet.store';
import { Observable } from 'rxjs';
import { Wallet } from '../../../state/wallet/wallet.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  standalone:true,  
  imports: [MatDialogModule,AddFundsDialogComponent,CommonModule],
})
export class WalletComponent implements OnInit {
  constructor(public dialog: MatDialog,
              private wallet: WalletRepo) {}


wallet$:Observable<Wallet> = this.wallet.getFirstEntity();
  
  ngOnInit(): void {
      this.wallet$.subscribe((wallet:Wallet) => {
        console.log("wallet: ",wallet)
      })
  }
  openAddFundsDialog(): void {
    this.wallet$.subscribe((wallet:Wallet) => {
      console.log("wallet: ",wallet)
    })
    const dialogRef = this.dialog.open(AddFundsDialogComponent, {
      panelClass: 'mat-dialog-container' // Ajoutez cette classe pour cibler avec CSS
    });
  
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Traiter le résultat ici si nécessaire
    });
  }
}
