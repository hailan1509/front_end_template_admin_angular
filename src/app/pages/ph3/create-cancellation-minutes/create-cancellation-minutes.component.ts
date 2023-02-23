import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { DataTableComponent } from 'ng-devui/data-table';
import { DialogService } from 'ng-devui/modal';
import { ToastService } from 'ng-devui/toast';
import { ApiService } from 'src/app/api.service';
import { MapToPipe } from 'src/app/@shared/components/admin-form/mapToPipe.pipe';
import { EditableTip } from 'ng-devui/data-table';
import { FormConfig } from 'src/app/@shared/components/admin-form';

@Component({
  selector: 'app-create-cancellation-minutes',
  templateUrl: './create-cancellation-minutes.component.html',
  styleUrls: ['./create-cancellation-minutes.component.scss'],
})
export class CreateCancellationMinutesComponent implements OnInit {

  @ViewChildren(DataTableComponent) datatables: QueryList<DataTableComponent>;
  @ViewChild('EditorTemplate', { static: true }) EditorTemplate: TemplateRef<any>;
  basicDataSource = [];
  editableTip = EditableTip.hover;
  cancellationMinutes: any = {
    cancellation_minutes_number: "",
    decision_number: "",
    number_of_cancellations: null,
    content: "",
    place: "",
    cancellation_method: "",
    time_destroy: null,
    cancellation_minutes_note_l: "",
    cancellation_minutes_note_e: "",
    attached_file: "",
    status: 0,
    comment: "",
    user_rcd: "",
    created_by_user_id: JSON.parse(localStorage.getItem('userinfo') || '{}')?.user_rcd,
    profiles: []
  }

  profiles: any = [];
  users = [];
  user: any;
  insert = true;
  doneSetup: Subscription;
  isSubmitting = false;

  deleteList: any[] = [];
  addList: any[] = [];
  pendingChange: any = {};

  year: any;

  editRowIndex = -1;

  _search = {
    profile_code: null,
    profile_name: null,
    user_rcd: JSON.parse(localStorage.getItem('userinfo') || '{}').user_rcd,
    year: null,
    status: 2,
    select : 1
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

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 5,
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
  editForm: any = null;
  role_rcd: any = "";

  busy: Subscription;
  constructor(private api: ApiService, private dialogService: DialogService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.getList();
    this.loadUsersMore();
  }

  search() {
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
      this.api.post("api/manager/profileRef/Search",{page : this.pager.pageIndex , pageSize: this.pager.pageSize , profile_name_l : this._search.profile_name, active_flag : this._search.select, user_rcd : user_rcd}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        a.data.forEach((element:any) => {
          element.cancellation_reason = "Tài liệu hết giá trị";
        });
  
        this.basicDataSource = a.data;
        this.pager.total = a.totalItems;
      });
    }
  }

  loadUsersMore() {
    this.busy = this.api.post('api/manager/HandoverMinutesRef/SearchUser', { page: 0, pageSize: 0}).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.users = a.data;
    });
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

  onRowCheckChange(checked: any, rowIndex: any, nestedIndex: any, rowItem: any) {
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatables.first.setRowCheckStatus({
      rowIndex: rowIndex,
      nestedIndex: nestedIndex,
      rowItem: rowItem,
      checked: checked,
    });

    this.deleteList = this.datatables.first.getCheckedRows();
  }

  onRowCheckChange2(checked: any, rowIndex: any, nestedIndex: any, rowItem: any) {
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatables.last.setRowCheckStatus({
      rowIndex: rowIndex,
      nestedIndex: nestedIndex,
      rowItem: rowItem,
      checked: checked,
    });
    this.pendingChange[rowItem.profile_rcd] = checked;
    if(checked) {
      this.addList.push(rowItem);
    }
    else {
      let index = this.addList.findIndex((x:any) => x.profile_rcd == rowItem.profile_rcd);
      if(index > -1) {
        this.addList.splice(index, 1);
      }
    }
  }

  checkDisabled(rowItem:any,type:any) {
    if(type == 1){
      return this.profiles.findIndex((x:any) => x.profile_rcd == rowItem.profile_rcd) > -1 ? true : false ;
    }
    else {
      console.log(this.addList.findIndex((x:any) => x.profile_rcd == rowItem.profile_rcd) > -1 ? true : false)
      return this.addList.findIndex((x:any) => x.profile_rcd == rowItem.profile_rcd) > -1 ? 'checked' : '';
    } 
  }

  onCheckAllChange() {
    this.deleteList = this.datatables.first.getCheckedRows();
  }
  onCheckAllChange2() {
    this.addList = this.datatables.last.getCheckedRows();
  }

  openModal() {
    this.insert = true;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '65%',
      title: 'Thêm danh sách hồ sơ hết giá trị',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  addProfilesToHandover() {
    this.pendingChange = {};
    if (this.addList.length > 0) {
      this.profiles = [...this.profiles, ...this.addList];
      
      this.deleteList = [...this.deleteList, ...this.addList]
      this.getList();
    }
    this.addList = [];
  }

  addRow() {
    this.insert = true;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '65%',
      title: 'Thêm danh sách hồ sơ hết giá trị',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  editRow(index: number, product_id: any) {
    this.insert = false;
    this.editRowIndex = index;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '65%',
      title: 'Cập nhập sản phẩm',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }



  onSubmitted({ valid, directive, data, errors }: any) {
    if (!valid) {
      this.toastService.open({
        value: [{ severity: 'warn', summary: 'Chú ý', content: `Chưa điền đủ thông tin được yêu cầu!` }],
      });
      return false;
    }
    if (this.isSubmitting) {
      return false;
    }

    this.cancellationMinutes.profiles = this.profiles.map((item: any) => {
      return {
        profile_rcd: item.profile_rcd,
        cancellation_reason: item.cancellation_reason
      }
    })

    this.cancellationMinutes.user_rcd = this.user.user_rcd

    this.cancellationMinutes.time_destroy = this.cancellationMinutes.time_destroy ? new Date(Date.UTC(this.cancellationMinutes.time_destroy.getFullYear(), this.cancellationMinutes.time_destroy.getMonth(), this.cancellationMinutes.time_destroy.getDate())) : null
    console.log(this.cancellationMinutes)
    this.api.post('api/manager/CancellationMinutesRef/Create', this.cancellationMinutes).subscribe((res: any) => {
      this.toastService.open({
        value: [{ severity: 'success', summary: 'Thành công', content: `Lập biên bản bàn giao tài liệu hủy thành công!` }],
      });

      this.profiles = [];
      this.cancellationMinutes.profiles = [];
      this.isSubmitting = false;
    })


    return true;
  }

  batchDelete(deleteList: any[]) {
    if (deleteList.length > 0) {
      let remain = this.profiles.filter((item: any) => {
        return deleteList.findIndex(d=>d.profile_rcd == item.profile_rcd) == -1
      })
      this.profiles = remain;
    }
  }
  onCanceled() {
    this.editForm!.modalInstance.hide();
    this.editRowIndex = -1;

  }

  onPageChange(e: number) {
    this.pager.pageIndex = e;
    this.getList();
  }

  onSizeChange(e: number) {
    this.pager.pageSize = e;
    this.getList();
  }

  save() {
    console.log("hải dv");
  }
}
