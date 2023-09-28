import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  list: any = [];

  constructor(
    private service: ServiceService,
    private alertService: AlertService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getCandidate();
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

  async uploadImg(data: any, i: any) {
    try {
      console.log(data);
      console.log(data.target.files[0]);
      const rs: any = await this.service.uploadFile(data.target.files[0], `VOTEVOTE-${i.id}`);
      console.log(rs);

      if (rs.ok) {
        rs.files[0].document_id
        const rs2: any = await this.service.updateImage(i.id, `https://dev.trantech.co.th/api/document/uploads/files/${rs.files[0].document_id}`)
        if (rs2.ok) {
          this.getCandidate();
          this.alertService.success();
        } else {
          this.alertService.error(rs2.error);
        }
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
