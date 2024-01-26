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
import { WalletComponent } from './pages/home/wallet/wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConnexionComponent,
    HomeComponent,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideEffectsManager(),
    provideEffects(
      SessionEffects,
    ),
      HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
