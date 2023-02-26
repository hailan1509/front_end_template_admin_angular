import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { DataTableComponent } from 'ng-devui/data-table';
import { DialogService } from 'ng-devui/modal';
import { ToastService } from 'ng-devui/toast';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile-pending-canceled',
  templateUrl: './profile-pending-canceled.component.html',
  styleUrls: ['./profile-pending-canceled.component.scss'],
})
export class ProfilePendingCanceledComponent implements OnInit {

  @ViewChild(DataTableComponent, { static: true }) datatable: DataTableComponent;
  @ViewChild('EditorTemplate', { static: true }) EditorTemplate: TemplateRef<any>;
  basicDataSource = [];
  handoverRecordCancelled = {
    handover_record_cancelled_rcd: ""
  }
  users = [];
  insert = true;
  doneSetup: Subscription;
  isSubmitting = false;

  deleteList: any[] = [];

  editRowIndex = -1;

  year: any;

  _search: any = {
    profile_code: null,
    profile_name_l: null,
    status: null,
    year: null,
    user_rcd: null,
    active_flag : 1,
    pendding : 0,
    cancellation_minutes_rcd : null,
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
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

  busy: Subscription;
  constructor(private api: ApiService, private dialogService: DialogService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.getList();
  }

  search() {
    this.getList();
  }

  getList(year: any = null) {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
    };

    this.busy = this.api.post('api/manager/profileRef/Search_cancellation_minutes', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }

  reset() {
    this.pager.pageIndex = 1;
    this.getList();
  }

  onRowCheckChange(checked: any, rowIndex: any, nestedIndex: any, rowItem: any) {
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatable.setRowCheckStatus({
      rowIndex: rowIndex,
      nestedIndex: nestedIndex,
      rowItem: rowItem,
      checked: checked,
    });

    this.deleteList = this.datatable.getCheckedRows();
    console.log(this.deleteList);
  }

  onCheckAllChange() {
    this.deleteList = this.datatable.getCheckedRows();
  }

  addProfileToHandover() {
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



  onSubmitted() {


  }

  batchDelete(item: any) {
    let params = {
      profile_rcd : item.profile_rcd,
      cancellation_minutes_rcd : item.cancellation_minutes_rcd,
      active_flag : parseInt(this._search.active_flag) == 1 ? 0 : 1
    }
    this.busy = this.api.post('api/manager/profileRef/Delete_cancellation_profile_list', params).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.toastService.open({
        value: [{ severity: 'success', summary: 'Thông báo', content: params.active_flag ? 'Bật trạng thái hủy hồ sơ thành công!' : 'Tắt trạng thái hủy hồ sơ thành công!' }],
      });
      this.getList();
    });
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
}
