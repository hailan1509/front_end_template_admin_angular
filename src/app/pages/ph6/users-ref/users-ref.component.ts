import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
import { Item, Users } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { DEFAULT_PASSWORD } from 'src/config/config'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-ref',
  templateUrl: './users-ref.component.html',
  styleUrls: ['./users-ref.component.scss']
})
export class UsersRefComponent implements OnInit {
  filterUserShow = false;
  showPassword = false;

  options = ['normal', 'borderless', 'bordered'];
  msgs: Array<Object> = [];

  sizeOptions = ['sm', 'md', 'lg'];

  layoutOptions = ['auto', 'fixed'];

  arr_status = {
    '-1' : 'Không hoạt động',
    '1' : 'Hoạt động'
  };

  status = [
    {
      name : 'Không hoạt động',
      id : -1
    },
    {
      name : 'Hoạt động',
      id : 1
    }
  ];
  value = [
    {
      name : 'Nam',
      id : 0
    },
    {
      name : 'Nữ',
      id : 1
    }
  ];

  numberValue = 0;

  newUser  = {
    user_rcd: "",
    user_code: "",
    full_name: "",
     gender:"",
     date_of_birth:"",
     email:"",
     phone_number:"",
     address:"",
     user_name:"",
     pass_word:"",   
    user_note_e: "",
    user_note_l: "",
    sort_order:1,
    active_flag: 0,
    created_by_user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    created_date_time: "2022-12-07T03:08:56.885Z",
    lu_user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    lu_updated: "2022-12-07T10:09:11.1174229+07:00",
    role_rcd: "1"
  };

