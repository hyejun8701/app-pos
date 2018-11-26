import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ExternalServiceProvider } from '../../providers/external-service/external-service';
import { Device } from '@ionic-native/device';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@IonicPage()
@Component({
  selector: 'page-qr-scan',
  templateUrl: 'qr-scan.html',
})
export class QrScanPage {
  scannedCode = null;
  result = null;
  usePrice:any = 0;
  isDisabled = true;
  enc_barcode_num: string = 'ZqyjrsAxe6HXqEiivj1RRwYvv5Ew5YPMotqHuzkKIaQ=';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private barcodeScanner: BarcodeScanner,
              private externalServiceProvider: ExternalServiceProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private device: Device,
              private androidPermissions: AndroidPermissions,
              private geolocation: Geolocation,
              private locationAccuracy: LocationAccuracy) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrScanPage');

    this.androidPermissions.requestPermissions(
      [
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
        this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
        this.androidPermissions.PERMISSION.ACCESS_LOCATION_EXTRA_COMMANDS,
        this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE
      ]).then((success)=>{
      //alert("aaa");
    
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
          //alert('Request successful');
        this.geolocation.getCurrentPosition({ timeout: 30000 }).then((resp) => {
            const alert = this.alertCtrl.create({
              title: '디바이스 정보',
              message: 'X: ' + resp.coords.longitude + ', Y: ' + resp.coords.latitude + '<br/>' + 'device cordova is: ' + this.device.cordova + '<br/>' + 'device model is: ' + this.device.model + '<br/>' + 'device platform is: ' + this.device.platform + '<br/>' + 'device uuid is: ' + this.device.uuid + '<br/>' + 'device version is: ' + this.device.version + '<br/>' + 'device manufacturer is: ' + this.device.manufacturer + '<br/>' + 'device isVirtual is: ' + this.device.isVirtual + '<br/>' + 'device serial is: ' + this.device.serial
              ,
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.scan();
                  }
                }
              ],
              enableBackdropDismiss: false
            });
            alert.present();
          }).catch((error) => {
            alert(error);
          });
        },
        error => console.log('Error requesting location permissions', error)
      );
    }).catch((error) => {
        alert("The following error occurred: "+error);
    });
   
  //  let watch = this.geolocation.watchPosition();
  //  watch.subscribe((data) => {
  //   console.log(data.coords.latitude);
  //   console.log(data.coords.longitude);
  //  });
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      if(!barcodeData.cancelled) {
        this.scannedCode = barcodeData.text;

        //this.scannedCode = this.enc_barcode_num;
        
        this.externalServiceProvider.exchangeQuery(this.scannedCode).then((res: any) => {
          if(res.result_code != 'AUTH_SUCCESS_S0000') {
            const alert = this.alertCtrl.create({
              title: '알림',
              subTitle: res.result_msg,
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.navCtrl.pop();
                  }
                }
              ],
              enableBackdropDismiss: false
            });
            alert.present();
          } else {
            this.result = res;
          }
        }, err => {
          const alert = this.alertCtrl.create({
            title: '알림',
            subTitle: '승인서버 연결 실패',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ],
            enableBackdropDismiss: false
          });
          alert.present();
        });
      } else {
        this.navCtrl.pop();
      }
    });
  }

  setKeypadNum(num: any) {
    const regex: RegExp = new RegExp("^[0-9]");

    if(regex.test(num)) {// number
      if(this.usePrice == '0') {
        this.usePrice = num;
      } else {
        this.usePrice += num;
      }
    } else if(num === 'C') {
      this.usePrice = 0;
    } else if(num === 'D') {
      var str = this.usePrice.toString();
      if(str.length > 1) {
        this.usePrice = parseInt(str.substr(0, str.length - 1));
      } else {
        this.usePrice = 0;
      }
    }

    var chk = this.usePrice.toString();
    if(chk != '0' && chk.length > 0) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  setUsePrice(price) {
    this.usePrice = price;
    this.isDisabled = false;
  }

  payment(price) {
    const confirm = this.alertCtrl.create({
      title: '결제확인',
      message: '총 결제금액 ' + price + '원<br/>진행하시겠습니까?',
      buttons: [
        {
          text: '취소',
          handler: () => {
            console.log('Disagree clicked');
            this.isDisabled = false;
          }
        },
        {
          text: '확인',
          handler: () => {
            console.log('Agree clicked');
            
            this.externalServiceProvider.exchangeBarcode(this.scannedCode, parseInt(this.usePrice)).then((res: any) => {
              const alert = this.alertCtrl.create({
                title: '결과',
                subTitle: res.result_code == 'AUTH_SUCCESS_S0000' ? '결제처리 완료되었습니다.' : '결제처리 실패되었습니다.',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      this.navCtrl.pop();
                    }
                  }
                ],
                enableBackdropDismiss: false
              });
              alert.present();
            }, err => {
              console.log(err);
            });
          }
        }
      ],
      enableBackdropDismiss: false
    });
    confirm.present();
  }
}
