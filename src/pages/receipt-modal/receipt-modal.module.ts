import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptModalPage } from './receipt-modal';

@NgModule({
  declarations: [
    ReceiptModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptModalPage),
  ],
})
export class ReceiptModalPageModule {}
