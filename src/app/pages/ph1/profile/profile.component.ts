import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Item, ProfileRef } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  filterProfileRefShow = false;

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
  numberValue = 0;

  newProfileRef  = {
    // profile_rcd: "",
    // staff_rcd: "",
    profile_rcd: "",
    profile_code: "",
    profile_number: "",
    profile_type_rcd: "",
    profile_box_rcd: "",
    phong_rcd: "",
    archives_rcd: "",
    duration_storage_rcd: "",
    agency_issued_ref: "",
    profile_name: "",
    from_date: "",
    to_date: "",
    number_of_pager: "",
    profile_note: "",
    cancellation_reason: "",
    is_digital_profile: "",
    status: "",
    sort_order: "",
    active_flag: "",
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
      field: 'profile_rcd',
      width: '150px',
    },  
    {
      field: 'profile_type_name',
      width: '100px',
    },
    {
      field: 'profile_box_name',
      width: '150px',
    },
    {
      field: 'phong_name',
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

  basicDataSource: ProfileRef[] = [];

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: [
      {
        label: 'Mã hồ sơ',
        prop: 'profile_rcd',
        type: 'input',
        primary: true,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },    
      {
        label: 'Tên loại hồ sơ',
        prop: 'profile_type_name',
        primary: false,
        type: 'input',
      },
      {
        label: 'Tên hộp',
        prop: 'profile_box_name',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Tên phòng',
        prop: 'phong_name',
        type: 'input',
        primary: true,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label:'Ngày đến',
        prop: 'from_date',
        type: 'input',
        primary: true,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Ngày đi',
        prop: 'to_date',
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

  lstProfileTypeRef : any;

  _search = {
    keyword: ''
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };

  // busy: any;
  busy: Subscription;

  @ViewChild('EditorTemplate', { static: true })
  // EditorTemplate: any;
  EditorTemplate: TemplateRef<any>;

  constructor(private listDataService: ListDataService, private dialogService: DialogService,
     private cdr: ChangeDetectorRef,private api: ApiService ) {}

  ngOnInit() {
    this.getList();
    // this.getcancellation_minutes();
  }

  search() {
    this.getList();
  }

  getList() {
    this.api.post("api/manager/ProfileRef/Search",{page : this.pager.pageIndex , pageSize: this.pager.pageSize , profile_rcd : this._search.keyword}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }

  getProfileTypeRef() {
    this.api.post("api/manager/ProfileTypeRef/Search",{page : 1 , pageSize: 1000 }).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.lstProfileTypeRef = a.data;
      console.log(this.lstProfileTypeRef);
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
    this.formData = this.newProfileRef;
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
      title: 'Xóa biên bản hủy',
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
            this.api.post("api/manager/ProfileRef/DeleteMulti",[id]).subscribe((res:any) => {
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
      // e.cancellation_minutes_group = 1;
      // e.cancellation_minutes_name_l = e.cancellation_minutes_name;
      // e.cancellation_minutes_name_e = e.cancellation_minutes_name;
      // e.cancellation_minutes_note_l = e.cancellation_minutes_note;
      // e.cancellation_minutes_note_e = e.cancellation_minutes_note;
      // this.api.post("api/manager/ProfileRef/Create",{...e}).subscribe((res:any) => {
      //   let a = JSON.parse(JSON.stringify(res));
      //   this.getList();
      // });
    }
    else {
      // e.cancellation_minutes_name_l = e.cancellation_minutes_name;
      // e.cancellation_minutes_name_e = e.cancellation_minutes_name;
      e.profile_note_l = e.profile_note_l;
      e.profile_note_e = e.profile_note_e;
      this.api.post("api/manager/ProfileRef/Update",{...e}).subscribe((res:any) => {
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
