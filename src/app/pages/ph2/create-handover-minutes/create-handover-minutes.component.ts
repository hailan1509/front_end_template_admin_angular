import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { DataTableComponent } from 'ng-devui/data-table';
import { DialogService } from 'ng-devui/modal';
import { ToastService } from 'ng-devui/toast';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-handover-minutes',
  templateUrl: './create-handover-minutes.component.html',
  styleUrls: ['./create-handover-minutes.component.scss']
})
export class CreateHandoverMinutesComponent implements OnInit {

  @ViewChildren(DataTableComponent) datatables: QueryList<DataTableComponent>;
  @ViewChild('EditorTemplate', { static: true }) EditorTemplate: TemplateRef<any>;
  basicDataSource = [];

  handoverMinutes: any = {
    handover_minutes_code: "",
    handover_minutes_name_l: "",
    handover_minutes_name_e: "",
    place: "",
    reason: "",
    handover_minutes_note_l: "",
    handover_minutes_note_e: "",
    user_rcd: "",
    create_by_user_id: JSON.parse(localStorage.getItem('userinfo') || '{}')?.user_rcd,
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

  year: any;

  editRowIndex = -1;

  _search = {
    profile_code: null,
    profile_name: null,
    status: 0,
    year: null
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
    this.loadUsersMore();
  }

  search() {
    this.getList();
  }

  getList(year: any = null) {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
      year: year?.selectedDate?.getFullYear(),
      json_list_id: this.addList.map((item:any) => item.profile_rcd)
    };

    this.busy = this.api.post('api/manager/HandoverMinutesRef/SearchProfile', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
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

  openModal() {
    this.insert = true;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '65%',
      title: 'Thêm danh sách hồ sơ chờ chỉnh lý',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  addProfilesToHandover() {
    if (this.addList.length > 0) {
      this.profiles = [...this.profiles, ...this.addList];
      console.log(this.profiles)

      this.deleteList = [...this.deleteList, ...this.addList]
      this.getList();
    }
  }

  addRow() {
    this.insert = true;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '65%',
      title: 'Thêm danh sách hồ sơ chờ chỉnh lý',
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
      title: 'Cập nhập biên bản',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }



  onSubmitted({ valid, directive, data, errors }: any) {
    console.log('Valid:', valid, 'Directive:', directive, 'data', data, 'errors', errors);
    if (!valid) {
      this.toastService.open({
        value: [{ severity: 'warn', summary: 'Chú ý', content: `Chưa điền đủ thông tin được yêu cầu!` }],
      });
      return false;
    }
    if (this.isSubmitting) {
      return false;
    }

    this.handoverMinutes.profiles = this.profiles.map((item: any) => {
      return {
        profile_rcd: item.profile_rcd
      }
    })
    this.api.post('api/manager/HandoverMinutesRef/Create', this.handoverMinutes).subscribe((res: any) => {
      this.toastService.open({
        value: [{ severity: 'success', summary: 'Thành công', content: `Lập biên bản bàn giao tài liệu thành công!` }],
      });

      this.isSubmitting = false;
    })


    return true;
  }

  batchDelete(deleteList: any[]) {
    if (deleteList.length > 0) {
      let remain = this.profiles.filter((item: any) => {
          console.log(deleteList.findIndex(d => d.profile_rcd == item.profile_rcd) != -1)
        return deleteList.findIndex(d=>d.profile_rcd == item.profile_rcd) == -1
      })
      this.profiles = remain;
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
