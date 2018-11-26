import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, icon: any }>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.pages = [
      { title: 'DASH BOARD', component: 'DashboardPage', icon:'ios-calendar-outline' },
      { title: 'QR CODE', component: 'QrScanPage', icon:'ios-qr-scanner-outline' },
      { title: 'SEND', component: 'CouponUpPage', icon:'ios-share-outline' },
      { title: 'RECEIVE', component: 'IndexPage', icon:'ios-download-outline' },
      { title: 'EXCH LIST', component: 'ExchangeListPage', icon:'ios-list-box-outline' },
      { title: 'PROFILE', component: 'ProfilePage', icon:'ios-create-outline' }, 
      { title: 'RECEIPT', component: 'ReceiptPage', icon:'ios-paper-outline' } 
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }

  openPage(page) {
    console.log(page.component);
    this.navCtrl.push(page.component);
  }

  dashBoard() {
    this.navCtrl.push('DashboardPage');
  }

  scan() {
    this.navCtrl.push('QrScanPage');
  }

  search() {
    this.navCtrl.push('ExchangeListPage');
  }

  couponUp() {
    this.navCtrl.push('CouponUpPage');
  }

  profile() {
    this.navCtrl.push('ProfilePage');
  }

  settings() {
    this.navCtrl.push('SettingsPage');
  }
}
