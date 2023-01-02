import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { DataTableComponent, TableWidthConfig } from 'ng-devui/data-table';
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
  insert = true;
  doneSetup: Subscription;
  isSubmitting = false;

  deleteList: any[] = [];
  addList: any[] = [];

  editRowIndex = -1;

  year: any;
  year2: any;

  _search2: any = {
    profile_code: null,
    profile_name: null,
    year: null,
    status: 2
  };

  _search: any = {
    profile_code: null,
    profile_name: null,
    status: -1,
    year: null
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

  search2() {
    this.getList2();
  }

  getList(year: any = null) {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
      year: year?.selectedDate?.getFullYear()
    };

    this.busy = this.api.post('api/manager/ProfileRef/Search', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }

  getList2(year: any = null) {
    const data = {
      page: this.pager2.pageIndex,
      pageSize: this.pager2.pageSize,
      ...this._search,
      year: year?.selectedDate?.getFullYear(),
    };

    this.busy = this.api.post('api/manager/CancellationMinutesRef/SearchProfileForCancellation', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));

      this.basicDataSource2 = a.data;
      this.pager2.total = a.totalItems;
    });
  }

  reset() {
    this.searchForm = {
      borderType: 'bordered',
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

  changeProfileStatus() {
    if (this.addList.length > 0) {
      if (!this.isSubmitting) {
        this.isSubmitting = true;
        let profile_rcds : any[] = [];
        this.addList.forEach((profile: any) => {
          profile_rcds.push(profile.profile_rcd)
        })

        this.api.post('api/manager/ProfileRef/UpdateStatus', {
          items: profile_rcds,
          updated_by: JSON.parse(localStorage.getItem('userinfo') || '{}')?.user_rcd,
          status: -1,
        }).subscribe((res: any) => {
          // this.editForm.modalInstance.hide();
          this.reset();
          this.getList2();
          this.toastService.open({
            value: [{ severity: 'success', summary: 'Thành công', content: `Chuyển hồ sơ sang đã hủy thành công!` }],
          });
          this.isSubmitting = false;
        })

      }
    }
  }

  batchDelete(deleteList: any[]) {
    if (deleteList.length > 0) {
      const results = this.dialogService.open({
        id: 'delete-dialog',
        width: '600px',
        maxHeight: '600px',
        title: 'Xóa hồ sơ',
        showAnimate: true,
        content: `Bạn có chắc chắn muốn xóa ${deleteList.length} bản ghi?`,
        backdropCloseable: true,
        onClose: () => {},
        buttons: [
          {
            cssClass: 'primary',
            text: 'Ok',
            disabled: false,
            handler: ($event: Event) => {
              if (!this.isSubmitting) {
                this.isSubmitting = true;
                this.deleteRows(deleteList).subscribe((res) => {
                  results.modalInstance.hide();
                  this.reset();
                  this.toastService.open({
                    value: [{ severity: 'success', summary: 'Thành công', content: `Xóa hồ sơ thành công!` }],
                  });
                  this.isSubmitting = false;
                });
              }
            },
          },
          {
            id: 'btn-cancel',
            cssClass: 'common',
            text: 'Hủy',
            handler: ($event: Event) => {
              results.modalInstance.hide();
            },
          },
        ],
      });

      console.log(results);
    }
  }

  openModal() {
    this.insert = true;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '65%',
      title: 'Chuyển hồ sơ sang đã hủy',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  deleteRows(deleteList: any[]) {
    let ids = deleteList.map((item: any) => item.profile_rcd)
    return this.api.post('api/manager/ProfileRef/DeleteMulti', ids)
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
    this.pager2.pageSize = e;
    this.getList2();
  }
}
