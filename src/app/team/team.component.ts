import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  list: any = [
    {
      "name": "ฝ่ายบริหารทั่วไป",
      "people": 13,
      "score_head": 0,
      "score_team": 0
    },
    {
      "name": "กลุ่มพัฒนามาตรฐานฯ",
      "people": 9,
      "score_head": 0,
      "score_team": 0
    },
    {
      "name": "กลุ่มพัฒนาการบริหารข้อมูล",
      "people": 8,
      "score_head": 0,
      "score_team": 0
    },
    {
      "name": "กลุ่มคอมพิวเตอร์และเครือข่าย",
      "people": 9,
      "score_head": 0,
      "score_team": 0
    },
    {
      "name": "กลุ่มบริหารเทคโนโลยีฯ",
      "people": 8,
      "score_head": 0,
      "score_team": 0
    },
    {
      "name": "กลุ่มพัฒนานวัตกรรมดิจิทัล",
      "people": 8,
      "score_head": 0,
      "score_team": 0
    },
  ]
  isSave = false;
  sessionId: any;
  oldScore: any = [];

  constructor(
    private alertService: AlertService,
    private service: ServiceService
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
  }

  async vote() {
    const confirm = await this.alertService.confirm('คุณต้องการที่จะส่งผลโหวต ใช่หรือไม่?');
    if (confirm) {
      let isError = false;
      for (const i of this.list) {
        if (i.score_head > 10 || i.score_team > 10) {
          this.alertService.error('มีคะแนนบางช่องเกิน 10 คะแนน')
          isError = true;
        } 
      }
      if (!isError) {
        const rs: any = await this.service.voteTeam(this.sessionId, this.list);
        if (rs.ok) {
          this.alertService.success('ให้คะแนนเรียบร้อยแล้ว', 'หากต้องการเปลี่ยนคะแนน ให้เปลี่ยนคะแนนและกดส่งใหม่');
        } else {
          this.alertService.error(rs.error);
        }
      }
    }
  }


  async getVote() {
    try {
      const rs: any = await this.service.getVoteTeam(this.sessionId);
      if (rs.ok) {
        this.oldScore = rs.rows;
        for (const i of rs.rows) {
          const idx = _.findIndex(this.list,{'name':i.name});
          if(idx > -1){
            this.list[idx].score_head = i.score_head;
            this.list[idx].score_team = i.score_team;
          }
        }
      } else {
        this.alertService.serverError();
      }
    } catch (error: any) {
      this.alertService.error(error.message);
    }
  }
}
