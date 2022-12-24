import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/@shared/models/user';

const USERS = [
  {
    account: 'Admin',
    gender: 'male',
    userName: 'Admin',
    password: 'DevUI.admin',
    phoneNumber: '19999996666',
    email: 'admin@devui.com',
    userId: '100',
  },
  {
    account: 'User',
    gender: 'female',
    userName: 'User',
    password: 'DevUI.user',
    phoneNumber: '19900000000',
    email: 'user@devui.com',
    userId: '200',
  },
  {
    account: 'admin@devui.com',
    gender: 'male',
    userName: 'Admin',
    password: 'devuiadmin',
    phoneNumber: '19988888888',
    email: 'admin@devui.com',
    userId: '300',
  },
];

@Injectable()
export class AuthService {
  constructor(private api: ApiService) {}

  login(account: string, password: string) {
    this.api.post("api/user/login",{user_name : account , pass_word : password}).subscribe((res:any) => {
      let rs = JSON.parse(JSON.stringify(res));
      if (rs.data) {

        let { user_name, pass_word , full_name , user_rcd , email , date_of_birth, address, phone_number, user_code, gender} = rs.data;
        let userInfo: User = { user_name, pass_word , full_name , user_rcd , email , date_of_birth, address, phone_number, user_code, gender };
        console.log(of(userInfo));
        return userInfo;
      }
      return null;
    });
    // for (let i = 0; i < USERS.length; i++) {
    //   if (account === USERS[i].account && password === USERS[i].password) {
    //     let { userName, gender, phoneNumber, email } = USERS[i];
    //     let userInfo: User = { userName, gender, phoneNumber, email };
    //     return of(userInfo);
    //   }
    // }
    return throwError('Please make sure you have input correct account and password');
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userinfo');
  }

  setSession(userInfo: User) {
    localStorage.setItem('id_token', '123456');
    localStorage.setItem('userinfo', JSON.stringify(userInfo));
    localStorage.setItem('expires_at', '120');
  }

  isUserLoggedIn() {
    if (localStorage.getItem('userinfo')) {
      return true;
    } else {
      return false;
    }
  }
}
