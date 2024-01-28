import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { dispatch } from '@ngneat/effects';
import { Currency, addFoundSubmit, walletSubmit } from '../../../state/wallet/wallet.action';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProfilRepo } from '../../../state/profil/profil.store';
import { Profil } from '../../../state/profil/profil.model';


@Component({
  selector: 'app-add-funds-dialog',
  templateUrl: './add-funds-dialog.component.html',
  styleUrls: ['./add-funds-dialog.component.scss'],
  standalone:true,
  imports: [MatDialogModule, MatButtonModule,MatFormFieldModule,MatInputModule,MatSelectModule,FormsModule,
    CommonModule,ReactiveFormsModule]
})
export class AddFundsDialogComponent implements OnInit {

    amount!: number;
    preferredCurrency!: Currency;
  constructor(
    public dialogRef: MatDialogRef<AddFundsDialogComponent>,
    private fb :UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
      private profilRepo: ProfilRepo) {}
      readonly typecurrency = Currency;

    form!: UntypedFormGroup
  onNoClick(): void {
    this.dialogRef.close();
  }

  profil$:Observable<Profil> = this.profilRepo.getFirstEntity()

  ngOnInit(): void {
    this.form = this.fb.group({
      amount:[null,Validators.required],
      preferredCurrency:[null,Validators.required]
    })
    this.profil$.subscribe((wallet:Profil) => {
      console.log("wallet: ",wallet)
    })  
  }


  addFound() {
    console.log("form:",this.form.value)
        this.profil$.subscribe((wallet :Profil ) => {
          console.log(wallet)
          dispatch(addFoundSubmit({currency:this.form.get('preferredCurrency')?.value,
          montant:this.form.get('amount')?.value,walletId:wallet.walletId}))
        })

    }
}
