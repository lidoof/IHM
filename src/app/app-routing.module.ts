import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'sign-in',
  loadComponent: () => import('../app/pages/connexion/connexion.component').then((c) => c.ConnexionComponent),},
  {
    path:'home',
    loadComponent: () => import('../app/pages/home/home.component').then((c) => c.HomeComponent),
  },
  {path:'',
    redirectTo:'sign-in',
  pathMatch:'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
