import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
import { Item, Profile } from 'src/app/@core/data/listData';
import { MapToPipe } from 'src/app/@shared/components/admin-form/mapToPipe.pipe';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { ProfilePermissionComponent } from 'src/app/@shared/components/modals/profile-permission/profile-permission.component';
import { FormConfig } from 'src/app/@shared/components/admin-form';

@Component({
  selector: 'app-profile-ref',
  templateUrl: './profile-ref.component.html',
  styleUrls: ['./profile-ref.component.scss']
})
export class ProfileRefComponent implements OnInit {
  filterprofileShow = false;

  options = ['normal', 'borderless', 'bordered'];

  sizeOptions = ['sm', 'md', 'lg'];

  layoutOptions = ['auto', 'fixed'];

  arr_status = {
    '-1' : 'Chờ chỉnh',
    '1' : 'Đã chỉnh'
  };

  status = [
    {
      name : 'Chờ chỉnh lý',
      id : 2
    },
    {
      name : 'Đã chỉnh lý',
      id : 1
    },
    {
      name : 'Chưa chỉnh lý',
      id : 0
    }
  ];
  numberValue = 0;

  newprofile  = {
    profile_rcd: null,
		profile_code: null,
	  profile_number: null,
    profile_name_e: null,
    profile_name_l: null,
		from_date: null,
		to_date: null,
		year: null,
		number_of_paper: null,
		profile_note_l: null,
    profile_note_e: null,
    status: "1",
		sort_order: null,
    is_digital_profile: null,
    cancellation_reason: null,
    date_pending: null,
    date_edited: null,
    date_pending_cancellation: null,
    date_cancellation: null,
    agency_issued_ref: null,
    confidentiality_rcd: null,
    profile_box_rcd: null,
    fields_rcd: null,
    archive_fonts_rcd: null,
    phong_rcd: null,
    duration_storage_rcd: null,
    archives_rcd: null,
    profile_type_rcd: null,
    agency_issued_rcd: null,
    
    active_flag: "1",
    created_by_user_id: "00000000-0000-0000-0000-000000000000",
    created_date_time: "0001-01-01T00:00:00",
    lu_updated: "0001-01-01T00:00:00",
		lu_user_id: "00000000-0000-0000-0000-000000000000",

    profile_type_name_l: null,
    agency_issued_name_l: null,
    archives_name_l: null,
    phong_name_l: null,

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
      field: 'profile_code',
      width: '150px',
    },
    {
      field: 'profile_name_l',
      width: '150px',
    },
    {
      field: 'year',
      width: '100px',
    },
    {
      field: 'profile_note',
      width: '100px',
    },
    {
      field: 'from_date',
      width: '100px',
    },
    {
      field: 'to_date',
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

  basicDataSource: Profile[] = [];

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: [
      {
        label: 'Số hồ sơ',
        prop: 'profile_number',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Tên hồ sơ',
        prop: 'profile_name_l',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Năm',
        prop: 'year',
        primary: false,
        type: 'input',
      },
      {
        label: 'Ngày bắt đầu',
        prop: 'from_date',
        primary: false,
        type: 'datePicker',
      },
      {
        label: 'Ngày kết thúc',
        prop: 'to_date',
        primary: false,
        type: 'datePicker',
      },
      {
        label: 'Ghi chú',
        prop: 'profile_note_l',
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
  role_rcd: any = "";

  editRowIndex = -1;

  lstCountry : any;

  _search = {
    keyword: '',
    select: 1
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };
  msgs: Array<Object> = [];

  busy: Subscription;

  @ViewChild('EditorTemplate', { static: true })
  EditorTemplate: TemplateRef<any>;

  constructor(private listDataService: ListDataService, private dialogService: DialogService, private cdr: ChangeDetectorRef,private api: ApiService ) {}

  ngOnInit() {
    if (localStorage.getItem('userinfo')) {
      let user = JSON.parse(localStorage.getItem('userinfo')!);
      this.role_rcd = user.role_rcd;
    }
    this.getList();
    // this.getCountry();
  }

  search() {
    this.getList();
  }
  modelChange(value:any) {
    this._search.select = new MapToPipe().transform(value, 'id');
    this.getList();
  }

  

  getList() {
    if (localStorage.getItem('userinfo')) {
      let user = JSON.parse(localStorage.getItem('userinfo')!);
      let user_rcd = "";
      this.role_rcd = user.role_rcd;
      if(this.role_rcd == 2) {

      }
      else {
        user_rcd = user.user_rcd;
      }
      this.api.post("api/manager/profileRef/Search",{page : this.pager.pageIndex , pageSize: this.pager.pageSize , profile_name_l : this._search.keyword, active_flag : this._search.select, user_rcd : user_rcd}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        this.basicDataSource = a.data;
        this.pager.total = a.totalItems;
      });
    }
  }

  // getCountry() {
  //   this.api.post("api/manager/CountryRef/Search",{page : 1 , pageSize: 1000 }).subscribe((res:any) => {
  //     let a = JSON.parse(JSON.stringify(res));
  //     this.lstCountry = a.data;
  //     console.log(this.lstCountry);
  //   });
  // }

  editRow(row: any, index: number) {
    this.insert = false;
    this.editRowIndex = index;
    this.formData = row;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '600px',
      maxHeight: '600px',
      title: 'Chỉnh sửa hồ sơ',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  addRow() {
    this.insert = true;
    this.formData = this.newprofile;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '600px',
      maxHeight: '600px',
      title: 'Thêm hồ sơ',
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
      title: 'Xóa hồ sơ',
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
            this.api.post("api/manager/profileRef/DeleteMulti",[id]).subscribe((res:any) => {
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

  openModalPermission(rowItem:any) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '1000px',
      maxHeight: '500px',
      title: 'Giới hạn người dùng truy cập',
      content: ProfilePermissionComponent,
      dialogtype: 'standard',
      // beforeHidden: () => this.beforeHidden(),
      backdropCloseable: true,
      buttons: [
        
      ],
      data: {
        profile_rcd : rowItem.profile_rcd
      }
    });
    const sub = results.modalContentInstance.onSave.subscribe((type:any) => {
      this.showToast(type);
      results.modalInstance.hide();
    });
  }

  padTo2Digits(num:any) {
    return num.toString().padStart(2, '0');
  }
  
  formatDate(date:any) {
    if(date) 
      return [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-');
    else return "";
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
    this._search = {
      keyword: '',
      select: 1
    };
    this.pager.pageIndex = 1;
    this.getList();
  }

  onSubmitted(e: any) {
    console.log(e,this.basicDataSource);
    this.editForm!.modalInstance.hide();
    if (this.insert) {
      e.profile_code=e.profile_code;
      e.profile_name_l = e.profile_name_l;
      e.profile_name_e = e.profile_name_l;
      e.from_date= typeof(e.from_date) == "string" ? this.formatDateView(e.from_date,false) : this.formatDate(e.from_date);
      e.to_date= typeof(e.to_date) == "string" ? this.formatDateView(e.to_date,false) : this.formatDate(e.to_date);
      e.year=e.year;
      e.profile_note_l = e.profile_note_l;
      e.profile_note_e = e.profile_note_l;
      e.is_digital_profile=e.is_digital_profile;
      e.active_flag=e.active_flag;
      this.api.post("api/manager/profileRef/Create",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        if(a.data) {
          this.showToast("success");
        }
        else {
          this.showToast("error");
        }
        this.getList();
      });//
    }
    else {
      e.profile_code=e.profile_code;
      e.profile_name_l = e.profile_name_l;
      e.profile_name_e = e.profile_name_l;
      e.from_date= typeof(e.from_date) == "string" ? this.formatDateView(e.from_date,false) : this.formatDate(e.from_date);
      e.to_date= typeof(e.to_date) == "string" ? this.formatDateView(e.to_date,false) : this.formatDate(e.to_date);
      e.year=e.year;
      e.profile_note_l = e.profile_note_l;
      e.profile_note_e = e.profile_note_l;
      e.is_digital_profile=e.is_digital_profile;
      e.active_flag=e.active_flag;
      this.api.post("api/manager/profileRef/Update",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        if(a.data) {
          this.showToast("success");
        }
        else {
          this.showToast("error");
        }
        this.getList();
      });

    }
  }

  showToast(type:any) {
    switch (type) {
      case 'success':
        this.msgs = [{ severity: "success", summary: 'Thông báo', content: 'Cập nhật thành công!' }];
        break;
      case 'error':
        this.msgs = [{ severity: "error", summary: 'Thông báo', content: 'Cập nhật thất bại!' }];
        break;
      default:
        this.msgs = [{ severity: "success", summary: 'Thông báo', content: 'Cập nhật thành công!' }];
      }
  }
  onCanceled() {
    this.editForm!.modalInstance.hide();
    this.editRowIndex = -1;
  }

  getDocuments(profile_rcd: any) {
    window.location.href = "/pages/PH1/documents/"+profile_rcd;
  }

  formatDateView(date:any, yearFirst:boolean) {
    if (date) {

      let arr_date_time = date.split('T');
      let  arr_date = arr_date_time[0].split('-');
      return arr_date[yearFirst ?2 : 0 ] + '/' + arr_date[1] + '/' + arr_date[yearFirst ? 0 :2];
    }
    return "";
  }

  exportExcel() {
    if (localStorage.getItem('userinfo')) {
      let user = JSON.parse(localStorage.getItem('userinfo')!);
      let user_rcd = "";
      this.role_rcd = user.role_rcd;
      if(this.role_rcd == 2) {

      }
      else {
        user_rcd = user.user_rcd;
      }
      this.api.post("api/manager/profileRef/ExportToExcel",{page : this.pager.pageIndex , pageSize: 100000 , profile_name_l : this._search.keyword, active_flag : this._search.select, user_rcd : user_rcd}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        // this.basicDataSource = a.data;
        // this.pager.total = a.totalItems;
      });
    }
  }
}
