import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular'
import { Network } from '@ionic-native/network'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable()
export class NetworkServiceProvider {

  public status: ConnectionStatus;
  private _status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(null);

  constructor(public http: HttpClient,
              public network: Network,
              public events: Events) {
    console.log('Hello NetworkServiceProvider Provider');

    this.status = ConnectionStatus.Online;
  }

  public initializeNetworkEvents(): void {

    console.log('Subscribe to onDisconnect events');
    /* OFFLINE */
    this.network.onDisconnect().subscribe(() => {
        if (this.status === ConnectionStatus.Online) {
            this.setStatus(ConnectionStatus.Offline);
        }
    })

    console.log('Subscribe to onConnect events');
    /* ONLINE */
    this.network.onConnect().subscribe(() => {
        if (this.status === ConnectionStatus.Offline) {
            this.setStatus(ConnectionStatus.Online);
        }
    })
  }

  public getNetworkType(): string {
      return this.network.type
  }

  public getNetworkStatus(): Observable<ConnectionStatus> {
      return this._status.asObservable();
  }

  private setStatus(status: ConnectionStatus) {
      this.status = status;
      this._status.next(this.status);
  }
}
