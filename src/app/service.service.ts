import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient
  ) { }

  options: any = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }

  async loginThaid(code: any) {
    const url = `${this.apiUrl}/login/thaid`;
    const rs: any = await this.http.post(url, { code: code }, this.options).toPromise();
    return rs;
  }
  async loginMyMoph(code: any) {
    const url = `${this.apiUrl}/login/mymoph`;
    const rs: any = await this.http.post(url, { code: code }, this.options).toPromise();
    return rs;
  }

  async getCandidate() {
    const url = `${this.apiUrl}/votec/candidate`;
    const rs: any = await this.http.get(url, this.options).toPromise();
    return rs;
  }

  async vote(id: any) {
    const url = `${this.apiUrl}/vote/single`;
    const rs: any = await this.http.post(url, { id: id }, this.options).toPromise();
    return rs;
  }

  async voteCom(id: any, data: any) {
    const url = `${this.apiUrl}/votec/single-committee`;
    const rs: any = await this.http.post(url, { sessionId: id, data: data }, this.options).toPromise();
    return rs;
  }

  async getVote() {
    const url = `${this.apiUrl}/vote/single`;
    const rs: any = await this.http.get(url, this.options).toPromise();
    return rs;
  }
  async getVoteCom(sid: any) {
    const url = `${this.apiUrl}/votec/single-committee?sessionId=${sid}`;
    const rs: any = await this.http.get(url, this.options).toPromise();
    return rs;
  }

  async getVoteTeam(sid: any) {
    const url = `${this.apiUrl}/votec/team?sessionId=${sid}`;
    const rs: any = await this.http.get(url, this.options).toPromise();
    return rs;
  }

  async voteTeam(id: any, data: any) {
    const url = `${this.apiUrl}/votec/team`;
    const rs: any = await this.http.post(url, { sessionId: id, data: data }, this.options).toPromise();
    return rs;
  }

  async scoreSingle() {
    const url = `${this.apiUrl}/score/single`;
    const rs: any = await this.http.get(url, this.options).toPromise();
    return rs;
  }
  async scoreTeam() {
    const url = `${this.apiUrl}/score/team`;
    const rs: any = await this.http.get(url, this.options).toPromise();
    return rs;
  }

  async updateImage(id: any, urlImg: any) {
    const url = `${this.apiUrl}/img`;
    const rs: any = await this.http.put(url, { id: id, url: urlImg }, this.options).toPromise();
    return rs;
  }

  uploadFile(files: File | null, id: any) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      if (files) {
        formData.append('files', files, files.name);
        formData.append('id', id);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      // const token: any = sessionStorage.getItem('token');
      const url = `https://dev.trantech.co.th/api/document/uploads?&documentCode=${id}`;
      // i.image_url = `${this.docUrl}/uploads/files/${i.image_url}`;
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }
}
