import { Component } from '@angular/core';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { AddFundsDialogComponent } from './add-funds-dialog.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  standalone:true,  
  imports: [MatDialogModule,AddFundsDialogComponent],
})
export class WalletComponent {
  constructor(public dialog: MatDialog) {}

  openAddFundsDialog(): void {
    const dialogRef = this.dialog.open(AddFundsDialogComponent, {
      panelClass: 'mat-dialog-container' // Ajoutez cette classe pour cibler avec CSS
    });
  
  

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Traiter le résultat ici si nécessaire
    });
  }
}
