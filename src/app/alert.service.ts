import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'
import { SweetAlertOptions } from 'sweetalert2'

@Injectable()
export class AlertService {

  constructor() { }

  error(text: any = 'เกิดข้อผิดพลาด') {

    const option: SweetAlertOptions = {
      // title: 'เกิดข้อผิดพลาด',
      text: text,
      icon: 'error',
      // confirmButtonText: 'ตกลง'
      showConfirmButton: true,
      // timer: 1500
    };
    Swal.fire(option);

  }

  success(title = 'ดำเนินการเสร็จเรียบร้อย', text = '') {

    const option: SweetAlertOptions = {
      title: title,
      text: text,
      timer: 3000,
      icon: 'success',
      confirmButtonText: 'ตกลง'
    };
    Swal.fire(option)
      .then(
        function () { },
        // handling the promise rejection
        function (dismiss) {
          if (dismiss === 'timer') { }
        }
      );

  }

  serverError() {

    const option: SweetAlertOptions = {
      // title: 'เกิดข้อผิดพลาด',
      text: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
      icon: 'error',
      // confirmButtonText: 'ตกลง',
      showConfirmButton: false,
      timer: 3000
    };
    Swal.fire(option);

  }

  confirm(text = 'คุณต้องการดำเนินการนี้ ใช่หรือไม่?') {
    const option: SweetAlertOptions = {
      title: '',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ดำเนินการ!',
      cancelButtonText: 'ยกเลิก'
    };
    return Swal.fire(option);
  }

  popup(title = '', text = '') {
    const option: SweetAlertOptions = {
      title: title,
      html: text,
      icon: 'success',
      confirmButtonText: 'ตกลง',
      width: '700px'
    };
    Swal.fire(option)
      .then(
        function () { },
        // handling the promise rejection
        function (dismiss: any) {
          if (dismiss === 'timer') { }
        }
      );

  }
}
