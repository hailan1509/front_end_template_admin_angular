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

  confidentialityDropdown = [];
  documentTypeDropdown = [];
  phisicalCondisionDropdown = [];

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

  basicDataSource: DocumentRef [] = [];

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
        options: this.documentTypeDropdown,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Tình trạng',
        prop: 'confidentiality_rcd',
        type: 'select-object',
        options: this.confidentialityDropdown,
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
        options: this.phisicalCondisionDropdown,
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
  msgs: Array<Object> = [];

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
    this.api.get("api/manager/DocumentRef/GetListDropdown/"+"physical_condition_ref_get_list_dropdown").subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let rs = a.data.map((x:any) => {
        return { id : x.value, name : x.label};
      })
      this.phisicalCondisionDropdown = rs;
    });
    this.api.get("api/manager/DocumentRef/GetListDropdown/"+"document_type_ref_get_list_dropdown").subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let rs = a.data.map((x:any) => {
        return { id : x.value, name : x.label};
      })
      this.documentTypeDropdown = rs;
      
    });
    this.api.get("api/manager/DocumentRef/GetListDropdown/"+"confidentiality_ref_get_list_dropdown").subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let rs = a.data.map((x:any) => {
        return { id : x.value, name : x.label};
      })
      this.confidentialityDropdown = rs;
      
      this.formConfig = {
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
            options: this.documentTypeDropdown,
            required: true,
            rule: {
              validators: [{ required: true }],
            },
          },
          {
            label: 'Tình trạng',
            prop: 'confidentiality_rcd',
            type: 'select-object',
            options: this.confidentialityDropdown,
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
            options: this.phisicalCondisionDropdown,
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
          {
            label: 'Lấy nội dung',
            prop: 'content',
            type: 'input-file',
            primary: false,
            required: true,
            rule: {
              // validators: [{ required: true }],
            },
          },
        ],
        labelSize: '',
      };
    });
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
    if(typeof(e.date) != "string") {
      e.date = this.formatDate(e.date);
    }
    if (this.insert) {
      e.profile_rcd = this.profile_rcd;
      this.api.post("api/manager/DocumentRef/Create",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        if(a.data) {
          this.showToast("success");
        }
        else {
          this.showToast("error");
        }
        this.getList();
      });
    }
    else {
      this.api.post("api/manager/DocumentRef/Update",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        if(a.data) {
          this.showToast("success");
        }
        else {
          this.showToast("error");
        }
        this.getList();
      });

    }
  }
  padTo2Digits(num:any) {
    return num.toString().padStart(2, '0');
  }
  
  formatDate(date:any) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
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
        // beforeHidden: () => this.beforeHidden(),
        backdropCloseable: true,
        buttons: [
          
        ],
        data: {
          document_attachment: a.data,
          document_rcd: document_rcd,
          year: this.profileInfo.year,
          profile_number: this.profileInfo.profile_number
        }
      });
      const sub = results.modalContentInstance.onAdd.subscribe((type:any) => {
        this.showToast(type);
        results.modalInstance.hide();
        this.getList();
      });
      const sub1 = results.modalContentInstance.onDelete.subscribe((type:any) => {
        this.showToast(type);
        this.getList();
        // results.modalInstance.hide();
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

  showToast(type:any) {
    switch (type) {
      case 'success':
        this.msgs = [{ severity: "success", summary: 'Thông báo', content: 'Cập nhật thành công!' }];
        break;
      case 'error':
        this.msgs = [{ severity: "error", summary: 'Thông báo', content: 'Cập nhật thất bại!' }];
        break;
      default:
        this.msgs = [{ severity: "success", summary: 'Thông báo', content: 'Cập nhật thành công!' }];
      }
  }

  formatDateView(date:any) {
    if (date) {

      let arr_date_time = date.split('T');
      let  arr_date = arr_date_time[0].split('-');
      let rs = [];
      if(arr_date[2])
        rs.push(arr_date[2])
      if(arr_date[1])
        rs.push(arr_date[1])
      if(arr_date[0])
        rs.push(arr_date[0])

      return rs.join('/');
    }
    return "";
  }

  viewFile(source:any) {
    window.open(source);
  }

  subStringFileName(fileName:any) {
    if(fileName.length >10) {
      return fileName.substring(0,10) + "...";
    }
    else return fileName;
  }

}
