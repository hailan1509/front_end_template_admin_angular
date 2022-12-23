import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
import { Item, Profile } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';

@Component({
  selector: 'app-handed-over-profile',
  templateUrl: './handed-over-profile.component.html',
  styleUrls: ['./handed-over-profile.component.scss']
})
export class HandedOverProfileComponent implements OnInit {

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
      name : 'Chờ chỉnh',
      id : -1
    },
    {
      name : 'Đã chỉnh',
      id : 1
    }
  ];
  numberValue = 0;

  newprofile  = {
    profile_rcd:"",
    profile_code: "",
    profile_number:"",
    profile_name_e:"",
    profile_name_l: "",
    from_date:"",
    to_date:"",
    year:"",
    number_of_paper:"",
    profile_note_e:"",
    profile_note_l: "",
    cancellation_reason:"",
    is_digital_profile:"",
    status:1,
    sort_order: 1,
    date_pending:"",
    date_edited:"",
    date_pending_cancellation:"",
    date_cancellation:"",
    agency_issued_rcd:"",
    phong_rcd:"",
    duration_storage_rcd:"",
    archives_rcd:"",
    profile_type_rcd:"",
    profile_box_rcd:"",
    active_flag: 0,
    created_by_user_id: "",
    created_date_time: "",
    lu_updated: "",
    lu_user_id: "",

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
        label: 'Mã hồ sơ',
        prop: 'profile_code',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
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

  editRowIndex = -1;

  lstCountry : any;

  _search = {
    keyword: '',
    profile_code:null,
    profile_number: null,
    year: null,
    profile_name: null,
    profile_note:null,
    status:0,
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
    // this.getCountry();
  }

  search() {
    this.getList();
  }

  getList() {
    this.api.post("api/manager/HandoverRecordCanceled/SearchHandedOverProfile",{page : this.pager.pageIndex , pageSize: this.pager.pageSize , profile_name : this._search.keyword}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
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
    this.formData = this.newprofile;
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
      e.profile_rcd = e.profile_rcd;
      e.profile_code=e.profile_code;
      e.profile_name_l = e.profile_name;
      e.profile_name_e = e.profile_name;
      e.from_date=e.from_date;
      e.to_date=e.to_date;
      e.year=e.year;
      e.number_of_paper=e.number_of_paper;
      e.profile_note_l = e.profile_note;
      e.profile_note_e = e.profile_note;
      e.cancellation_reason=e.cancellation_reason;
      e.is_digital_profile=e.is_digital_profile;
      e.status=e.status;
      e.sort_order=e.sort_order;
      e.date_pending=e.date_pending;
      e.date_edited=e.date_edited;
      e.date_pending_cancellation=e.date_pending_cancellation;
      e.date_cancellation=e.date_cancellation;
      e.agency_issued_rcd=e.agency_issued_rcd;
      e.phong_rcd=e.phong_rcd;
      e.duration_storage_rcd=e.duration_storage_rcd;
      e.archives_rcd=e.archives_rcd;
      e.profile_box_rcd=e.profile_box_rcd;
      e.profile_tyle_rcd=e.profile_tyle_rcd;
      e.active_flag=e.active_flag;
      this.api.post("api/manager/profileRef/Create",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        this.getList();
      });//
    }
    else {
      e.profile_name_l = e.profile_name;
      e.profile_name_e = e.profile_name;
      e.profile_note_l = e.profile_note;
      e.profile_note_e = e.profile_note;
      this.api.post("api/manager/profileRef/Update",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        this.getList();
      });
      console.log(e);

    }
  }

  onCanceled() {
    this.editForm!.modalInstance.hide();
    this.editRowIndex = -1;
  }

}
