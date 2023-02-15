import { ChangeDetectorRef, Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Item, MiningBookRef } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';

@Component({
  selector: 'app-mining-book',
  templateUrl: './mining-book.component.html',
  styleUrls: ['./mining-book.component.scss']
})
export class MiningBookComponent implements OnInit {

  filterMiningBookRefShow = false;

  options = ['normal', 'borderless', 'bordered'];

  sizeOptions = ['sm', 'md', 'lg'];

  layoutOptions = ['auto', 'fixed'];

  arr_status :any = {
    '-1' : 'Chờ duyệt',
    '1' : 'Đã duyệt',
    '0' : 'Hủy',
    '2' : 'Đã trả',
  };
  msgs: any ="";

  status = [
    {
      name : 'Chờ duyệt',
      id : -1
    },
    {
      name : 'Đã duyệt',
      id : 1
    },
    {
      name : 'Hủy',
      id : 0
    },
    {
      name : 'Đã trả',
      id : 2
    }
  ];
  numberValue = 0;

  newMiningBookRef  = {
    mining_book_rcd: "",
    mining_name_l: "",
    mining_name: "",
    mining_name_e: "",
    mining_book_note_l: "",
    mining_book_note: "",
    mining_book_note_e: "",
    sort_order: 1,
    active_flag: 0,
    created_by_user_id: "",
    created_date_time: "",
    lu_updated: "",
    lu_user_id: "",
    // mining_book_group: 1,
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
      field: 'mining_book_rcd',
      width: '150px',
    },  
    {
      field: 'mining_name',
      width: '100px',
    },
    {
      field: 'mining_note',
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

  basicDataSource: MiningBookRef[] = [];

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: [   
      {
        label: 'Tên sổ mượn hồ sơ',
        prop: 'mining_book_name_l',
        primary: false,
        type: 'input',
      },
      {
        label: 'Ghi chú',
        prop: 'mining_note',
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
  lstProfile : any;

  insert = true;

  editRowIndex = -1;


  _search = {
    keyword: ''
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };
  user_rcd = "";
  user_rcd_for_insert = "";

  // busy: any;
  busy: Subscription;

  @ViewChild('EditorTemplate', { static: true })
  // EditorTemplate: any;
  EditorTemplate: TemplateRef<any>;

  constructor(private listDataService: ListDataService, private dialogService: DialogService, private cdr: ChangeDetectorRef,private api: ApiService ) {}

  ngOnInit() {
    if (localStorage.getItem('userinfo')) {
      let user = JSON.parse(localStorage.getItem('userinfo')!);
      if(user.role_rcd != 2) {
        this.user_rcd = user.user_rcd;
      }
      this.user_rcd_for_insert = user.user_rcd;
    }
    this.api.post("api/manager/profileRef/Search",{page : 1 , pageSize: 100000 , profile_name_l : '', active_flag : 1, user_rcd : ""}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let rs = a.data.map((x:any) => {
        return { id : x.profile_rcd, name : x.profile_name_l};
      })
      this.lstProfile = rs;
      if(!this.user_rcd) {

        this.formConfig.items = [   
          {
            label: 'Tên sổ mượn',
            prop: 'mining_book_name_l',
            primary: false,
            type: 'input',
          },
          {
            label: 'Hồ sơ mượn',
            prop: 'profile_rcd',
            type: 'select-object',
            options: this.lstProfile,
            primary: false,
            required: true,
            rule: {
              validators: [{ required: true }],
            },
          },
          {
            label: 'Ngày mượn',
            prop: 'start_date',
            primary: false,
            type: 'datePicker',
          },
          {
            label: 'Ngày trả',
            prop: 'return_date',
            primary: false,
            type: 'datePicker',
          },
          {
            label: 'Ghi chú',
            prop: 'mining_book_note_l',
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
        ];
      }
      else {
        this.formConfig.items = [   
          {
            label: 'Tên sổ mượn',
            prop: 'mining_book_name_l',
            primary: false,
            type: 'input',
          },
          {
            label: 'Hồ sơ mượn',
            prop: 'profile_rcd',
            type: 'select-object',
            options: this.lstProfile,
            primary: false,
            required: true,
            rule: {
              validators: [{ required: true }],
            },
          },
          {
            label: 'Ghi chú',
            prop: 'mining_book_note_l',
            type: 'input',
          },
        ];
      }
    });
    this.getList();
    // this.getmining_book();
  }

  search() {
    
    this.getList();
  }

  getList() {
    this.api.post("api/manager/MiningBookRef/Search",{page : this.pager.pageIndex , pageSize: this.pager.pageSize , mining_book_rcd : this._search.keyword, user_rcd: this.user_rcd }).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
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

  padTo2Digits(num:any) {
    return num.toString().padStart(2, '0');
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
      title: 'Sửa phiếu mượn',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  addRow() {
    this.insert = true;
    this.formData = this.newMiningBookRef;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '600px',
      maxHeight: '600px',
      title: 'Thêm phiếu mượn',
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
      title: 'Xóa phiếu mượn',
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
            this.api.post("api/manager/MiningBookRef/DeleteMulti",[id]).subscribe((res:any) => {
              if(res.data) {
                this.msgs = [{ severity: "success", summary: 'Thông báo', content: 'Xóa thành công!' }];
              }
              else {
                this.msgs = [{ severity: "error", summary: 'Thông báo', content: 'Xóa thất bại!' }];
              }
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
    this.editForm!.modalInstance.hide();
    if (this.insert) {
      if(this.user_rcd) {
        e.active_flag = -1;
        e.start_date = this.formatDate(new Date());
        e.return_date = "";
      }
      else {
        e.start_date = typeof(e.start_date) == "string" ? this.formatDateView(e.start_date,false) : this.formatDate(e.start_date);
        e.return_date = typeof(e.return_date) == "string" ? this.formatDateView(e.return_date,false) : this.formatDate(e.return_date);
      }
      e.mining_book_name_e = e.mining_book_name_l;
      e.mining_book_note_e = e.mining_book_note_l;
      e.user_rcd = this.user_rcd_for_insert;
      e.created_date_time= "0001-01-01T00:00:00";
      e.lu_updated= "0001-01-01T00:00:00";
      e.created_by_user_id = this.user_rcd_for_insert;
      e.lu_user_id = this.user_rcd_for_insert;
      this.api.post("api/manager/MiningBookRef/Create",{...e}).subscribe((res:any) => {
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
    else {
      if(this.user_rcd) {
        e.active_flag = -2;
        e.start_date = "";
        e.return_date = "";
      }
      else {
        e.start_date = typeof(e.start_date) == "string" ? this.formatDateView(e.start_date,false) : this.formatDate(e.start_date);
        e.return_date = typeof(e.return_date) == "string" ? this.formatDateView(e.return_date,false) : this.formatDate(e.return_date);
      }
      e.mining_book_name_e = e.mining_book_name_l;
      e.mining_book_note_e = e.mining_book_note_l;
      this.api.post("api/manager/MiningBookRef/Update",{...e}).subscribe((res:any) => {
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

  onCanceled() {
    this.editForm!.modalInstance.hide();
    this.editRowIndex = -1;
  }
}
