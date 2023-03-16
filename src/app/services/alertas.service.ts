import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  constructor() {}

  alertaSimple(icon: SweetAlertIcon, text: string) : Promise<any> {
   return Swal.fire({
      icon: icon,
      html: text,
      background: '#FFFDD0',
    });
  }
  alertaToast(icon: SweetAlertIcon, text:string): Promise<any>{
   return Swal.fire({
      toast: true,
      icon: icon,
      title: text,
      position: 'top-right',
      iconColor: 'green',
      background: '#FFFDD0',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  }
}
