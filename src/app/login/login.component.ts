import { Component } from '@angular/core';
import { customAlphabet } from 'nanoid'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  goToThaiD() {
    const nanoid = customAlphabet('1234567890', 18)
    const state = nanoid();
    const clientId = 'eUpBa3lHVzBnWVVuU1p0bFE0cElqZmdIYlpteVN3aVo';
    var url = encodeURIComponent('https://dev.moph.go.th/vote/callbackthaid');
    location.href =
      `https://imauth.bora.dopa.go.th/api/v2/oauth2/auth/?response_type=code&client_id=${clientId}&redirect_uri=${url}&scope=pid&state=${state}`;
  }

  goToMyMOPH() {
    const nanoid = customAlphabet('1234567890', 18)
    const state = nanoid();
    const clientId = 'LJowyMonNUhrQYREApKD';
    // var url = encodeURIComponent('https://dev.moph.go.th/vote/callbackthaid');
    location.href =
      `https://auth.moph.go.th/v1/oauth2/auth?client_id=${clientId}&response_type=code&state=${state}`;
  }


}
