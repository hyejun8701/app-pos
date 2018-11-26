import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    ChartsModule,
    IonicPageModule.forChild(DashboardPage),
  ],
})
export class DashboardPageModule {}
