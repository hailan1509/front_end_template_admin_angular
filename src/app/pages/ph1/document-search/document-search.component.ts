import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { DataTableComponent } from 'ng-devui/data-table';
import { DialogService } from 'ng-devui/modal';
import { ToastService } from 'ng-devui/toast';
import { ApiService } from 'src/app/api.service';
import { DocumentAttachment, DocumentRef } from 'src/app/@core/data/listData';
import { FormLayout } from 'ng-devui';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-document-search',
  templateUrl: './document-search.component.html',
  styleUrls: ['./document-search.component.scss'],
})
export class DocumentSearchComponent implements OnInit {
  files: File[] = [];
  progress: any;
  @ViewChild(DataTableComponent, { static: true }) datatable: DataTableComponent;
  @ViewChild('EditorTemplate', { static: true }) EditorTemplate: TemplateRef<any>;
  layoutDirection: FormLayout = FormLayout.Vertical;

  basicDataSource = [];
  documents: DocumentRef[] = [];
  document: DocumentRef = {};
  attachments: any[] = [];
  cloneAttachments: DocumentAttachment[] = [];

  profile_options: any[] = [];
  profile_current: any;
  agency_issued_options: any[] = [];
  agency_issued_current: any;
  confidentiality_options: any[] = [];
  confidentiality_current: any;
  document_type_options: any[] = [];
  document_type_current: any;
  physical_condition_options: any[] = [];
  physical_condition_current: any;

  insert = true;
  doneSetup: Subscription;
  isSubmitting = false;

  deleteList: any[] = [];

  editRowIndex = -1;

  year: any;

  _search: any = {
    document_number: null,
    document_name: null,
    profile_rcd: null,
    profile_code: null,
  };

