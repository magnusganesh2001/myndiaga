import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private toastController:ToastController) { }

 async successToast(msg:string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  async errorToast(msg:string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }
  async warnToast(msg:string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'warning',
    });
    toast.present();
  }

}
