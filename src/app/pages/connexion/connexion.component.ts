import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CredentialUser } from '../../state/auth/auth.model';
import { loginSubmit } from '../../state/auth/auth.action';
import { dispatch } from '@ngneat/effects';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule]
})
export class ConnexionComponent implements OnInit {
  constructor(private readonly fb: UntypedFormBuilder){

  }
  formConnexion: UntypedFormGroup | undefined;
  formInscription: UntypedFormGroup | undefined;
  isFlipped: boolean = false;
email: string="";
password: string="";
emailIns: string="";
passwordIns:string="";
nom:string="";
prenom:string="";

ngOnInit() {
  this.formConnexion = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],

  });
  this.formInscription = this.fb.group({
    emailIns: ['', Validators.required],
    passwordIns: ['', Validators.required],
    nom:['',Validators.required],
    prenom:['',Validators.required]
  })
}



  toggleFlip() {

    this.isFlipped = !this.isFlipped;
  }


  login(): void {
    const credential = this.formConnexion?.value as CredentialUser;
    this.formConnexion?.markAllAsTouched();
    if (this.formConnexion?.invalid) {
      return;
    }
    dispatch(loginSubmit({ credential }));
  }

  
  signup(): void {
    const credential = this.formInscription?.value as CredentialUser;
      this.formInscription?.markAllAsTouched();
    if (this.formInscription?.invalid) {
      return;
    }
    dispatch(loginSubmit({ credential }));
  }
}
