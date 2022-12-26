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

  profile_rcd: string;

  documents: DocumentRef[] = [];
  document: DocumentRef = {

  };
  profile: ProfileRef = {
  };

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
      this.profile_rcd = params['id'];
      console.log(this.profile_rcd)
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
        if (!res[0].data && this.profile_rcd) {
          this.router.navigate(['/pages/not-found']);
        } else if (!res[0].data && !this.profile_rcd) {
          this.profile = {};
        } else {
          this.profile = res[0].data;
          this.mapOptionsForProfile();
        }
      });
    });

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
      year: this.year?.selectedDate?.getFullYear(),
      from_date: this.profile.from_date ? new Date(Date.UTC(this.profile.from_date.getFullYear(), this.profile.from_date.getMonth(), this.profile.from_date.getDate())) : undefined,
      to_date: this.profile.to_date ? new Date(Date.UTC(this.profile.to_date.getFullYear(), this.profile.to_date.getMonth(), this.profile.to_date.getDate())) : undefined,
    }
  }

  mapOptionsForDocument() {
    this.physical_condition_current = this.physical_condition_options.find(a => a.value == this.document.physical_condition_rcd);
    this.document_type_current = this.document_type_options.find(a => a.value == this.document.document_type_rcd);
    this.confidentiality_current = this.confidentiality_options.find(a => a.value == this.document.confidentiality_rcd);
    this.agency_issued_current = this.agency_issued_options.find(a => a.value == this.document.agency_issued_rcd);

  }

  getOptions() {
    let arrayRequest = [];
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetById/' + this.profile_rcd));
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
    if (this.profile_rcd) {
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
  }

  editRow(index: number, document_rcd: any) {
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
    if (this.profile_rcd) {

    } else {

    }

    return true;
  }

  batchDelete(deleteList: any[]) {
    if (deleteList.length > 0) {

    }
  }

  onSelectFiles(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemoveFile(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onCanceled() {
    this.editForm!.modalInstance.hide();
    this.editRowIndex = -1;
  }
}
