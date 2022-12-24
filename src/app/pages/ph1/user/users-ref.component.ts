import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
// import { Item, Users } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-users-ref',
//   templateUrl: './users-ref.component.html',
//   styleUrls: ['./users-ref.component.scss']
// })
export class UsersRefComponent implements OnInit {
  filterUserShow = false;

  options = ['normal', 'borderless', 'bordered'];

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
    lu_updated: "2022-12-07T10:09:11.1174229+07:00"
    
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
      field: 'active_flag',
      width: '100px',
    },
    {
      field: 'Actions',
      width: '100px',
    },
  ];

//   basicDataSource: Users[] = [];

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: [
      // {
      //   label: 'Mã người dùng',
      //   prop: 'user_rcd',
      //   type: 'input',
      //   primary: true,
      //   required: true,
      //   rule: {
      //     validators: [{ required: true }],
      //   },
      // },
      // {
      //   label: 'Mã người dùng',
      //   prop: 'user_code',
      //   type: 'input',
      //   primary: false,
      //   required: true,
      //   rule: {
      //     validators: [{ required: true }],
      //   },
      // },
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
        type: 'select-object',
        options: this.value,
      },
     
      {
        label: 'Ngày sinh',
        prop: 'date_of_birth',
        type: 'datePicker',
      },
      {
        label: 'Email',
        prop: 'email',
        type: 'input',
      },
      {
        label: 'Địa chỉ',
        prop: 'address',
        type: 'input',
      },
      {
        label: 'Username',
        prop: 'user_name',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Password',
        prop: 'pass_word',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Ghi chú',
        prop: 'user_note_l',
        type: 'input',
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

  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };

  busy: Subscription;

  @ViewChild('EditorTemplate', { static: true })
  EditorTemplate: TemplateRef<any>;

  constructor(private listDataService: ListDataService, private dialogService: DialogService, private cdr: ChangeDetectorRef,private api: ApiService ) {}

  ngOnInit() {
    this.getList();
    
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
    //   this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
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
    console.log(this.insert);
    console.log(1);
    
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
      e.pass_word=e.pass_word;
      e.user_note_l = e.user_note_l;
       
      console.log({...e})

      this.api.post("api/manager/UserRef/Create",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        console.log(a);
        this.getList();
        alert("Thêm thành công!");
      });
      console.log(e);
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
     
      console.log(e);
      this.api.post("api/manager/UserRef/Update",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        
        this.getList();
        alert("Sửa thành công!");
      });
      console.log(e);

    }
  }

  onCanceled() {
    this.editForm!.modalInstance.hide();
    this.editRowIndex = -1;
  }
}
