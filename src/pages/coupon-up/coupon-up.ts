import { Component, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-coupon-up',
  templateUrl: 'coupon-up.html',
})
export class CouponUpPage {
  private returnX: string;
  private returnY: string;
  private el: HTMLElement;

  inBounds = true;
  edge = {
    top: true,
    bottom: false,
    left: false,
    right: false
  };

  trackPosition = false;
  position = {"x": 0, "y": 0};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private elementRef: ElementRef,
              private renderer: Renderer2,
              private toastCtrl: ToastController) {
    this.el = elementRef.nativeElement;
  }

  checkEdge(event) {
    //this.edge = event;
    //console.log('edge:', event);
  }

  onDragBegin(e: HTMLElement) {
    //console.log(e);
    e.style.position = 'relative';
    e.style.zIndex = '1';
  }

  onDragEnd(e: HTMLElement) {
    console.log(e);
    e.style.position = '';
    e.style.zIndex = '';
    //this.position = {"x": 0, "y": 0};
  }

  onMoving(e) {
    console.log(e);
  }
  
  onMoveEnd(e) {
    console.log(e);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponUpPage');
  }

  swipeAll(event: any): any {
    console.log('Swipe All', event);
  }

  swipeLeft(event: any): any {
      console.log('Swipe Left', event);
  }

  swipeRight(event: any): any {
      console.log('Swipe Right', event);
  }

  swipeUp(event: any): any {
      console.log('Swipe Up', event);
      //this.pan++;
      //this.el.getElementsByClassName('scroll-content').item(0).setAttribute('style', 'top: -30px;');
      //this.el.getElementsByClassName('card').item(0).setAttribute('style', 'opacity: 0; height: 80px; transition: .1s ease-in-out all;');
      //this.el.getElementsByClassName('scroll-content').item(0).setAttribute('style', 'transform: translateY(-1%);');
      //this.el.getElementsByClassName('card').item(0).setAttribute('style', 'transform: translateY(' + (--this.pan) + 'px);');
  }

  swipeDown(event: any): any {
      console.log('Swipe Down', event);
      //this.pan--;
      //console.log(event.target.closest('ion-card'));
      //this.el.getElementsByClassName('scroll-content').item(0).setAttribute('style', 'top: 1px;');
      //this.el.getElementsByClassName('scroll-content').item(0).setAttribute('style', 'top: 30px;');
      //this.el.getElementsByClassName('scroll-content').item(0).setAttribute('style', 'transform: translateY(1%);');
      //this.el.getElementsByClassName('card').item(0).setAttribute('style', 'transform: translateY(' + (this.pan++) + 'px);');
  }

}
