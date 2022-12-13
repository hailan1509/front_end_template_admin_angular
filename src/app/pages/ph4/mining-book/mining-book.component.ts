import { ChangeDetectorRef, Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Item, CancellationMinutesRef } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';

@Component({
  selector: 'app-mining-book',
  templateUrl: './mining-book.component.html',
  styleUrls: ['./mining-book.component.scss']
})
export class MiningBookComponent implements OnInit {

  filterCancellationMinutesRefShow = false;

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

  newCancellationMinutesRef  = {
    cancellation_minutes_rcd: "",
    staff_rcd: "",
    staff_name_l: "",
    staff_name: "",
    staff_name_e: "",
    cancellation_minutes_number: "",
    decision_number: "",
    content: "",
    place: "",
    cancellation_method: "",
    time_destroy: "",
    cancellation_minutes_note_l: "",
    cancellation_minutes_note: "",
    cancellation_minutes_note_e: "",
    attached_file: "",
    status: "",
    comment: "",
    sort_order: 1,
    active_flag: 0,
    created_by_user_id: "",
    created_date_time: "",
    lu_updated: "",
    lu_user_id: "",
    // cancellation_minutes_group: 1,
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
      field: 'cancellation_minutes_rcd',
      width: '150px',
    },  
    {
      field: 'staff_name',
      width: '100px',
    },
    {
      field: 'number of cancellations',
      width: '150px',
    },
    // {
    //   field: 'cancellation_minutes_number',
    //   width: '150px',
    // },
    // {
    //   field: 'content',
    //   width: '100px',
    // },
    // {
    //   field: 'place',
    //   width: '100px',
    // },
    {
      field: 'attached_file',
      width: '150px',
    },
    {
      field: 'cancellation_minutes_note',
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

  basicDataSource: CancellationMinutesRef[] = [];

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: [
      {
        label: 'Mã biên bản hủy',
        prop: 'cancellation_minutes_rcd',
        type: 'input',
        primary: true,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },    
      {
        label: 'Tên nhân viên',
        prop: 'staff_name',
        primary: false,
        type: 'input',
      },
      {
        label: 'Số lượng hủy',
        prop: 'number_of_cancellations',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      // {
      //   label: 'Số kí hiệu biên bản',
      //   prop: 'cancellation_minutes_number',
      //   type: 'input',
      //   primary: false,
      //   required: true,
      //   rule: {
      //     validators: [{ required: true }],
      //   },
      // },
      // {
      //   label: 'Nội dung',
      //   prop: 'content',
      //   type: 'input',
      //   primary: true,
      //   required: true,
      //   rule: {
      //     validators: [{ required: true }],
      //   },
      // },
      // {
      //   label: 'Địa điểm',
      //   prop: 'place',
      //   type: 'input',
      //   primary: true,
      //   required: true,
      //   rule: {
      //     validators: [{ required: true }],
      //   },
      // },
      {
        label: 'Tệp đính kèm',
        prop: 'attached_file',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Ghi chú',
        prop: 'cancellation_minutes_note',
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

  lstStaffRef : any;

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

  constructor(private listDataService: ListDataService, private dialogService: DialogService, private cdr: ChangeDetectorRef,private api: ApiService ) {}

  ngOnInit() {
    this.getList();
    // this.getcancellation_minutes();
  }

  search() {
    this.getList();
  }

  getList() {
    this.api.post("api/manager/CancellationMinutesRef/Search",{page : this.pager.pageIndex , pageSize: this.pager.pageSize , cancellation_minutes_rcd : this._search.keyword}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }

  getStaffRef() {
    this.api.post("api/manager/StaffRef/Search",{page : 1 , pageSize: 1000 }).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.lstStaffRef = a.data;
      console.log(this.lstStaffRef);
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
    this.formData = this.newCancellationMinutesRef;
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
            this.api.post("api/manager/CancellationMinutesRef/DeleteMulti",[id]).subscribe((res:any) => {
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
      // this.api.post("api/manager/CancellationMinutesRef/Create",{...e}).subscribe((res:any) => {
      //   let a = JSON.parse(JSON.stringify(res));
      //   this.getList();
      // });
    }
    else {
      // e.cancellation_minutes_name_l = e.cancellation_minutes_name;
      // e.cancellation_minutes_name_e = e.cancellation_minutes_name;
      e.cancellation_minutes_note_l = e.cancellation_minutes_note;
      e.cancellation_minutes_note_e = e.cancellation_minutes_note;
      this.api.post("api/manager/CancellationMinutesRef/Update",{...e}).subscribe((res:any) => {
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
