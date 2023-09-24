import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  candidateId: any;
  list: any = [];
  isSave = false;
  constructor(
    private service: ServiceService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getVote();
    this.getCandidate();
  }

  async getVote() {
    try {
      const rs: any = await this.service.getVote();
      if (rs.ok) {
        if (rs.rows.length) {
          this.candidateId = rs.rows[0].candidate_id;
        }
      } else {
        this.alertService.serverError();
      }
    } catch (error: any) {
      this.alertService.error(error.message);
    }
  }

  async getCandidate() {
    try {
      const rs: any = await this.service.getCandidate();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error: any) {
      this.alertService.error(error.message);
    }
  }

  async vote(data: any) {
    try {
      this.isSave = true;
      const confirm = await this.alertService.confirm(`คุณต้องการโหวตให้ ${data.name} ใช่หรือไม่?`);
      if (confirm) {
        const rs: any = await this.service.vote(data.id);
        if (rs.ok) {
          this.candidateId = data.id;
          this.alertService.success('Vote เรียบร้อยแล้ว', 'หากต้องการเปลี่ยนให้ Vote คนอื่นได้เลย');
        }
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;

    }
  }

}
