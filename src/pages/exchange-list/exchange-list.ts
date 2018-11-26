import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ExternalServiceProvider } from '../../providers/external-service/external-service';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-exchange-list',
  templateUrl: 'exchange-list.html',
})
export class ExchangeListPage {
  list;
  startDate: string = new Date().toISOString();
  endDate: string = new Date().toISOString();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private externalServiceProvider: ExternalServiceProvider,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExchangeListPage');
    this.exchangeList('', this.startDate, this.endDate);
  }

  exchangeList(searchText: string, startDate: string, endDate: string) {
    this.externalServiceProvider.exchangeList().then((res: any) => {
      //console.log(res);
      this.list = res.exchangeList;
      //console.log(this.list);

      if(searchText && searchText.trim() != '') {
        this.list = this.list.filter((item) => {
        return (item.dec_receivermobile.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
        });
      }

      if((startDate && startDate.trim() != '') && (endDate && endDate.trim() != '')) {
        this.list = this.list.filter((item) => {
          var exchangeDate = moment(item.exchange_date, "YYYYMMDDHHmmss").format("YYYYMMDD");

          return (new Date(moment(item.exchange_date).format("YYYY-MM-DD")).getTime() >= new Date(moment(startDate).format("YYYY-MM-DD")).getTime()) && (new Date(moment(item.exchange_date).format("YYYY-MM-DD")).getTime() <= new Date(moment(endDate).format("YYYY-MM-DD")).getTime());
        });
      }
    }, err=> {
      console.log(err);
    });
  }

  exchangeCancel(item) {
    if(item.exchange_status == '1') {
      const confirm = this.alertCtrl.create({
        title: '취소확인',
        message: '취소를 진행하시겠습니까?',
        buttons: [
          {
            text: '취소',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: '확인',
            handler: () => {
              console.log('Agree clicked');
  
              this.externalServiceProvider.exchangeCancel(item.barcode_num, item.exchange_num, parseInt(item.use_price)).then((res: any) => {
                const alert = this.alertCtrl.create({
                  title: '결과',
                  subTitle: res.result_code == 'AUTH_SUCCESS_S0000' ? '취소처리 완료되었습니다.' : '취소처리 실패되었습니다.',
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

  getItems(ev, type: string) {
    if(type === 'S') {
      var val = ev.target.value;
      this.exchangeList(val, this.startDate, this.endDate);
    } else {
      this.exchangeList('', this.startDate, this.endDate);
    }
  }
}
