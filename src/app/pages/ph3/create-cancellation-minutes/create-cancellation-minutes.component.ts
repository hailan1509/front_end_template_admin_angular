import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { DataTableComponent } from 'ng-devui/data-table';
import { DialogService } from 'ng-devui/modal';
import { ToastService } from 'ng-devui/toast';
import { ApiService } from 'src/app/api.service';
import { EditableTip } from 'ng-devui/data-table';

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

  year: any;

  editRowIndex = -1;

  _search = {
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
      json_list_id: this.profiles.map((item:any) => item.profile_rcd)
    };

    this.busy = this.api.post('api/manager/CancellationMinutesRef/SearchProfile', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      a.data.forEach((element:any) => {
        element.cancellation_reason = "T??i li???u h???t gi?? tr???";
      });

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
      title: 'Th??m danh s??ch h??? s?? h???t gi?? tr???',
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
      title: 'Th??m danh s??ch h??? s?? h???t gi?? tr???',
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
      title: 'C???p nh???p s???n ph???m',
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
        value: [{ severity: 'warn', summary: 'Ch?? ??', content: `Ch??a ??i???n ????? th??ng tin ???????c y??u c???u!` }],
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

    this.api.post('api/manager/CancellationMinutesRef/Create', this.cancellationMinutes).subscribe((res: any) => {
      this.toastService.open({
        value: [{ severity: 'success', summary: 'Th??nh c??ng', content: `L???p bi??n b???n b??n giao t??i li???u h???y th??nh c??ng!` }],
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
          console.log(deleteList.findIndex(d => d.profile_rcd == item.profile_rcd) != -1)
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
}
