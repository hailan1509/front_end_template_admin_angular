import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { DataTableComponent } from 'ng-devui/data-table';
import { DialogService } from 'ng-devui/modal';
import { ToastService } from 'ng-devui/toast';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-handover-record-canceled',
  templateUrl: './create-handover-record-canceled.component.html',
  styleUrls: ['./create-handover-record-canceled.component.scss'],
})
export class CreateHandoverRecordCancelledComponent implements OnInit {

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

  _search = {
    text_search: null,
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
      page_size: this.pager.pageSize,
      ...this._search,
    };

    this.busy = this.api.post('api/product/search', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.total_row;
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
      const results = this.dialogService.open({
        id: 'delete-dialog',
        width: '600px',
        maxHeight: '600px',
        title: 'Xóa sản phẩm',
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
                    value: [{ severity: 'success', summary: 'Thành công', content: `Xóa phẩm thành công!` }],
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

  deleteRows(deleteList: any[]) {
    let product_ids: any[] = [];
    let paths_for_delete: any[] = [];
    deleteList.forEach((product: any) => {
      product_ids.push(product.product_id)
      product.colors.forEach((color: any) => {
        color.product_image1 && paths_for_delete.push(color.product_image1);
        color.product_image2 && paths_for_delete.push(color.product_image2);
        color.product_image3 && paths_for_delete.push(color.product_image3);
        color.product_image4 && paths_for_delete.push(color.product_image4);
        color.product_image5 && paths_for_delete.push(color.product_image5);
      });
    })

    let arrayRequest = [];
    arrayRequest.push(this.api.post(`api/admin/file/delete`, {
      paths: paths_for_delete,
    }));

    arrayRequest.push(this.api.post('api/admin/product/deleteMulti', {
      ids: product_ids
    }))

    return combineLatest(arrayRequest);
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
