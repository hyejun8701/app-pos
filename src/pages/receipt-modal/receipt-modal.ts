import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-receipt-modal',
  templateUrl: 'receipt-modal.html',
})
export class ReceiptModalPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
