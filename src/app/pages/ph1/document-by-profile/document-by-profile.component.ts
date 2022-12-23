import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
import { Item, DocumentRef, Profile } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { FormUploadComponent } from 'src/app/@shared/components/form-upload/form-upload.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-by-profile',
  templateUrl: './document-by-profile.component.html',
  styleUrls: ['./document-by-profile.component.scss']
})
export class DocumentByProfileComponent implements OnInit {
  filterprofileShow = false;

  options = ['normal', 'borderless', 'bordered'];

  sizeOptions = ['sm', 'md', 'lg'];

  layoutOptions = ['auto', 'fixed'];

  formData = {};

  status = [
    {
      name : 'Không hoạt động',
      id : -1
    },
    {
      name : 'Hoạt động',
      id : 1
    }
  ];

  newDocument:DocumentRef = {

  };

  profileInfo:Profile = {

  };

  editForm: any = null;

  insert = true;

  editRowIndex = -1;

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'document_name_l',
      width: '150px',
    },
    {
      field: 'document_number',
      width: '150px',
    },
    {
      field: 'date',
      width: '100px',
    },
    {
      field: 'document_type_name_l',
      width: '100px',
    },
    {
      field: 'physical_condition_name_l',
      width: '100px',
    },
    {
      field: 'confidentiality_name_l',
      width: '100px',
    },
    {
      field: 'Actions',
      width: '100px',
    },
  ];

  basicDataSource: DocumentRef[] = [];

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: [
      {
        label: 'Tên tài liệu',
        prop: 'document_name_l',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Số tài liệu',
        prop: 'document_number',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Ngày',
        prop: 'date',
        primary: false,
        type: 'datePicker',
      },
      {
        label: 'Loại tài liệu',
        prop: 'document_type_rcd',
        type: 'select-object',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Tình trạng',
        prop: 'confidentiality_name_l',
        type: 'select-object',
        // options: this.status,
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Bảo mật',
        prop: 'physical_condition_rcd',
        type: 'select-object',
        // options: this.status,
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Trạng thái',
        prop: 'active_flag',
        type: 'select-object',
        primary: false,
        options: this.status,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
    ],
    labelSize: '',
  };

  busy: Subscription;

  profile_rcd:any;
  private routeSub: Subscription;

  @ViewChild('EditorTemplate', { static: true })
  EditorTemplate: TemplateRef<any>;

  constructor(private dialogService: DialogService, private cdr: ChangeDetectorRef,private api: ApiService,private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.profile_rcd = params['id'];
    });
    this.getList();
    this.getProfileInfo();
  }

  getList() {
    this.api.get("api/manager/DocumentRef/GetByProfileId/"+this.profile_rcd).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
    });
  }
  getProfileInfo() {
    this.api.get("api/manager/ProfileRef/GetById/"+this.profile_rcd).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.profileInfo = a.data;
      console.log(a.data);
    });
  }
  editRow(row: any, index: number) {
    this.insert = false;
    this.editRowIndex = index;
    this.formData = row;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '600px',
      maxHeight: '600px',
      title: 'Editor',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  addRow() {
    this.insert = true;
    this.formData = this.newDocument;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '600px',
      maxHeight: '600px',
      title: 'Editor',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  onSubmitted(e: any) {
    this.editForm!.modalInstance.hide();
    if (this.insert) {
      // e.area_group = 1;
      // e.area_name_l = e.area_name;
      // e.area_name_e = e.area_name;
      // e.area_note_l = e.area_note;
      // e.area_note_e = e.area_note;
      // this.api.post("api/manager/AreaRef/Create",{...e}).subscribe((res:any) => {
      //   let a = JSON.parse(JSON.stringify(res));
      //   this.getList();
      // });
    }
    else {
      e.area_name_l = e.area_name;
      e.area_name_e = e.area_name;
      e.area_note_l = e.area_note;
      e.area_note_e = e.area_note;
      this.api.post("api/manager/AreaRef/Update",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        this.getList();
      });
      console.log(e);

    }
  }

  onCanceled() {
    this.editForm!.modalInstance.hide();
    this.editRowIndex = -1;
  }

  openPreventCloseDialog(document_rcd:any) {
    this.api.get("api/manager/DocumentRef/GetByDocumentId/"+document_rcd).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      const results = this.dialogService.open({
        id: 'dialog-service',
        width: '500px',
        maxHeight: '500px',
        title: 'Danh sách file trong tài liệu',
        content: FormUploadComponent,
        dialogtype: 'standard',
        beforeHidden: () => this.beforeHidden(),
        backdropCloseable: true,
        buttons: [
          {
            cssClass: 'primary',
            text: 'Save',
            handler: ($event: Event) => {
              results.modalInstance.hide();
            },
          },
        ],
        data: a.data
      });
    });
  }

  beforeHidden(): Promise<boolean> {
    return new Promise((resolve) => {
      const results = this.dialogService.open({
        id: 'dialog-service',
        width: '300px',
        maxHeight: '600px',
        title: '',
        content: 'Do you want to save the modification before closing the page?',
        backdropCloseable: false,
        dialogtype: 'warning',
        buttons: [
          {
            cssClass: 'primary',
            text: 'Save',
            handler: ($event: Event) => {
              results.modalInstance.hide();
              resolve(true);
            },
          },
          {
            id: 'btn-cancel',
            cssClass: 'common',
            text: 'Cancel',
            handler: ($event: Event) => {
              results.modalInstance.hide();
              resolve(true);
            },
          },
        ],
      });
    });
  }

}
