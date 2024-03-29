import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
import { Item, Profile } from 'src/app/@core/data/listData';
import { MapToPipe } from 'src/app/@shared/components/admin-form/mapToPipe.pipe';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { ProfilePermissionComponent } from 'src/app/@shared/components/modals/profile-permission/profile-permission.component';
import { FormConfig } from 'src/app/@shared/components/admin-form';
// import { parse } from 'path';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'ng-devui/loading';

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
      name : 'Tất cả',
      id : -1
    },
    {
      name : 'Đã số hóa',
      id : 3
    },
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
  status_dropdown = [
    {
      name : 'Đã số hóa',
      id : 3
    },
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
    department_rcd: null,
		number_of_paper: null,
		profile_note_l: null,
    profile_note_e: null,
    status: 1,
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
    phong_rcd: 0,
    duration_storage_rcd: null,
    archives_rcd: null,
    profile_type_rcd: null,
    physical_condition_rcd: null,
    agency_issued_rcd: null,
    
    active_flag: "1",
    active_flag_child: "0",
    created_by_user_id: "00000000-0000-0000-0000-000000000000",
    created_date_time: "0001-01-01T00:00:00",
    lu_updated: "0001-01-01T00:00:00",
		lu_user_id: "00000000-0000-0000-0000-000000000000",

    profile_type_name_l: null,
    agency_issued_name_l: null,
    archives_name_l: null,
    phong_name_l: null,
    gear: null,

  };
  current_search = "";

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
    select: -1
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };
  msgs: Array<Object> = [];

  busy: Subscription;
  phisicalCondisionDropdown: any = [];
  confidentialityDropdown:any = [];
  departmentDropdown:any = [];
  archivesDropdown:any = [];
  archivesFontsDropdown:any = [];
  userInfo: any;
  archive_fonts_rcd : any;
  archive_fonts: any;

  @ViewChild('EditorTemplate', { static: true })
  EditorTemplate: TemplateRef<any>;

  constructor(private listDataService: ListDataService, private dialogService: DialogService, private cdr: ChangeDetectorRef,private api: ApiService, private loadingService: LoadingService, private route: ActivatedRoute, private router: Router ) {}

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if (localStorage.getItem('userinfo')) {
      let user = JSON.parse(localStorage.getItem('userinfo')!);
      this.role_rcd = user.role_rcd;
    }
    this.route.params.subscribe(params => {
      this.archive_fonts_rcd = params['archive_fonts_rcd'];
    });
    if (this.archive_fonts_rcd) {
      this.api.get("api/manager/ArchiveFontsRef/GetById/"+ this.archive_fonts_rcd).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        this.archive_fonts = a.data;
      });
    }
    const results = this.loadingService.open();
    this.api.post("api/manager/DepartmentRef/Search",{page : 1 , pageSize: 100 , department_name_l : ''}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let tmp = 0;
      let rs = a.data.map((x:any) => {
        if(tmp == 0) {
          this.newprofile.phong_rcd = parseInt(x.department_rcd);
        }
        tmp++;
        return { id : parseInt(x.department_rcd) , name : x.department_name_l};
      })
      this.departmentDropdown = rs;
    });
    this.api.get("api/manager/DocumentRef/GetListDropdown/"+"physical_condition_ref_get_list_dropdown").subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let tmp = 0;
      let rs = a.data.map((x:any) => {
        if(tmp == 0) {
          this.newprofile.physical_condition_rcd = x.value;
        }
        tmp++;
        return { id : x.value, name : x.label};
      })
      this.phisicalCondisionDropdown = rs;
    });
    this.api.get("api/manager/DocumentRef/GetListDropdown/"+"confidentiality_ref_get_list_dropdown").subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let tmp = 0;
      let rs = a.data.map((x:any) => {
        if(tmp == 0) {
          this.newprofile.confidentiality_rcd = x.value;
        }
        tmp++;
        return { id : x.value, name : x.label};
      })
      this.confidentialityDropdown = rs;
      
      
    });
    this.api.post("api/manager/ArchivesRef/Search",{page : 1 , pageSize: 100 , archives_name_l : ''}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let tmp = 0;
      let rs = a.data.map((x:any) => {
        if(tmp == 0) {
          this.newprofile.archives_rcd = x.archives_rcd;
        }
        tmp++;
        return { id : x.archives_rcd , name : x.archives_name_l};
      })
      this.archivesDropdown = rs;
      
      results.loadingInstance.close();
    });
    this.api.post("api/manager/ArchiveFontsRef/Search",{page : 1 , pageSize: 1000 , archive_fonts_name_l : ''}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let tmp = 0;
      let rs = a.data.map((x:any) => {
        if(tmp == 0) {
          this.newprofile.archives_rcd = x.archives_rcd;
        }
        tmp++;
        return { id : x.archive_fonts_rcd , name : x.archive_fonts_note_l};
      })
      this.archivesFontsDropdown = rs;
      
      results.loadingInstance.close();
    });
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
      this.userInfo = user;
      this.role_rcd = user.role_rcd;
      if(this.role_rcd == 2) {

      }
      else {
        user_rcd = user.user_rcd;
      }
      if(this.current_search != this._search.keyword) {
        this.pager.pageIndex = 1;
      } 
      const results = this.loadingService.open();
      this.api.post("api/manager/profileRef/Search",{page : this.pager.pageIndex , pageSize: this.pager.pageSize , profile_name_l : this._search.keyword, status: this._search.select, active_flag : 1, user_rcd : user_rcd,archive_fonts_rcd: this.archive_fonts_rcd}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        this.basicDataSource = a.data;
        this.pager.total = a.totalItems;
        setTimeout(() => {

          this.formConfig.items =[ {
            label: 'Số hồ sơ',
            prop: 'profile_number',
            type: 'input',
            primary: false,
            required: true,
            rule: {
              validators: [{ required: true, numeric:true }],
            },
          },
          {
            label: 'Tên hồ sơ',
            prop: 'profile_name_l',
            type: 'text-area',
            primary: false,
            required: true,
            rule: {
              validators: [{ required: true }],
            },
            styles: {
              height : '50px'
            }
          },
          {
            label: 'Năm',
            prop: 'year',
            primary: false,
            type: 'input',
            rule: {
              validators: [{ required: true, numeric:true }],
            },
          },
          {
            label: 'Hộp số',
            prop: 'gear',
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
            label: 'Phòng ban',
            prop: 'phong_rcd',
            type: 'select-object',
            options: this.departmentDropdown,
            primary: false,
            required: true,
            rule: {
              validators: [{ required: true }],
            },
          },
          {
            label: 'Kho lưu trữ',
            prop: 'archives_rcd',
            type: 'select-object',
            options: this.archivesDropdown,
            primary: false,
            required: true,
            rule: {
              validators: [{ required: true }],
            },
          },
          {
            label: 'Bảo mật',
            prop: 'confidentiality_rcd',
            type: 'select-object',
            options: this.confidentialityDropdown,
            primary: false,
            required: true,
            rule: {
              validators: [{ required: true }],
            },
          },
          {
            label: 'Tình trạng',
            prop: 'physical_condition_rcd',
            type: 'select-object',
            options: this.phisicalCondisionDropdown,
            primary: false,
            required: true,
            rule: {
              validators: [{ required: true }],
            },
          },
          {
            label: 'Phông',
            prop: 'archive_fonts_rcd',
            type: 'select-object',
            options: this.archivesFontsDropdown,
            primary: false,
            required: true,
            rule: {
              validators: [{ required: true }],
            },
          },
          {
            label: 'Trạng thái',
            prop: 'status',
            type: 'select-object',
            options: this.status_dropdown,
            primary: false,
            required: true,
            rule: {
              validators: [{ required: true }],
            },
          },
          ];
        },1000)
        results.loadingInstance.close();

        this.current_search = this._search.keyword;
      });
    }
  }

  getNameStatus(status: number) {
    const tmp = this.status.findIndex((v:any) => v.id == status);
    if(tmp >= 0) {
      return this.status[tmp].name;
    }
    return '';
  }

  // getCountry() {
  //   this.api.post("api/manager/CountryRef/Search",{page : 1 , pageSize: 1000 }).subscribe((res:any) => {
  //     let a = JSON.parse(JSON.stringify(res));
  //     this.lstCountry = a.data;
  //     //console.log(this.lstCountry);
  //   });
  // }

  editRow(row: any, index: number) {
    this.insert = false;
    this.editRowIndex = index;
    this.formData = row;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '600px',
      maxHeight: '700px',
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
            this.api.post("api/manager/profileRef/DeleteMulti/"+this.userInfo.user_rcd,[id]).subscribe((res:any) => {
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
      select: -1
    };
    this.pager.pageIndex = 1;
    this.getList();
  }

  onSubmitted(e: any) {
    this.editForm!.modalInstance.hide();
    e.created_by_user_id = this.userInfo.user_rcd;
    e.lu_user_id = this.userInfo.user_rcd;
    if (this.insert) {
      e.profile_code=e.profile_code;
      e.profile_name_l = e.profile_name_l;
      e.profile_name_e = e.profile_name_l;
      e.from_date= typeof(e.from_date) == "string" ? this.formatDateView(e.from_date,false) : this.formatDate(e.from_date);
      e.to_date= typeof(e.to_date) == "string" ? this.formatDateView(e.to_date,false) : this.formatDate(e.to_date);
      e.year= parseInt(e.year);
      e.profile_number = parseInt(e.profile_number);
      e.status = parseInt(e.status);
      e.profile_note_l = e.profile_note_l;
      e.profile_note_e = e.profile_note_l;
      e.is_digital_profile=e.is_digital_profile;
      e.active_flag = parseInt(e.active_flag);
      e.RowNumber = 1;
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
      e.year= parseInt(e.year);
      e.profile_number = parseInt(e.profile_number);
      e.status = parseInt(e.status);
      e.profile_note_l = e.profile_note_l;
      e.profile_note_e = e.profile_note_l;
      e.is_digital_profile=e.is_digital_profile;
      e.active_flag = parseInt(e.active_flag);
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
    window.open("/pages/PH1/documents/"+profile_rcd);
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
      this.api.post("api/manager/profileRef/ExportToExcel",{page : this.pager.pageIndex , pageSize: 100000 , profile_name_l : this._search.keyword,status : this._search.select, active_flag : 1, user_rcd : user_rcd}, true).subscribe((response:any) => {
        // let a = JSON.parse(JSON.stringify(res));
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        link.download = 'profile_ref.xlsx';
        link.click();
        URL.revokeObjectURL(objectUrl);
        // this.basicDataSource = a.data;
        // this.pager.total = a.totalItems;
      });
    }
  }
}
