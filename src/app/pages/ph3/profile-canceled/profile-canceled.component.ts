import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { DataTableComponent } from 'ng-devui/data-table';
import { DialogService } from 'ng-devui/modal';
import { ToastService } from 'ng-devui/toast';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile-canceled',
  templateUrl: './profile-canceled.component.html',
  styleUrls: ['./profile-canceled.component.scss'],
})
export class ProfileCanceledComponent implements OnInit {

  @ViewChildren(DataTableComponent) datatables: QueryList<DataTableComponent>;
  @ViewChild('EditorTemplate', { static: true }) EditorTemplate: TemplateRef<any>;
  basicDataSource = [];
  basicDataSource2 = [];
  handoverRecordCancelled = {
    handover_record_cancelled_rcd: ""
  }
  users = [];
  insert = true;
  doneSetup: Subscription;
  isSubmitting = false;
  profiles: any = [];

  deleteList: any[] = [];
  addList: any[] = [];

  editRowIndex = -1;

  year: any;
  year2: any;

  _search: any = {
    profile_code: null,
    profile_name: null,
    status: -1,
    year: null
  };

  _search2 = {
    profile_code: null,
    profile_name: null,
    user_rcd: JSON.parse(localStorage.getItem('userinfo') || '{}').user_rcd,
    year: null,
    status: 2
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 5,
  };
  pager2 = {
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
      year: year?.selectedDate?.getFullYear()
    };

    this.busy = this.api.post('api/manager/HandoverMinutesRef/SearchProfile', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }

  getList2(year: any = null) {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search2,
      year: year?.selectedDate?.getFullYear(),
      json_list_id: this.profiles.map((item:any) => item.profile_rcd)
    };

    this.busy = this.api.post('api/manager/CancellationMinutesRef/SearchProfile', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));

      this.basicDataSource2 = a.data;
      this.pager2.total = a.totalItems;
    });
  }
  addProfiles() {

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
    console.log(this.datatables)

    console.log(rowIndex, nestedIndex, rowItem.$checked);
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatables.first.setRowCheckStatus({
      rowIndex: rowIndex,
      nestedIndex: nestedIndex,
      rowItem: rowItem,
      checked: checked,
    });

    this.deleteList = this.datatables.first.getCheckedRows();
    console.log(this.deleteList);
  }

  onRowCheckChange2(checked: any, rowIndex: any, nestedIndex: any, rowItem: any) {
    console.log(this.datatables)

    console.log(rowIndex, nestedIndex, rowItem.$checked);
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatables.last.setRowCheckStatus({
      rowIndex: rowIndex,
      nestedIndex: nestedIndex,
      rowItem: rowItem,
      checked: checked,
    });

    this.addList = this.datatables.last.getCheckedRows();
    console.log(this.addList);
  }

  onCheckAllChange() {
    this.deleteList = this.datatables.first.getCheckedRows();
  }
  onCheckAllChange2() {
    this.addList = this.datatables.last.getCheckedRows();
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

  batchDelete(deleteList: any[]) {
    if (deleteList.length > 0) {

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

  onPageChange2(e: number) {
    this.pager2.pageIndex = e;
    this.getList2();
  }

  onSizeChange2(e: number) {
    this.pager.pageSize = e;
    this.getList2();
  }
}
