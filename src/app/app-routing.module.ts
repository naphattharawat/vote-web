import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleComponent } from './single/single.component';
import { LoginComponent } from './login/login.component';
import { CallbackthaidComponent } from './callbackthaid/callbackthaid.component';
import { CallbackmymophComponent } from './callbackmymoph/callbackmymoph.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'single', component: SingleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'callbackthaid', component: CallbackthaidComponent },
  { path: 'callbackmymoph', component: CallbackmymophComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
