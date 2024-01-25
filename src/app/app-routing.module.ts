import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleComponent } from './single/single.component';
import { LoginComponent } from './login/login.component';
import { CallbackthaidComponent } from './callbackthaid/callbackthaid.component';
import { CallbackmymophComponent } from './callbackmymoph/callbackmymoph.component';
import { AuthGuardService } from './auth-guard.service';
import { SingleCommitteeComponent } from './single-committee/single-committee.component';
import { TeamComponent } from './team/team.component';
import { ScoreComponent } from './score/score.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: '', redirectTo: 'single', pathMatch: 'full' },
  { path: 'single', canActivate: [AuthGuardService], component: SingleComponent },
  { path: 'single-committee', component: SingleCommitteeComponent },
  { path: 'team', component: TeamComponent },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'score', component: ScoreComponent },
  { path: 'callbackthaid', component: CallbackthaidComponent },
  { path: 'callbackmymoph', component: CallbackmymophComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
