import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponUpPage } from './coupon-up';
import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  declarations: [
    CouponUpPage,
  ],
  imports: [
    IonicPageModule.forChild(CouponUpPage),
    AngularDraggableModule
  ],
  providers: [
  ]
})
export class CouponUpPageModule {}
