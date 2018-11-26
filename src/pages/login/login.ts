import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  private username: string = 'xmerce';
  private password: string = '1234';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authServiceProvider: AuthServiceProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
 
  public login() {
    this.showLoading()
    this.authServiceProvider.login(this.username, this.password).subscribe(allowed => {
      if (allowed) {        
        this.navCtrl.setRoot('IndexPage');
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
