import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  single: any = [];
  team: any = [];
  constructor(private service: ServiceService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.getList();
    this.getListTeam();
  }

  async getList() {
    try {
      const rs: any = await this.service.scoreSingle();
      if (rs.ok) {
        this.single = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getListTeam() {
    try {
      const rs: any = await this.service.scoreTeam();
      if (rs.ok) {
        this.team = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

}
