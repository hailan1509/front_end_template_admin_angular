import { ChangeDetectorRef, Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Item, HandoverMinutesRef } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';

@Component({
  selector: 'app-create-handover-minutes',
  templateUrl: './create-handover-minutes.component.html',
  styleUrls: ['./create-handover-minutes.component.scss']
})
export class CreateHandoverMinutesComponent implements OnInit {

  
  handoverRecordCancelled = {
    handover_record_cancelled_rcd: ""
  };
  users = [];

  filterhandoverMinutesRefShow = false;

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

  newHandoverMinutesRef  = {
    handover_minutes_rcd: "",
    staff_rcd: "",
    profile_rcd: "",
    handover_minutes_name_l: "",
    handover_minutes_name: "",
    handover_minutes_name_e: "",
    staff_name_l: "",
    staff_name: "",
    profile_name_e: "",
    profile_name_l: "",
    profile_name: "",
    staff_name_e: "",
    place: "",
    reason: "",
    sort_order: 1,
    handover_minutes_note_l: "",
    handover_minutes_note: "",
    handover_minutes_note_e: "",
    active_flag: 0,
    created_by_user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    created_date_time: "",
    lu_updated: "",
    lu_user_id: "",
    // handover_minutes_group: 1,
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
    // {
    //   field: 'handover_minutes_rcd',
    //   width: '150px',
    // },  
    {
      field: 'staff_name',
      width: '100px',
    },
    {
      field: 'profile_name',
      width: '150px',
    },
    // {
    //   field: 'profile_name',
    //   width: '150px',
    // },

    // {
    //   field: 'handover_minutes_note',
    //   width: '150px',
    // },
    {
      field: 'reason',
      width: '100px',
    },
    {
      field: 'place',
      width: '100px',
    },
    {
      field: 'attached_file',
      width: '150px',
    },
    {
      field: 'handover_minutes_note',
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

  basicDataSource: HandoverMinutesRef[] = [];

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: [
      // {
      //   label: 'Mã biên bản bàn giao',
      //   prop: 'handover_minutes_rcd',
      //   type: 'input',
      //   primary: true,
      //   required: true,
      //   rule: {
      //     validators: [{ required: true }],
      //   },
      // },    
      {
        label: 'Tên nhân viên bàn giao',
        prop: 'staff_name',
        primary: false,
        type: 'input',
      },
      {
        label: 'Tên hồ sơ bàn giao',
        prop: 'profile_name',
        primary: false,
        type: 'input',
      },
      {
        label: 'Địa điểm',
        prop: 'place',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Địa điểm',
        prop: 'place',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      // {
      //   label: 'Số kí hiệu biên bản',
      //   prop: 'handover_minutes_number',
      //   type: 'input',
      //   primary: false,
      //   required: true,
      //   rule: {
      //     validators: [{ required: true }],
      //   },
      // },
      {
        label: 'Nội dung',
        prop: 'content',
        type: 'input',
        primary: true,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
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
        prop: 'handover_minutes_note',
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
    lang: 'l',
    handover_minutes_rcd: "",
    staff_rcd: "",
    profile_rcd:"",
    handover_minutes_name:"",
    handover_minutes_note:"",
    keyword:""
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
    // this.gethandover_minutes();
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
    this.api.post("api/manager/HandoverMinutesRef/Search",searchBody).subscribe((res:any) => {
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

  addProfileToHandover() {
    this.insert = true;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '65%',
      title: 'Thêm hồ sơ vào biên bản bàn giao hồ sơ hủy',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  addRow() {
    this.insert = true;
    this.formData = this.newHandoverMinutesRef;
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
            this.api.post("api/manager/HandoverMinutesRef/DeleteMulti",[id]).subscribe((res:any) => {
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
      // e.handover_minutes_group = 1;
       e.handover_minutes_name_l = e.handover_minutes_name;
      // e.handover_minutes_name_e = e.handover_minutes_name;
       e.handover_minutes_note_l = e.handover_minutes_note;
      // e.handover_minutes_note_e = e.handover_minutes_note;
      // this.api.post("api/manager/handoverMinutesRef/Create",{...e}).subscribe((res:any) => {
      //   let a = JSON.parse(JSON.stringify(res));
      //   this.getList();
      // });
      console.log({...e})

      this.api.post("api/manager/CancellationMinutesRef/Create",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        console.log(a);
        this.getList();
        alert("Thêm thành công!");
      });
      console.log(e);
    }
    else {
      // e.handover_minutes_name_l = e.handover_minutes_name;
      // e.handover_minutes_name_e = e.handover_minutes_name;
      e.handover_minutes_note_l = e.handover_minutes_note;
      e.handover_minutes_note_e = e.handover_minutes_note;
      this.api.post("api/manager/HandoverMinutesRef/Update",{...e}).subscribe((res:any) => {
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
