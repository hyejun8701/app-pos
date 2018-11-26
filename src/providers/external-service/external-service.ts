import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as CryptoJS from 'crypto-js';
import { environment } from "../../environments/environment";

@Injectable()
export class ExternalServiceProvider {
  protected SERVER: string;
  protected headers: HttpHeaders;
  private SECURITY_KEY = CryptoJS.enc.Hex.parse(CryptoJS.MD5('apitest').toString());

  constructor(public http: HttpClient) {
    console.log('Hello ExternalServiceProvider Provider');

    // dev 빌드 시 사용
    //this.SERVER = `${environment.HOST}`;

    // prod 빌드 시 사용
    this.SERVER = 'http://api.stepin.xmerce.com/external';

    this.headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  exchangeQuery(barcodeNum: string) {
    return new Promise((resolve, rejected)  => {
      let postData = {
        "tr_id": "app-pos_" + moment().format("YYYYMMDDHHmmss"),
        "coupon_num": barcodeNum,
        "collect_mobile": "",
        "rcompany_id": "EC0001",
        "branch_code": "xmerce_test",
        "branch_name": "엑스머스테스트",
        "exedate": "",
        "site_user_id": "",
        "branch_group_id": ""
        }

      this.http.post(this.SERVER + '/exchangeQuery.do', JSON.stringify(postData), {headers: this.headers}).subscribe((res: any) => {
        var dec = CryptoJS.AES.decrypt(res.coupon_num, this.SECURITY_KEY, {iv: this.SECURITY_KEY}).toString(CryptoJS.enc.Utf8);
        res.dec_coupon_num = this.replaceMiddle(dec, 4);
        res.barcodeinfo.exchange_enddate = moment(res.barcodeinfo.exchange_enddate).format("YYYY-MM-DD");
        res.result_msg = decodeURIComponent((res.result_msg).toString().replace(/\+/g, '%20'));
        resolve(res);
      }, err => {
        rejected(err);
      });
    });
  }

  exchangeBarcode(barcodeNum: string, usePrice: number) {
    return new Promise(resolve => {
      let postData = {
        "tr_id": "app-pos_" + moment().format("YYYYMMDDHHmmss"),
        "coupon_num": barcodeNum,
        "collect_mobile": "",
        "use_amount": usePrice,
        "rcompany_id": "EC0001",
        "branch_code": "xmerce_test",
        "branch_name": "엑스머스테스트",
        "exedate": "",
        "site_user_id": "",
        "branch_group_id": ""
        }

      this.http.post(this.SERVER + '/exchangeBarcode.do', JSON.stringify(postData), {headers: this.headers}).subscribe((data: any) => {
        data.result_msg = decodeURIComponent((data.result_msg).toString().replace(/\+/g, '%20'));
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  exchangeList() {
    return new Promise((resolve, rejected)  => {
      let postData = {
        "tr_id": "app-pos_" + moment().format("YYYYMMDDHHmmss"),
        "rcompany_id": "EC0001",
        "branch_code": "xmerce_test",
        "branch_name": "엑스머스테스트",
        "exedate": "",
        }

      this.http.post(this.SERVER + '/app_pos/exchangeList.do', JSON.stringify(postData), {headers: this.headers}).subscribe((res: any) => {
        res.exchangeList.forEach(element => {
          console.log(element);
          var dec = CryptoJS.AES.decrypt(element.barcode_num, this.SECURITY_KEY, {iv: this.SECURITY_KEY}).toString(CryptoJS.enc.Utf8);
          element.dec_coupon_num = this.replaceMiddle(dec, 4);
          element.dec_receivermobile = CryptoJS.AES.decrypt(element.receivermobile, this.SECURITY_KEY, {iv: this.SECURITY_KEY}).toString(CryptoJS.enc.Utf8);
          element.exchange_date = moment(element.exchange_date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm");
        });
        res.result_msg = decodeURIComponent((res.result_msg).toString().replace(/\+/g, '%20'));
        resolve(res);
      }, err => {
        rejected(err);
      });
    });
  }

  exchangeCancel(barcodeNum: string, admitNum: string, cancelPrice: number) {
    return new Promise(resolve => {
      let postData = {
        "tr_id": "app-pos_" + moment().format("YYYYMMDDHHmmss"),
        "coupon_num": barcodeNum,
        "collect_mobile": "",
        "rcompany_id": "EC0001",
        "branch_code": "xmerce_test",
        "branch_name": "엑스머스테스트",
        "cancel_amount": cancelPrice,
        "admit_num": admitNum,
        "exedate": "",
        "site_user_id": "",
        "branch_group_id": ""
        }

      this.http.post(this.SERVER + '/exchangeCancel.do', JSON.stringify(postData), {headers: this.headers}).subscribe((data: any) => {
        data.result_msg = decodeURIComponent((data.result_msg).toString().replace(/\+/g, '%20'));
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  replaceMiddle(string, n) {
    var rest = string.length - n;
    if(string.length > 12) {
      return string.slice(0, 8) + '*'.repeat(n) + string.slice(rest);
    }
    return string.slice(0, Math.ceil(rest / 2) + 1) + '*'.repeat(n) + string.slice(-Math.floor(rest / 2) + 1);
  };
}
