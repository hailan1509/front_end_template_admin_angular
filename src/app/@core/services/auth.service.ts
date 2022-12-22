import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';
import { User } from 'src/app/@shared/models/user';
import { Item, Users } from 'src/app/@core/data/listData';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructoc() {}
  constructor(private api: ApiService,private router: Router) {}
  login(account: string, password: string) 
  {
    //console.log(account,password);
    // for (let i = 0; i < USERS.length; i++)
    // {
    // console.log(USERS[i]);

      // if (account === USERS[i].account && password === USERS[i].password) 
      // {
      //   let { userName, gender, phoneNumber, email } = USERS[i];
      //   let userInfo: User = { userName, gender, phoneNumber, email };
      //   return of(userInfo);
      // }
      this.api.get(`api/manager/UserRef/Login?user_name=${account}&pass_word=${password}`).subscribe((res:any) => 
      {
        console.log(res.data);

        let rs = JSON.parse(JSON.stringify(res));
          if (rs.data)
          {

            let {user_rcd, user_code,full_name,gender,date_of_birth,email,phone_number,address,user_name, pass_word} = rs.data;
            let userInfo: Users = {user_rcd, user_code,full_name,gender,date_of_birth,email,phone_number,address,user_name, pass_word};
            console.log(userInfo);
            return rs.data;
          }
          return throwError('Please make sure you have input correct account and password');
      });
   // }
    // this.router.navigate(['']);
    return throwError('Please make sure you have input correct account and password');
  }

  // login(account: string, password: string) {
  //   for (let i = 0; i < USERS.length; i++) {
  //     if (account === USERS[i].account && password === USERS[i].password) {
  //       let { userName, gender, phoneNumber, email } = USERS[i];
  //       let userInfo: User = { userName, gender, phoneNumber, email };
  //       return of(userInfo);
  //     }
  //   }
  //   return throwError('Please make sure you have input correct account and password');
  // }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userinfo');
  }

  setSession(userInfo: Users) {
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
