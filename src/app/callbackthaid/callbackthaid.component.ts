import { AlertService } from './../alert.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-callbackthaid',
  templateUrl: './callbackthaid.component.html',
  styleUrls: ['./callbackthaid.component.css']
})
export class CallbackthaidComponent implements OnInit {

  code: any;
  state: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private service: ServiceService) {
    const q: any = this.route.snapshot.queryParams;
    this.code = q.code;
    this.state = q.state;
  }
  async ngOnInit(): Promise<void> {
    try {
      const rs: any = await this.service.loginThaid(this.code);
      if (rs.ok) {
        localStorage.setItem('token', rs.token);
        this.router.navigate(['/single']);
      } else {
        this.alertService.error(rs.error);
        this.router.navigate(['/login']);
      }
    } catch (error) {
      this.alertService.error(error);
      this.router.navigate(['/login']);
    }
  }

}
