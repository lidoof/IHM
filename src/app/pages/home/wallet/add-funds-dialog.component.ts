import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { dispatch } from '@ngneat/effects';
import { addFoundSubmit, walletSubmit } from '../../../state/wallet/wallet.action';
import { Observable } from 'rxjs';
import { Wallet } from '../../../state/wallet/wallet.model';
import { WalletRepo } from '../../../state/wallet/wallet.store';


@Component({
  selector: 'app-add-funds-dialog',
  templateUrl: './add-funds-dialog.component.html',
  styleUrls: ['./add-funds-dialog.component.scss'],
  standalone:true,
  imports: [MatDialogModule, MatButtonModule,MatFormFieldModule,MatInputModule,MatSelectModule,FormsModule]
})
export class AddFundsDialogComponent implements OnInit {

    amount!: number;
    currency!: string;
  constructor(
    public dialogRef: MatDialogRef<AddFundsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
      private walletRepo: WalletRepo) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  wallet$:Observable<Wallet> = this.walletRepo.getFirstEntity()

  ngOnInit(): void {
   
  }


  addFound() {
      if(!this.amount){
        alert('vous devez selectionner un montant')
      } else if(this.currency !==('EUR' || 'USD')){
        alert('vous devez selectionnez une devise')
      } else {
        this.wallet$.subscribe((wallet :Wallet ) => {
          dispatch(addFoundSubmit({currency:this.currency,montant:this.amount,walletId:wallet.id}))
        })
      }
    }
}
