import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
import { Item, DurationStorage } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';

@Component({
  selector: 'app-duration-storage-ref',
  templateUrl: './duration-storage-ref.component.html',
  styleUrls: ['./duration-storage-ref.component.scss']
})
export class DurationStorageRefComponent implements OnInit {

  filterDurationStorageShow = false;

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

  newDurationStorage  = {
    duration_storage_rcd: "",
    
    duration_storage_name_e: "",
    duration_storage_name_l: "", 
    sort_order: 1,
    duration_storage_note_e: "",
    duration_storage_note_l: "",
    active_flag: 0,
    created_by_user_id: "",
    created_date_time: "",
    lu_user_id: "",
    lu_updated: ""
    
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
      field: 'duration_storage_rcd',
      width: '150px',
    },
    
    {
      field: 'duration_storage_name_e',
      width: '150px',
    },
    {
      field: 'duration_storage_name_l',
      width: '150px',
    },
    {
      field: 'duration_storage_note_e',
      width: '100px',
    },
    {
      field: 'duration_storage_note_l',
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

  basicDataSource: DurationStorage[] = [];

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: [
      // {
      //   label: 'Mã thời hạn lưu trữ',
      //   prop: 'duration_storage_rcd',
      //   type: 'input',
      //   primary: true,
      //   required: true,
      //   rule: {
      //     validators: [{ required: true }],
      //   },
      // },
      
      {
        label: 'Thời hạn lưu trữ',
        prop: 'duration_storage_name_l',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      
      {
        label: 'Ghi chú',
        prop: 'duration_storage_note_l',
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
    keyword: ''
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
    this.api.post("api/manager/DurationStorageRef/Search",{page : this.pager.pageIndex , pageSize: this.pager.pageSize , durationstorage_name_l : this._search.keyword}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
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
      title: 'Sửa',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  addRow() {
    this.insert = true;
    this.formData = this.newDurationStorage;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '600px',
      maxHeight: '600px',
      title: 'Thêm thời hạn lưu trữ',
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
      title: 'Xóa thời hạn lưu trữ',
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
            this.api.post("api/manager/DurationStorageRef/DeleteMulti",[id]).subscribe((res:any) => {
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
      const obj = {
        duration_storage_rcd:e.duration_storage_rcd,
        duration_storage_name_e : '',
        duration_storage_name_l : e.duration_storage_name_l,
        duration_storage_note_e : '',
        duration_storage_note_l : e.duration_storage_note_l,
        created_by_user_id : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        active_flag : e.active_flag,
        created_date_time : '2022-12-23T02:13:28.930Z',
      }

      this.api.post("api/manager/DurationStorageRef/Create",{...obj}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        console.log(a);
        this.getList();
        alert("Thêm thành công!");
      });
      console.log(obj);
    }
    else {
      
      e.duration_storage_name_e = e.duration_storage_name_e;
      e.duration_storage_name_l = e.duration_storage_name_l;
      e.duration_storage_note_e = e.duration_storage_note_e;
      e.duration_storage_note_l = e.duration_storage_note_l;
     
      console.log(e);
      this.api.post("api/manager/DurationStorageRef/Update",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        console.log(a);
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