  statusCurrent: any;

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
    this.busy = this.getOptions().subscribe((res: any[]) => {
      this.agency_issued_options = res[0].data;
      this.confidentiality_options = res[1].data;
      this.physical_condition_options = res[2].data;
      this.document_type_options = res[3].data;
      this.profile_options = res[4].data;
    });
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
    this.api.post('api/manager/DocumentRef/Search', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.documents = a.data;
      this.pager.total = a.totalItems;
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

  mapOptionsForDocument() {
    this.physical_condition_current = this.physical_condition_options.find((a) => a.value == this.document.physical_condition_rcd);
    this.document_type_current = this.document_type_options.find((a) => a.value == this.document.document_type_rcd);
    this.confidentiality_current = this.confidentiality_options.find((a) => a.value == this.document.confidentiality_rcd);
    this.agency_issued_current = this.agency_issued_options.find((a) => a.value == this.document.agency_issued_rcd);
    this.profile_current = this.profile_options.find((a) => a.value == this.document.profile_rcd);
  }

  mapDocumentFromSelect(file_names: string[]) {
    this.document = {
      ...this.document,
      physical_condition_rcd: this.physical_condition_current?.value,
      document_type_rcd: this.document_type_current?.value,
      confidentiality_rcd: this.confidentiality_current?.value,
      agency_issued_rcd: this.agency_issued_current?.value,
      profile_rcd: this.profile_current?.value,
      created_by_user_id: JSON.parse(localStorage.getItem('userinfo')!).user_rcd,
    };

    if (file_names && this.insert) {
      for (let i = 0; i < file_names.length; i++) {
        this.document.attachments_json!.push({
          file_name: file_names[i],
          file_weight: this.files[i].size,
        });
      }
    }

    if (!this.insert) {
      this.cloneAttachments.forEach((item) => {
        if (this.document.attachments_json!.findIndex(a => a.document_attachment_id == item.document_attachment_id)) {
          item.action = 'DELETE';
        }
      })

      if (file_names) {
        for (let i = 0; i < file_names.length; i++) {
          this.cloneAttachments!.push({
            document_attachment_id: this.newGuid(),
            file_name: file_names[i],
            file_weight: this.files[i].size,
            action: 'INSERT'
          });
        }
      }

      this.document.attachments_json = this.cloneAttachments;
      this.files = [];
    }
  }

  getOptions() {
    let arrayRequest = [];
    arrayRequest.push(this.api.get('api/manager/AgencyIssuedRef/GetListDropdown'));
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownConfidentiality'));
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownPhysicalCondition'));
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownDocumentType'));
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdown'));

    return combineLatest(arrayRequest);
  }

  getDocumentById(document_rcd: string) {
    return this.api.get('api/manager/DocumentRef/GetById/' + document_rcd);
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
  batchDelete(deleteList: any[]) {
    if (deleteList.length > 0) {
      const results = this.dialogService.open({
        id: 'delete-dialog',
        width: '600px',
        maxHeight: '600px',
        title: 'Xóa văn bản',
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
                    value: [{ severity: 'success', summary: 'Thành công', content: `Xóa văn bản thành công!` }],
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

  resetDocument() {
    this.files = [];
    this.attachments = [];
    this.document = {
      attachments_json: [],
    };
    this.cloneAttachments = [];

    this.physical_condition_current = null;
    this.document_type_current = null;
    this.confidentiality_current = null;
    this.agency_issued_current = null;
  }

  addRow() {
    this.resetDocument();

    this.insert = true;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '75%',
      title: 'Thêm văn bản',
      showAnimate: true,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  editRow(index: number, document_rcd: any) {
    this.resetDocument();

    this.doneSetup = this.getDocumentById(document_rcd).subscribe((res: any) => {
      this.document = res.data;
      this.cloneAttachments = JSON.parse(JSON.stringify(this.document.attachments_json))

      this.mapOptionsForDocument();

      this.attachments = [...this.files, ...this.document.attachments_json!];
      console.log(this.attachments);
    });

    this.insert = false;
    this.editRowIndex = index;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '75%',
      title: 'Cập nhập văn bản',
      showAnimate: true,
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
    this.isSubmitting = true;

    if (this.insert) {
      this.api.uploadFile('api/manager/DocumentRef/OnlyUpload', this.files).subscribe({
        next: (event: any) => {
          console.log(event);
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.mapDocumentFromSelect(event.body.data);
            this.api.post('api/manager/DocumentRef/Create', this.document).subscribe((res: any) => {
              this.search();
              this.isSubmitting = false;

              this.resetDocument();
              this.toastService.open({
                value: [{ severity: 'success', summary: 'Thành công', content: `Thêm văn bản thành công!` }],
              });
              console.log(this.document);
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isSubmitting = false;
          console.log(err);
        },
      });
    } else {
      this.api.uploadFile('api/manager/DocumentRef/OnlyUpload', this.files).subscribe({
        next: (event: any) => {
          console.log(event);
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.mapDocumentFromSelect(event.body.data);
            this.api.post('api/manager/DocumentRef/Update', this.document).subscribe((res: any) => {
              this.search();
              this.isSubmitting = false;

              this.document.attachments_json = this.document.attachments_json!.filter((item) => {
                return item.action != 'DELETE';
              })

              this.document.attachments_json.forEach(item => item.action = undefined);

              this.attachments = [...this.document.attachments_json]

              this.toastService.open({
                value: [{ severity: 'success', summary: 'Thành công', content: `Cập nhập văn bản thành công!` }],
              });
              console.log(this.document);
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isSubmitting = false;
          console.log(err);
        },
      });

    }
    return true;
  }

  deleteRows(deleteList: any[]) {
    let ids = deleteList.map((item: any) => item.document_rcd)
    return this.api.post('api/manager/DocumentRef/DeleteMulti', ids)
  }

  onSelectFiles(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.attachments = [...this.files, ...this.document.attachments_json!];
  }

  onRemoveFile(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.document.attachments_json!.splice(this.document.attachments_json!.indexOf(event), 1);
    this.attachments = [...this.files, ...this.document.attachments_json!];
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

  public newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // tslint:disable-next-line:no-bitwise
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }
}