  searchForm: {
    borderType: '' | 'borderless' | 'bordered';
    size: 'sm' | 'md' | 'lg';
    layout: 'auto' | 'fixed';
  } = {
    borderType: 'bordered',
    size: 'md',
    layout: 'auto',
  };
  lstDepartment : any;

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'user_rcd',
      width: '150px',
    },
    {
      field: 'user_code',
      width: '150px',
    },
    {
      field: 'full_name',
      width: '150px',
    },
    {
      field: 'gender',
      width: '50px',
    },
    {
      field: 'date_of_birth',
      width: '100px',
    },
    {
      field: 'email',
      width: '100px',
    },
    {
      field: 'phone_number',
      width: '100px',
    },
    {
      field: 'address',
      width: '100px',
    },
    {
      field: 'user_name',
      width: '100px',
    },
    {
      field: 'pass_word',
      width: '100px',
    },
    {
      field: 'user_note_e',
      width: '100px',
    },
    {
      field: 'user_note_l',
      width: '100px',
    },
    {
      field: 'role_name_l',
      width: '100px',
    },
    {
      field: 'active_flag',
      width: '100px',
    },
    {
      field: 'Actions',
      width: '100px',
    },
  ];

  basicDataSource: Users[] = [];

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: [
      
    ],
    labelSize: '',
  };

  formData = {};

  editForm: any = null;

  insert = true;

  editRowIndex = -1;



  _search = {
    lang: 'l',
     user_rcd: "",
    user_code: "",
    full_name: "",
     gender:"",
     date_of_birth:"",
     email:"",
     phone_number:"",
     address:"",
     user_name:"",
     pass_word:"",   
    user_note_e: "",
    user_note_l: "",
    department_rcd:""

  };

  _search1 = {
    lang: 'l',
     department_rcd: "",
     department_code: "",
     department_name_l: "", 
     department_note_e: "",
     department_note_l: "",

  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };

  busy: Subscription;
  resetPass  = {
    user_rcd: "",
    pass_word:"",
    new_password: DEFAULT_PASSWORD,
    type: 0
  };
  user: any;

  @ViewChild('EditorTemplate', { static: true })
  EditorTemplate: TemplateRef<any>;

  constructor(private listDataService: ListDataService, private dialogService: DialogService, private cdr: ChangeDetectorRef,private api: ApiService ) {}

  ngOnInit() {
    if (localStorage.getItem('userinfo')) {
      this.user = JSON.parse(localStorage.getItem('userinfo')!);
      this.resetPass.user_rcd = this.user.user_rcd;
    } 
    this.api.post("api/manager/RoleRef/Search",{page : 1 , pageSize: 50 , role_name_l : ""}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let rs = a.data.map((x:any) => {
        return { id : parseInt(x.role_rcd) , name : x.role_name_l};
      });
      this.formConfig = {
        layout: FormLayout.Horizontal,
        items: [
          {
            label: 'Tên người dùng',
            prop: 'full_name',
            type: 'input',
            primary: false,
            required: true,
            rule: {
              validators: [{ required: true }],
            },
          },
          {
            label: 'Giới tính',
            prop: 'gender',
            type: 'input',
            required: true,
            rule: {
              validators: [{ required: true }],
            },
          },
         
          {
            label: 'Ngày sinh',
            prop: 'date_of_birth',
            type: 'datePicker',
          
            rule: {
              validators: [{ required: true }],
            },
          },
          // {
          //   label: 'Số điện thoại',
          //   type:'input',      
          //   required: true,
          //   rule: {
          //     validators: [{ required: true },
          //       { minlength: 10 },
          //       { maxlength: 12 },
          //       {
          //         pattern: /^((\\+91-?)|0)?[0-9]{10}$/,
          //         message: 'Số điện thoại chỉ chứa số',
    
          //       }
          //     ],
          //   },
          // },
          {
            label: 'Email',
            prop: 'email',
            type: 'input',
            required: true,
            rule: {
              validators: [{ required: true }, { email: true }],
            },
          },
          {
            label: 'Địa chỉ',
            prop: 'address',
            type: 'input',
          
            rule: {
              validators: [{ required: true },
               
              ],
            },
          },
          {
            label: 'Username',
            prop: 'user_name',
            type: 'input',
            primary: false,
            required: true,
            rule: {
              validators: [{ required: true },
                { minlength: 3 },
                { maxlength: 20 },
                {
                  pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/,
                  message: 'The user name cannot contain characters except uppercase and lowercase letters.',
                },
              ],
            },
          },
          // {
          //   label: 'Password',
          //   prop: 'pass_word',
          //   type: 'input',
          //   primary: false,
          //   required: true,
          //   rule: {
          //     validators: [{ required: true },
          //       { minlength: 6 }, { maxlength: 15 }, { pattern: /^[a-zA-Z0-9\d@$!%*?&.]+(\s+[a-zA-Z0-9]+)*$/ }
          //     ],
          //   },
          // },
          {
            label: 'Ghi chú',
            prop: 'user_note_l',
            type: 'input',
          },
          // {
          //   label: 'Tên phòng ban',
          //   prop: 'department_rcd',
          //   type: 'input',      
          //   primary: false,
          //   required: true,
          //   rule: {
          //     validators: [{ required: true }],
          //   },
          // },
          {
            label: 'Quyền',
            prop: 'role_rcd',
            type: 'select-object',
            options: rs,
            primary: false,
            required: false,
            rule: {
              // validators: [{ required: true }],
            },
          },
          {
            label: 'Trạng thái',
            prop: 'active_flag',
            type: 'select-object',
            options: this.status,
            primary: false,
            required: true,
            rule: {
              validators: [{ required: true }],
            },
          },
        ],
        labelSize: '',
      };
      this.getList();
    });
   //this.getDepartment();
  }
  getDepartmentName() {
    this.api.post("api/manager/DepartmentRef/GetListDropdown",{}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }

  getDepartment() {
    const searchBody1 = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search1
    }
    this.api.post("api/manager/DepartmentRef/Search", searchBody1).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.lstDepartment = a.data;
      //console.log(this.lstDepartment);
    });
  }

 


  search() {
    this.getList();
  }

  getList() {
    const searchBody = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search
    }

    this.api.post("api/manager/UserRef/Search", searchBody).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      //console.log(this.basicDataSource);
      this.pager.total = a.totalItems;
    });
  }
  formatDateView(date:any, yearFirst:boolean) {
    if (date) {

      let arr_date_time = date.split('T');
      let  arr_date = arr_date_time[0].split('-');
      return arr_date[yearFirst ?2 : 0 ] + '/' + arr_date[1] + '/' + arr_date[yearFirst ? 0 :2];
    }
    return "";
  }
  

  editRow(row: any, index: number) {
    this.insert = false;
    this.editRowIndex = index;
    this.formData = row;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '600px',
      maxHeight: '600px',
      title: 'Editor',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  addRow() {
    this.insert = true;
    this.formData = this.newUser;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '600px',
      maxHeight: '600px',
      title: 'Editor',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  deleteRow(id: string) {
    const results = this.dialogService.open({
      id: 'delete-dialog',
      width: '346px',
      maxHeight: '600px',
      title: 'Xóa người dùng',
      showAnimate: false,
      content: 'Bạn có chắc chắn muốn xóa?',
      backdropCloseable: true,
      onClose: () => {},
      buttons: [
        {
          cssClass: 'primary',
          text: 'Xóa',
          disabled: false,
          handler: ($event: Event) => {
            this.api.post("api/manager/UserRef/DeleteMulti",[id]).subscribe((res:any) => {
              alert("Xóa thành công!");
              this.getList();
              
            });
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: 'Không',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
    });
  }

  resetPassword(user_rcd:any) {
    const results = this.dialogService.open({
      id: 'reset-dialog',
      width: '346px',
      maxHeight: '600px',
      title: 'Reset mật khẩu',
      showAnimate: false,
      content: 'Bạn có chắc chắn muốn reset mật khẩu?',
      backdropCloseable: true,
      onClose: () => {},
      buttons: [
        {
          cssClass: 'primary',
          text: 'Reset',
          disabled: false,
          handler: ($event: Event) => {
            this.resetPass.user_rcd = user_rcd;
            this.api.post("api/manager/UserRef/ChangePass",this.resetPass).subscribe((res:any) => {
              if(res.extraInfo == '200') {
                this.msgs = [{ severity: "success", summary: 'Thông báo', content: 'Cập nhật thành công!' }];
              }
              else this.msgs = [{ severity: "error", summary: 'Thông báo', content: 'Cập nhật không thành công!' }];
              this.getList();
            });
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: 'Không',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
    });
  }

  onPageChange(e: number) {
    this.pager.pageIndex = e;
    this.getList();
  }

  onSizeChange(e: number) {
    this.pager.pageSize = e;
    this.getList();
  }

  reset() {
    this.searchForm = {
      borderType: '',
      size: 'md',
      layout: 'auto',
    };
    this.pager.pageIndex = 1;
    this.getList();
  }

  onSubmitted(e: any) {
    //console.log(this.insert);
    //console.log(1);
    
    this.editForm!.modalInstance.hide();
    if (this.insert) {
      e.user_rcd=e.user_rcd;
      e.user_code=e.user_code;
      e.full_name = e.full_name;   
      e.gender=e.gender;
      e.date_of_birth=e.date_of_birth;
      e.email=e.email;
      e.phone_number=e.phone_number;
      e.address=e.address;
      e.user_name=e.user_name;
      e.pass_word=DEFAULT_PASSWORD;
      e.user_note_l = e.user_note_l;

      this.api.post("api/manager/UserRef/Create",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        this.getList();
        alert("Thêm thành công!");
      });
    }
    else {
      e.full_name = e.full_name;   
      e.gender=e.gender;
      e.date_of_birth=e.date_of_birth;
      e.email=e.email;
      e.phone_number=e.phone_number;
      e.address=e.address;
      e.user_name=e.user_name;
      e.pass_word=e.pass_word;
      e.user_note_l = e.user_note_l;
      //console.log(e);
      this.api.post("api/manager/UserRef/Update",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        
        this.getList();
        alert("Sửa thành công!");
      });
      //console.log(e);

    }
  }

  onCanceled() {
    this.editForm!.modalInstance.hide();
    this.editRowIndex = -1;
  }
}
