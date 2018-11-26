import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User;

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  public login(username: string, password: string) {
    if (username === null || password === null) {
      return Observable.throw("Please insert username or password");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (username === "xmerce" && password === "1234");
        this.currentUser = new User(username, password);
        observer.next(access);
        observer.complete();
      });
    }
  }
}
