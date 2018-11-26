import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { ExternalServiceProvider } from '../providers/external-service/external-service';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Network } from '@ionic-native/network';
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { AngularDraggableModule } from 'angular2-draggable';
import { ChartsModule } from 'ng2-charts';
import { FcmProvider } from '../providers/fcm/fcm';
import { FCM } from '@ionic-native/fcm';
import { Firebase } from '@ionic-native/firebase';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularDraggableModule,
    ChartsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Push,
    FCM,
    Firebase,
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    Device,
    Network,
    NetworkServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ExternalServiceProvider,
    LoginServiceProvider,
    AuthServiceProvider,
    NetworkServiceProvider,
    FcmProvider
  ]
})
export class AppModule {}
