import { Component } from "@angular/core";
import { Platform, ToastController, AlertController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { NetworkServiceProvider } from "../providers/network-service/network-service";
import { FCM } from "@ionic-native/fcm";
import { Firebase } from "@ionic-native/firebase";
import { Push, PushObject, PushOptions } from "@ionic-native/push";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = "LoginPage";

  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public networkServiceProvider: NetworkServiceProvider,
    public toastCtrl: ToastController,
    private fcm: FCM,
    private firebase: Firebase,
    private push: Push,
    private alertCtrl: AlertController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      firebase
        .getToken()
        .then(token => console.log(token))
        .catch(err => console.log(err));
      firebase.onNotificationOpen().subscribe(
        data => {
          console.log(data);
          console.log(data.name);
        },
        err => console.log(err)
      );

      this.initNetwork();

      statusBar.styleDefault();
      splashScreen.hide();
      statusBar.overlaysWebView(false);

      this.initPushNotification();
    });
  }

  initNetwork(): void {
    this.networkServiceProvider.initializeNetworkEvents();

    console.log(this.networkServiceProvider.getNetworkType());

    if (this.networkServiceProvider.getNetworkType() == "none") {
      this.exitApp();
    }
  }

  exitApp() {
    let toast = this.toastCtrl.create({
      message: "네트워크 연결을 확인해주세요.",
      duration: 1800,
      position: "middle"
    });

    toast.onDidDismiss(() => {
      this.platform.exitApp();
    });

    toast.present();
  }

  initPushNotification() {
    // to check if we have permission
    this.push.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        console.log("We have permission to send push notifications");
      } else {
        console.log("We don't have permission to send push notifications");
      }
    });

    // to initialize push notifications
    const options: PushOptions = {
      android: {
        senderID: "1067563470221"
      },
      ios: {
        alert: "true",
        badge: true,
        sound: "false"
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);
    pushObject.on("notification").subscribe((notification: any) => {
      console.log("Received a notification", notification);
      //Notification Display Section
      let confirmAlert = this.alertCtrl.create({
        title: "New Notification",
        message: JSON.stringify(notification),
        buttons: [
          {
            text: "Ignore",
            role: "cancel"
          },
          {
            text: "View",
            handler: () => {
              //TODO: Your logic here
              //self.nav.push(DetailsPage, {message: data.message});
            }
          }
        ]
      });
      confirmAlert.present();
      //
    });
    pushObject
      .on("registration")
      .subscribe((registration: any) =>
        console.log("Device registered", registration)
      );
    pushObject
      .on("error")
      .subscribe(error => console.error("Error with Push plugin", error));
  }
}
