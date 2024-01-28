import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { HomeComponent } from './pages/home/home.component';
import { RouteReuseStrategy } from '@angular/router';
import { provideEffectsManager, provideEffects } from '@ngneat/effects-ng';
import { SessionEffects } from './state/auth/auth.effect';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilEffects } from './state/profil/profil.effect';
import { WalletEffects } from './state/wallet/wallet.effect';
import { ListRoomEffects } from './state/listRoom/listRoom.effect';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConnexionComponent,
    HomeComponent,
    HttpClientModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    BrowserAnimationsModule
  ],
  providers: [
    provideEffectsManager(),
    provideEffects(
      SessionEffects,
      ProfilEffects,
      WalletEffects,
      ListRoomEffects
    ),
      HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
