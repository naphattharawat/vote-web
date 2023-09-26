
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { AlertService } from '../alert.service';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-single-committee',
  templateUrl: './single-committee.component.html',
  styleUrls: ['./single-committee.component.css']
})
export class SingleCommitteeComponent {

  list: any = [];
  isSave = false;
  score = 15;
  sessionId: any;
  oldScore: any = [];
  constructor(
    private service: ServiceService,
    private alertService: AlertService
  ) { }

  async ngOnInit(): Promise<void> {
    console.log(Boolean(localStorage.getItem('vote_session_id')));

    if (!localStorage.getItem('vote_session_id')) {
      this.sessionId = localStorage.setItem('vote_session_id', uuidv4())
      this.sessionId = localStorage.getItem('vote_session_id')
    } else {
      this.sessionId = localStorage.getItem('vote_session_id')
    }
    await this.getVote();
    await this.getCandidate();
  }

  async getVote() {
    try {
      const rs: any = await this.service.getVoteCom(this.sessionId);
      if (rs.ok) {
        this.oldScore = rs.rows;
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
        for (const r of rs.rows) {
          const idx = _.findIndex(this.oldScore, { 'candidate_id': r.id });
          if (idx > -1) {
            r.score = this.oldScore[idx].score;
            this.score -= this.oldScore[idx].score;
          } else {
            r.score = 0;
          }
        }
        this.list = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error: any) {
      this.alertService.error(error.message);
    }
  }

  async vote() {
    try {
      this.isSave = true;
      const confirm = await this.alertService.confirm(`คุณต้องการให้คะแนน ใช่หรือไม่?`);
      if (confirm) {
        const rs: any = await this.service.voteCom(this.sessionId, this.list);
        if (rs.ok) {
          this.alertService.success('ให้คะแนนเรียบร้อยแล้ว', 'หากต้องการเปลี่ยนคะแนน ให้เปลี่ยนคะแนนและกดส่งใหม่');
        }else{
          this.alertService.error(rs.error);
        }
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;

    }
  }


  onMinus(i: any) {
    const idx = _.findIndex(this.list, { id: i.id });
    if (idx > -1) {
      if (this.list[idx].score >= 1) {
        this.list[idx].score--;
        this.score++;
      }
    }
  }


  onPlus(i: any) {
    const idx = _.findIndex(this.list, { id: i.id });
    if (idx > -1) {
      if (this.score > 0) {
        this.score--;
        this.list[idx].score++;
      }
    }
  }
}
