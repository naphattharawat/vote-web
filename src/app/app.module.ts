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
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { ServiceService } from './service.service';

@NgModule({
  declarations: [
    AppComponent,
    SingleComponent,
    LoginComponent,
    CallbackthaidComponent,
    CallbackmymophComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AlertService,
    ServiceService,
    // { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: 'API_URL', useValue: environment.apiUrl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
