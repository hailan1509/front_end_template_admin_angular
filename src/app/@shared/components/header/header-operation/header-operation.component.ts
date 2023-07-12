import { Component, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'ng-devui/modal';
import { ApiService } from 'src/app/api.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { LANGUAGES } from 'src/config/language-config';
import { User } from '../../../models/user';
import { FormLayout, DValidateRules } from 'ng-devui';
import { I18nService } from 'ng-devui/i18n';
import { Users } from 'src/app/@core/data/listData';

@Component({
  selector: 'da-header-operation',
  templateUrl: './header-operation.component.html',
  styleUrls: ['./header-operation.component.scss'],
})
export class HeaderOperationComponent implements OnInit {
  @ViewChild('changePass', { static: true }) changePass: TemplateRef<any>;
  user: Users;
  languages = LANGUAGES;
  language: string;
  haveLoggedIn = false;
  noticeCount: number;
  msgs: Array<Object> = [];
  formData = {
    newPass: '',
    oldPass: '',
    renewPass: '',
  };
  formRules: { [key: string]: DValidateRules } = {
    oldPasswordRules: {
      // validators: [{ required: true }, { minlength: 6 }, { maxlength: 15 }, { pattern: /^[a-zA-Z0-9\d@$!%*?&.]+(\s+[a-zA-Z0-9]+)*$/ }],
      validators: [{ required: true , message: "Không để trống dòng này!" }],
      message: 'Đã có lỗi khi nhập.',
    },
    passwordRules: {
      // validators: [{ required: true }, { minlength: 6 }, { maxlength: 15 }, { pattern: /^[a-zA-Z0-9\d@$!%*?&.]+(\s+[a-zA-Z0-9]+)*$/ }],
      validators: [{ required: true , message: "Không để trống dòng này!" }, { minlength: 6, message: "Mật khẩu phải từ 6 kí tự trở lên!" }, { maxlength: 15, message: "Mật khẩu không quá 15 kí tự!" },],
      message: 'Nhập dữ liệu không đúng định dạng.',
    },
  };
  showPassword = false;
  currentInput = 'newPass';
  horizontalLayout: FormLayout = FormLayout.Horizontal;
  newUser  = {
    user_rcd: "",
    pass_word:"",
    new_password:"",
  };
  

  constructor(private route: Router, private authService: AuthService, private translate: TranslateService, private i18n: I18nService, private dialogService: DialogService, private api: ApiService) {}

  ngOnInit(): void {
    if (localStorage.getItem('userinfo')) {
      this.user = JSON.parse(localStorage.getItem('userinfo')!);
      this.haveLoggedIn = true;
    } 
    // else {
    //   this.authService.login('Admin', 'Devui.admin').subscribe((res:any) => {
    //     this.authService.setSession(res);
    //     this.user = JSON.parse(localStorage.getItem('userinfo')!);
    //     this.haveLoggedIn = true;
    //   });
    // }
    this.language = this.translate.currentLang;
  }

  onSearch(event: any) {
    // console.log(event);
  }

  onLanguageClick(language: string) {
    this.language = language;
    localStorage.setItem('lang', this.language);
    this.i18n.toggleLang(this.language);
    this.translate.use(this.language);
  }

  handleUserOps(operation: string) {
    switch (operation) {
      case 'logout': {
        this.haveLoggedIn = false;
        this.authService.logout();
        this.route.navigate(['/', 'login']);
        break;
      }
      default:
        break;
    }
  }

  handleNoticeCount(event: number) {
    this.noticeCount = event;
  }
  openModalChangePass() {
    this.dialogService.open({
      id: 'edit-dialog',
      width: '40%',
      title: 'Đổi mật khẩu',
      showAnimate: false,
      contentTemplate: this.changePass,
      backdropCloseable: true,
      onClose: () => {
        this.resetInputPass();
      },
      buttons: [],
    });
  }
  saveChangePass({ valid, directive, data, errors }: any) {
    if(valid) {
      if(this.formData.newPass == this.formData.oldPass) {
        this.showToast('error',"Mật khẩu mới không trùng mật khẩu cũ!");
        return;
      }
      if(this.formData.newPass != this.formData.renewPass) {
        this.showToast('error',"Mật khẩu mới không trùng khớp!");
        return;
      }
      this.newUser.user_rcd = this.user.user_rcd;
      this.newUser.pass_word = this.formData.oldPass;
      this.newUser.new_password = this.formData.newPass;
      this.api.post("api/manager/UserRef/ChangePass/", this.newUser).subscribe((res:any) => {
        this.showToast('success',res.data);
        console.log(res);
      })
    }
    else{

    }
  }
  resetInputPass() {
    this.formData = {
      newPass: '',
      oldPass: '',
      renewPass: '',
    };
    this.showPassword = false;
  }
  showToast(type:any, message: any) {
    this.msgs = [{ severity: type, summary: 'Thông báo', content: message }];
  }
}