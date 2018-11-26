import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalOptions, Modal, ModalController } from 'ionic-angular';
import { ExternalServiceProvider } from '../../providers/external-service/external-service';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {
  list;
  startDate: string = new Date().toISOString();
  endDate: string = new Date().toISOString();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private externalServiceProvider: ExternalServiceProvider,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
    this.startDate = moment(new Date()).add(-1, 'month').toISOString();
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

  dateCheck() {
    let alert = this.alertCtrl.create({
      title: '기간 선택',
      inputs: [
        {
          type: 'radio',
          label: '최근 1개월',
          value: '1M'
        },
        {
          type: 'radio',
          label: '최근 3개월',
          value: '3M'
        },
        {
          type: 'radio',
          label: '최근 6개월',
          value: '6M'
        },
        {
          type: 'radio',
          label: '최근 1년',
          value: '1Y'
        }
      ],
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        }
      },
      {
        text: 'OK',
        handler: (data) => {
          console.log(data);
          switch (data) {
            case '1M':
              this.startDate = moment(new Date()).add(-1, 'month').toISOString();
              break;
            case '3M':
              this.startDate = moment(new Date()).add(-3, 'month').toISOString();
              break;
            case '6M':
              this.startDate = moment(new Date()).add(-6, 'month').toISOString();
              break;
            case '1Y':
              this.startDate = moment(new Date()).add(-1, 'year').toISOString();
              break;
            default:
              break;
          }
          this.exchangeList('', this.startDate, this.endDate);
        }
      }
    ],
    enableBackdropDismiss: false
    });
  alert.present();
  }

  popReceipt() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false,
      cssClass: 'customModal'
    };

    const myModalData = {
      name: 'Paul Halliday',
      occupation: 'Developer'
    };

    const myModal: Modal = this.modalCtrl.create('ReceiptModalPage', { data: myModalData }, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data) => {
      console.log(data);
    });

    myModal.onWillDismiss((data) => {
      console.log(data);
    });
  }

}
