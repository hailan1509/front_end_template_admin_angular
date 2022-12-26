import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { DataTableComponent } from 'ng-devui/data-table';
import { DialogService } from 'ng-devui/modal';
import { ToastService } from 'ng-devui/toast';
import { ApiService } from 'src/app/api.service';
import { FormLayout } from 'ng-devui/form';
import { DocumentRef, ProfileRef } from 'src/app/@core/data/listData';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent implements OnInit {
  files: File[] = [];

  @ViewChild(DataTableComponent, { static: true }) datatable: DataTableComponent;
  @ViewChild('EditorTemplate', { static: true }) EditorTemplate: TemplateRef<any>;

  layoutDirection: FormLayout = FormLayout.Vertical;

  documents: DocumentRef[] = [];
  document: DocumentRef = {

  };
  profile: ProfileRef = {
  };

  attachments: any[] = [];

  agency_issued_options: any[] = [];
  agency_issued_current: any;
  agency_issued_current2: any;
  phong_options: any[] = [];
  phong_current: any;
  fields_options: any[] = [];
  fields_current: any;
  profile_type_options: any[] = [];
  profile_type_current: any;
  archives_options: any[] = [];
  archives_current: any;
  archive_fonts_options: any[] = [];
  archive_fonts_current: any;
  profile_box_options: any[] = [];
  profile_box_current: any;
  duration_storage_options: any[] = [];
  duration_storage_current: any;
  confidentiality_options: any[] = [];
  confidentiality_current: any;
  confidentiality_current2: any;
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

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 5,
  };

  _search: any = {
    document_number: null,
    document_name: null,
    profile_rcd: null
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
  constructor(private api: ApiService, private dialogService: DialogService, private toastService: ToastService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.profile.profile_rcd = params['id'];
      this.getOptions().subscribe((res: any[]) => {
        this.fields_options = res[1].data;
        this.agency_issued_options = res[2].data;
        this.archives_options = res[3].data;
        this.confidentiality_options = res[4].data;
        this.duration_storage_options = res[5].data;
        this.physical_condition_options = res[6].data;
        this.document_type_options = res[7].data;
        this.archive_fonts_options = res[8].data;
        this.profile_type_options = res[9].data;
        this.profile_box_options = res[10].data;
        this.phong_options = res[11].data;

        //Ko tìm thấy profile
        if (!res[0].data && this.profile.profile_rcd) {
          this.router.navigate(['/pages/not-found']);
        } else if (!res[0].data && !this.profile.profile_rcd) {
          this.reset();
        } else {
          this.profile = res[0].data;
          this.getDocumentByProfileId(this.profile.profile_rcd!);
          this.mapOptionsForProfile();
        }
      });
    });

  }
  search() {
    this.getDocumentByProfileId(this.profile.profile_rcd!);
  }
  reset() {
    this.files = [];
    this.profile = {};
    this.documents = [];
    this.document = {};
    this.attachments = [];

    this.agency_issued_current = null;
    this.agency_issued_current2 = null;
    this.phong_current = null;
    this.fields_current = null;
    this.profile_type_current = null;
    this.archives_current = null;
    this.archive_fonts_current = null;
    this.profile_box_current = null;
    this.duration_storage_current = null;
    this.confidentiality_current = null;
    this.confidentiality_current2 = null;
    this.document_type_current = null;
    this.physical_condition_current = null;

    this.year = null;
    this.deleteList = [];
    this.editRowIndex = -1;
  }

  mapOptionsForProfile() {
    this.agency_issued_current = this.agency_issued_options.find(a => a.value == this.profile.agency_issued_rcd);
    this.fields_current = this.fields_options.find(a => a.value == this.profile.fields_rcd);
    this.archives_current = this.archives_options.find(a => a.value == this.profile.archives_rcd);
    this.confidentiality_current = this.confidentiality_options.find(a => a.value == this.profile.confidentiality_rcd);
    this.duration_storage_current = this.duration_storage_options.find(a => a.value == this.profile.duration_storage_rcd);
    this.archive_fonts_current = this.archive_fonts_options.find(a => a.value == this.profile.archive_fonts_rcd);
    this.profile_type_current = this.profile_type_options.find(a => a.value == this.profile.profile_type_rcd);
    this.profile_box_current = this.profile_box_options.find(a => a.value == this.profile.profile_box_rcd);
    this.phong_current = this.phong_options.find(a => a.value == this.profile.phong_rcd);
    this.year = new Date(this.profile.year!, 0);
  }

  mapProfileFromOption() {
    this.profile = {
      ...this.profile,
      agency_issued_rcd: this.agency_issued_current?.value,
      fields_rcd: this.fields_current?.value,
      archives_rcd: this.archives_current?.value,
      confidentiality_rcd: this.confidentiality_current?.value,
      duration_storage_rcd: this.duration_storage_current?.value,
      archive_fonts_rcd: this.archive_fonts_current?.value,
      profile_type_rcd: this.profile_type_current?.value,
      profile_box_rcd: this.profile_box_current?.value,
      phong_rcd: this.phong_current?.value,
      year: this.year?.getFullYear(),
      from_date: this.profile.from_date ? new Date(Date.UTC(this.profile.from_date.getFullYear(), this.profile.from_date.getMonth(), this.profile.from_date.getDate())) : undefined,
      to_date: this.profile.to_date ? new Date(Date.UTC(this.profile.to_date.getFullYear(), this.profile.to_date.getMonth(), this.profile.to_date.getDate())) : undefined,
      created_by_user_id: JSON.parse(localStorage.getItem('userinfo')!).user_rcd
    }
  }

  mapOptionsForDocument() {
    this.physical_condition_current = this.physical_condition_options.find(a => a.value == this.document.physical_condition_rcd);
    this.document_type_current = this.document_type_options.find(a => a.value == this.document.document_type_rcd);
    this.confidentiality_current2 = this.confidentiality_options.find(a => a.value == this.document.confidentiality_rcd);
    this.agency_issued_current2 = this.agency_issued_options.find(a => a.value == this.document.agency_issued_rcd);

  }

  getOptions() {
    let arrayRequest = [];
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetById/' + this.profile.profile_rcd));
    arrayRequest.push(this.api.get('api/manager/FieldsRef/GetListDropdown'));
    arrayRequest.push(this.api.get('api/manager/AgencyIssuedRef/GetListDropdown'));
    arrayRequest.push(this.api.get('api/manager/ArchivesRef/GetListDropdown'));
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownConfidentiality'));
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownDurationStorage'));
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownPhysicalCondition'));
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownDocumentType'));
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownArchiveFonts'));
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownProfileType'));
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownProfileBox'));
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownPhongRef'));

    return combineLatest(arrayRequest);
  }

  getDocumentByProfileId(profile_rcd: string) {
    if (profile_rcd) {
      const data = {
        page: this.pager.pageIndex,
        pageSize: this.pager.pageSize,
        ...this._search,
        profile_rcd: profile_rcd
      };
      this.api.post('api/manager/DocumentRef/Search', data).subscribe((res: any) => {
        this.documents = res.data;
        this.pager.total = res.totalItems;
      })
    }
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

  addRow() {
    if (this.profile.profile_rcd) {
      this.files = [];
      this.attachments = [];
      this.document = {
        attachments_json: []
      };

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
    } else {
      this.toastService.open({
        value: [{ severity: 'warn', summary: 'Chú ý', content: `Cần bổ sung hồ sơ trước!` }],
      });
    }
  }

  editRow(index: number, document_rcd: any) {
    this.files = [];
    this.attachments = [];
    this.doneSetup = this.getDocumentById(document_rcd).subscribe((res: any) => {
      this.document = res.data;
      this.mapOptionsForDocument();

      this.attachments = [...this.files, ...this.document.attachments_json!]
      console.log(this.attachments)
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

    this.mapProfileFromOption();
    if (this.profile.profile_rcd) {
      this.api.post('api/manager/ProfileRef/Update', this.profile).subscribe((res: any) => {
        this.isSubmitting = false;
        this.toastService.open({
          value: [{ severity: 'success', summary: 'Thành công', content: `Cập nhập hồ sơ thành công!` }],
        })
        console.log(this.profile)
      })
    } else {
      this.api.post('api/manager/ProfileRef/Create', this.profile).subscribe((res: any) => {
        this.profile.profile_rcd = res.data.profile_rcd;
        this.isSubmitting = false;
        this.toastService.open({
          value: [{ severity: 'success', summary: 'Thành công', content: `Bổ sung hồ sơ thành công!` }],
        })
        console.log(this.profile)
      })
    }


    return true;
  }

  onSubmitted2({ valid, directive, data, errors }: any) {
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



    return true;
  }

  batchDelete(deleteList: any[]) {
    if (deleteList.length > 0) {

    }
  }

  onSelectFiles(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.attachments = [...this.files, ...this.document.attachments_json!]
  }

  onRemoveFile(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.document.attachments_json!.splice(this.document.attachments_json!.indexOf(event), 1);
    this.attachments = [...this.files, ...this.document.attachments_json!]
  }

  onCanceled() {
    this.editForm!.modalInstance.hide();
    this.editRowIndex = -1;
  }

  onPageChange(e: number) {
    this.pager.pageIndex = e;
    this.search();
  }

  onSizeChange(e: number) {
    this.pager.pageSize = e;
    this.search();
  }
}
