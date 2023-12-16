import { ChangeDetectorRef, Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent, DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { ToastService } from 'ng-devui/toast';
import { Item, CancellationMinutesRef } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';

@Component({
  selector: 'app-cancellation-minutes',
  templateUrl: './cancellation-minutes.component.html',
  styleUrls: ['./cancellation-minutes.component.scss']
})
export class CancellationMinutesComponent implements OnInit {

  @ViewChild(DataTableComponent, { static: true }) datatable: DataTableComponent;
  deleteList: any[] = [];
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
    created_by_user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    // created_by_user_id: "",
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
  lstUsers:any;

  basicDataSource: CancellationMinutesRef[] = [];

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: [
      // {
      //   label: 'Mã biên bản hủy',
      //   prop: 'cancellation_minutes_rcd',
      //   type: 'input',
      //   primary: true,
      //   required: true,
      //   rule: {
      //     validators: [{ required: true }],
      //   },
      // },
      {
        label: 'Tên nhân viên',
        prop: 'staff_name',
        primary: false,
        type: 'input',
      },
      {
        label: 'Tên người dùng',
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
      {
        label: 'Số kí hiệu biên bản',
        prop: 'cancellation_minutes_number',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Số quyết định hủy',
        prop: 'decision_number',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
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
      {
        label: 'Địa điểm',
        prop: 'place',
        type: 'input',
        primary: true,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Phương pháp hủy',
        prop: 'cancellation_method',
        type: 'input',
      },
      {
        label: 'Thời gian hủy',
        prop: 'time_destroy',
        type: 'input',
      },
      {
        label: 'Ghi chú',
        prop: 'cancellation_minutes_note_l',
        type: 'input',
      },
      {
        label: 'Trạng thái',
        prop: 'status',
        type: 'input',
      },
      {
        label: 'Ý kiến phê duyệt hoặc từ chối',
        prop: 'comment',
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
  lstUsersfRef : any;

  _search: any = {
    cancellation_minutes_number: null,
    place: null,
    cancellation_method: null,
    time_destroy: null,
    status: null,
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };
  lstProfiles :any;
  curr_active_flag = 1;

  // busy: any;
  busy: Subscription;
  user_rcd:any = null;

  @ViewChild('EditorTemplate', { static: true })
  // EditorTemplate: any;
  EditorTemplate: TemplateRef<any>;
  @ViewChild('EditorTemplate1', { static: true })
  // EditorTemplate: any;
  EditorTemplate1: TemplateRef<any>;

  constructor(private listDataService: ListDataService, private dialogService: DialogService, private cdr: ChangeDetectorRef,private api: ApiService , private toastService: ToastService) {}

  ngOnInit() {
    if (localStorage.getItem('userinfo')) {
      let user = JSON.parse(localStorage.getItem('userinfo')!);
      if(user.role_rcd != 2)
        this.user_rcd = user.user_rcd;
    }
    this.getList();
    let params= {
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
      department_rcd:"",
      role_rcd : 1,
    };
    this.api.post("api/manager/UserRef/Search",{page : 1 , pageSize: 1000, ...params }).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let rs = a.data.map((x:any) => {
        return { id : x.user_rcd, name : x.full_name};
      })
      this.lstUsers = rs;
      this.formConfig.items = [
        // {
        //   label: 'Mã biên bản hủy',
        //   prop: 'cancellation_minutes_rcd',
        //   type: 'input',
        //   primary: true,
        //   required: true,
        //   rule: {
        //     validators: [{ required: true }],
        //   },
        // },
        {
          label: 'Người thực hiện',
          prop: 'user_rcd',
          primary: false,
          options: this.lstUsers,
          type: 'select-object',
        },
        {
          label: 'Số kí hiệu biên bản',
          prop: 'cancellation_minutes_number',
          type: 'input',
          primary: false,
          required: true,
          rule: {
            validators: [{ required: true }],
          },
        },
        {
          label: 'Số quyết định hủy',
          prop: 'decision_number',
          type: 'input',
          primary: false,
          required: true,
          rule: {
            validators: [{ required: true }],
          },
        },
        {
          label: 'Nội dung',
          prop: 'content',
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
        {
          label: 'Phương pháp hủy',
          prop: 'cancellation_method',
          type: 'input',
          primary: false,
          required: true,
        },
        {
          label: 'Thời gian hủy',
          prop: 'time_destroy',
          type: 'datePicker',
          primary: false,
          required: true,
        },
        {
          label: 'Ghi chú',
          prop: 'cancellation_minutes_note_l',
          type: 'input',
          primary: false,
          required: true,
        },
        // {
        //   label: 'Trạng thái',
        //   prop: 'active_flag',
        //   type: 'select-object',
        //   options: this.status,
        //   primary: false,
        //   required: true,
        //   rule: {
        //     validators: [{ required: true }],
        //   },
        // },
      ];
    });
    // this.getcancellation_minutes();
  }

  search() {
    this.getList();
  }

  // getList() {

  //   const searchBody = {
  //     page: this.pager.pageIndex,
  //     pageSize: this.pager.pageSize,
  //     ...this._search
  //   }
  //     this.api.post("api/manager/CancellationMinutesRef/Search",searchBody).subscribe((res:any) => {
  //     let a = JSON.parse(JSON.stringify(res));
  //     this.basicDataSource = a.data;
  //     this.pager.total = a.totalItems;
  //   });
  // }

  getList() {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
      user_rcd:this.user_rcd,
      time_destroy: this._search.time_destroy ? new Date(Date.UTC(this._search.time_destroy.getFullYear(), this._search.time_destroy.getMonth(), this._search.time_destroy.getDate())) : null
    };
    this.api.post("api/manager/CancellationMinutesRef/Search", data).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }
  getStaffRef() {
    this.api.post("api/manager/UsersRef/Search",{page : 1 , pageSize: 1000 }).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.lstUsersfRef = a.data;
      //console.log(this.lstUsersfRef);
    });
  }
  getUsersfRef() {
    this.api.post("api/manager/StaffRef/Search",{page : 1 , pageSize: 1000 }).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.lstStaffRef = a.data;
      //console.log(this.lstStaffRef);
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
      title: 'Sửa thông tin biên bản hủy',
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

  openModal(rcd:any, active_flag:any) {
    let params = {
      profile_code: null,
      profile_name_l: null,
      status: null,
      year: null,
      user_rcd: null,
      active_flag : null,
      pendding : null,
      cancellation_minutes_rcd : rcd
    };
    this.curr_active_flag = active_flag;
    this.busy = this.api.post('api/manager/profileRef/Search_cancellation_minutes', params).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.lstProfiles = a.data;
    });
    this.insert = true;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '65%',
      title: 'Xem danh sách hồ sơ',
      showAnimate: false,
      contentTemplate: this.EditorTemplate1,
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
              this.toastService.open({
                value: [{ severity: 'success', summary: 'Thông báo', content: `Xóa thành công!` }],
              });
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

  accept(item:any) {
    const results = this.dialogService.open({
      id: 'delete-dialog',
      width: '346px',
      maxHeight: '600px',
      title: 'Duyệt biên bản hủy',
      showAnimate: false,
      content: 'Bạn có chắc chắn muốn duyệt biên bản',
      backdropCloseable: true,
      onClose: () => {},
      buttons: [
        {
          cssClass: 'primary',
          text: 'Duyệt',
          disabled: false,
          handler: ($event: Event) => {
            item.active_flag = 1;
            //console.log(item);
            this.api.post("api/manager/CancellationMinutesRef/Update",{...item}).subscribe((res:any) => {
              // alert("Xóa thành công!");
              this.toastService.open({
                value: [{ severity: 'success', summary: 'Thông báo', content: `Duyệt biên bản thành công!` }],
              });
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

  delCancellationProfile(item:any) {
    const results = this.dialogService.open({
      id: 'delete-dialog',
      width: '346px',
      maxHeight: '600px',
      title: 'Xóa hồ sơ khỏi biên bản hủy',
      showAnimate: false,
      content: 'Bạn có chắc chắn muốn xóa?',
      backdropCloseable: true,
      onClose: () => {},
      buttons: [
        {
          cssClass: 'primary',
          text: 'Duyệt',
          disabled: false,
          handler: ($event: Event) => {
            let params = {
              profile_rcd : item.profile_rcd,
              cancellation_minutes_rcd : item.cancellation_minutes_rcd,
              active_flag : -1
            }
            this.busy = this.api.post('api/manager/profileRef/Delete_cancellation_profile_list', params).subscribe((res: any) => {
              let a = JSON.parse(JSON.stringify(res));
              this.toastService.open({
                value: [{ severity: 'success', summary: 'Thông báo', content: 'Xóa khỏi biên bản hủy thành công!' }],
              });
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
    this.pager.pageIndex = 1;
    this.getList();
  }

  onSubmitted(e: any) {
    this.editForm!.modalInstance.hide();
    if (this.insert) {
      // e.cancellation_minutes_group = 1;
      e.cancellation_minutes_name_l = e.cancellation_minutes_name;
      // e.cancellation_minutes_name_e = e.cancellation_minutes_name;
      e.cancellation_minutes_note_l = e.cancellation_minutes_note;
      // e.cancellation_minutes_note_e = e.cancellation_minutes_note;
      // this.api.post("api/manager/CancellationMinutesRef/Create",{...e}).subscribe((res:any) => {
      //   let a = JSON.parse(JSON.stringify(res));
      //   this.getList();
      // });
      // //console.log({...e})

      // this.api.post("api/manager/CancellationMinutesRef/Create",{...e}).subscribe((res:any) => {
      //   let a = JSON.parse(JSON.stringify(res));
      //   //console.log(a);
      //   this.getList();
      //   alert("Thêm thành công!");
      // });
      // //console.log(e);
    }
    else {
      // e.cancellation_minutes_name_l = e.cancellation_minutes_name;
      // e.cancellation_minutes_name_e = e.cancellation_minutes_name;
      // //console.log(e.time_destroy)
      e.time_destroy = typeof(e.time_destroy) == "string" ? new Date(this.formatDateView(e.time_destroy,false)) : new Date(Date.UTC(e.time_destroy.getFullYear(), e.time_destroy.getMonth(), e.time_destroy.getDate()))
      e.cancellation_minutes_note_l = e.cancellation_minutes_note;
      e.cancellation_minutes_note_e = e.cancellation_minutes_note;

      //console.log(e);
      this.api.post("api/manager/CancellationMinutesRef/Update",{...e}).subscribe((res:any) => {
        this.toastService.open({
          value: [{ severity: 'success', summary: 'Thông báo', content: `Cập nhật thành công!` }],
        });
        this.getList();
        alert("Sửa thành công!");
      });

    }
  }
  formatDateView(date:any, yearFirst:boolean) {
    if (date) {

      let arr_date_time = date.split('T');
      let  arr_date = arr_date_time[0].split('-');
      //console.log(arr_date[yearFirst ?2 : 0 ] + '/' + arr_date[1] + '/' + arr_date[yearFirst ? 0 :2]);
      return arr_date[yearFirst ?2 : 0 ] + '-' + arr_date[1] + '-' + arr_date[yearFirst ? 0 :2];
    }
    return "";
  }

  onRowCheckChange(checked: any, rowIndex: any, nestedIndex: any, rowItem: any) {
    //console.log(rowIndex, nestedIndex, rowItem.$checked);
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatable.setRowCheckStatus({
      rowIndex: rowIndex,
      nestedIndex: nestedIndex,
      rowItem: rowItem,
      checked: checked,
    });

    this.deleteList = this.datatable.getCheckedRows();
    //console.log(this.deleteList);
  }

  onCheckAllChange() {
    this.deleteList = this.datatable.getCheckedRows();
  }

  batchDelete(deleteList: any[]) {
    if (deleteList.length > 0) {

    }
  }

  onCanceled() {
    this.editForm!.modalInstance.hide();
    this.editRowIndex = -1;
  }

}
