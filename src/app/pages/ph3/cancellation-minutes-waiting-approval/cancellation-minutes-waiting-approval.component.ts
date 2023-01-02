import { ChangeDetectorRef, Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent, DialogService, FormLayout, TableWidthConfig, ToastService } from 'ng-devui';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Item, CancellationMinutesRef } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';

@Component({
  selector: 'app-cancellation-minutes-waiting-approval',
  templateUrl: './cancellation-minutes-waiting-approval.component.html',
  styleUrls: ['./cancellation-minutes-waiting-approval.component.scss']
})
export class CancellationMinutesWaitingApprovalComponent implements OnInit {

  @ViewChild(DataTableComponent, { static: true }) datatable: DataTableComponent;
  @ViewChild('EditorTemplate', { static: true }) EditorTemplate: TemplateRef<any>;
  basicDataSource = [];

  cancellationMinutes: any = {
    comment: "",
    status: null
  }

  users = [];
  insert = true;
  doneSetup: Subscription;
  isSubmitting = false;

  deleteList: any[] = [];

  editRowIndex = -1;

  year: any;

  _search: any = {
    cancellation_minutes_number: null,
    place: null,
    cancellation_method: null,
    time_destroy: null,
    status: 0,
    user_rcd: JSON.parse(localStorage.getItem('userinfo')!).user_rcd,
  };

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

  busy: Subscription;
  constructor(private api: ApiService, private dialogService: DialogService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.getList();
  }

  search() {
    this.getList();
  }

  getList() {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
      time_destroy: this._search.time_destroy ? new Date(Date.UTC(this._search.time_destroy.getFullYear(), this._search.time_destroy.getMonth(), this._search.time_destroy.getDate())) : null
    };
    this.api.post("api/manager/CancellationMinutesRef/Search", data).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
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
    console.log(rowIndex, nestedIndex, rowItem.$checked);
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
  batchApproval(deleteList: any) {
    if (deleteList.length > 0) {
      this.editForm = this.dialogService.open({
        id: 'edit-dialog',
        width: '65%',
        title: 'Duyệt biên bản tiêu hủy tài liệu',
        showAnimate: false,
        contentTemplate: this.EditorTemplate,
        backdropCloseable: true,
        onClose: () => {},
        buttons: [],
      });

    }
  }

  approvalRows(deleteList: any[], status: any) {
    if (!this.isSubmitting) {
      this.isSubmitting = true;

      this.cancellationMinutes.status = status
      let cancellation_minutes_rcds: any[] = [];
      deleteList.forEach((cancellation_minutes: any) => {
        cancellation_minutes_rcds.push(cancellation_minutes.cancellation_minutes_rcd)
      })

      this.api.post('api/manager/CancellationMinutesRef/Approval', {
        items: cancellation_minutes_rcds,
        comment: this.cancellationMinutes.comment,
        status: this.cancellationMinutes.status,
      }).subscribe((res: any) => {
        this.editForm.modalInstance.hide();
        this.reset();
        this.toastService.open({
          value: [{ severity: 'success', summary: 'Thành công', content: `Duyệt biên bản tiêu hủy tài liệu thành công!` }],
        });
        this.isSubmitting = false;
      })

    }
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
      title: 'Duyệt biên bản tiêu hủy tài liệu',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }



  onSubmitted({ valid, directive, data, errors }: any) {


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
}
