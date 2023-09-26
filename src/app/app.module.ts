import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SingleComponent } from './single/single.component';
import { LoginComponent } from './login/login.component';
import { CallbackthaidComponent } from './callbackthaid/callbackthaid.component';
import { CallbackmymophComponent } from './callbackmymoph/callbackmymoph.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from './alert.service';
import { ServiceService } from './service.service';
import { AuthGuardService } from './auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { SingleCommitteeComponent } from './single-committee/single-committee.component';
import { TeamComponent } from './team/team.component';
import { ScoreComponent } from './score/score.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}


@NgModule({
  declarations: [
    AppComponent,
    SingleComponent,
    LoginComponent,
    CallbackthaidComponent,
    CallbackmymophComponent,
    SingleCommitteeComponent,
    TeamComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['dev.moph.go.th', 'localhost']
      },
    }),
  ],
  providers: [
    AlertService,
    ServiceService,
    AuthGuardService,
    // { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: 'API_URL', useValue: environment.apiUrl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
