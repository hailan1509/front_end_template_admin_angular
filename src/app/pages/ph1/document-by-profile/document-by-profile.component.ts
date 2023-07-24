import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
import { Item, DocumentRef, Profile } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { FormUploadComponent } from 'src/app/@shared/components/form-upload/form-upload.component';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'ng-devui/loading';

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
  profileDropdown = [];

  newDocument:DocumentRef = {
    active_flag : 1,

  };

  getOCR: any = false;

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
          // validators: [{ required: true }],
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
          // validators: [{ required: true }],
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
          // validators: [{ required: true }],
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
          // validators: [{ required: true }],
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
          // validators: [{ required: true }],
        },
      },
    ],
    labelSize: '',
  };
  msgs: Array<Object> = [];

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };
  _search = {
    keyword: ''
  };
  current_search = "";

  busy: Subscription;

  profile_rcd:any;
  userInfo:any;
  private routeSub: Subscription;

  @ViewChild('EditorTemplate', { static: true })
  EditorTemplate: TemplateRef<any>;

  constructor(private dialogService: DialogService, private cdr: ChangeDetectorRef,private api: ApiService,private route: ActivatedRoute, private loadingService: LoadingService ) { }

  ngOnInit(): void {
    if (localStorage.getItem('userinfo')) {
      let user = JSON.parse(localStorage.getItem('userinfo')!);
      this.userInfo = user;
    }
    this.routeSub = this.route.params.subscribe(params => {
      this.profile_rcd = params['id'];
    });
    const results = this.loadingService.open();
    this.getProfileInfo();
    this.getList();
    
    this.api.get("api/manager/DocumentRef/GetListDropdown/"+"physical_condition_ref_get_list_dropdown").subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let tmp = 0;
      let rs = a.data.map((x:any) => {
        if(tmp == 0) {
          this.newDocument.physical_condition_rcd = x.value;
        }
        tmp ++;
        return { id : x.value, name : x.label};
      })
      this.phisicalCondisionDropdown = rs;
    });
    this.api.get("api/manager/DocumentRef/GetListDropdown/"+"document_type_ref_get_list_dropdown").subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let tmp = 0;
      let rs = a.data.map((x:any) => {
        if(tmp == 0) {
          this.newDocument.document_type_rcd = x.value;
        }
        tmp ++;
        return { id : x.value, name : x.label};
      })
      this.documentTypeDropdown = rs;
      
    });
    this.api.get("api/manager/DocumentRef/GetListDropdown/"+"confidentiality_ref_get_list_dropdown").subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let tmp = 0;
      let rs = a.data.map((x:any) => {
        if(tmp == 0) {
          this.newDocument.confidentiality_rcd = x.value;
        }
        tmp ++;
        return { id : x.value, name : x.label};
      })
      this.confidentialityDropdown = rs;
      setTimeout(() => {

        this.formConfig = {
          layout: FormLayout.Horizontal,
          items: [
            {
              label: 'Số hồ sơ',
              prop: 'profile_number',
              type: 'input',
              primary: false,
              required: true,
              onlyEdit: true,
              rule: {
                validators: [{ required: true },{ pattern: /^[0-9]*$/, message: 'Hãy nhập số !' },],
              },
            },
            {
              label: 'Tên tài liệu',
              prop: 'document_name_l',
              type: 'text-area',
              primary: false,
              required: true,
              rule: {
                validators: [{ required: true }],
              },
              styles: {
                height : '50px'
              }
            },
            {
              label: 'Số tài liệu',
              prop: 'document_number',
              type: 'input',
              primary: false,
              required: false,
              rule: {
                // validators: [{ required: true }],
              },
              // styles: {
              //   width : '50%'
              // }
            },
            {
              label: 'Ngày',
              prop: 'date',
              primary: false,
              type: 'datePicker',
              required: true,
              rule: {
                validators: [{ required: true }],
              },
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
              label: 'Bảo mật',
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
              label: 'Tình trạng',
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
              label: 'Tài liệu liên quan',
              prop: 'content',
              type: 'input-file-ocr',
              primary: false,
              required: false,
              rule: {
                // validators: [{ required: true }],
              },
            },
          ],
          labelSize: '',
        };
        this.newDocument.profile_number = this.profileInfo.profile_number.toString();
      },2000)
      
      results.loadingInstance.close();
    });
  }

  getList() {
    const results = this.loadingService.open();
    if(this.current_search != this._search.keyword) {
      this.pager.pageIndex = 1;
    } 
    this.api.post("api/manager/DocumentRef/GetByProfileId/"+this.profile_rcd, {page : this.pager.pageIndex , pageSize: this.pager.pageSize , document_name_l : this._search.keyword}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data.map((v:any) => {
        v.profile_number = this.profileInfo.profile_number;
        return v;
      });
      this.pager.total = a.totalItems;
      results.loadingInstance.close();
      this.current_search = this._search.keyword;
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
      width: '1000px',
      maxHeight: '1000px',
      title: 'Sửa thông tin tài liệu',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  onSizeChange(e: number) {
    this.pager.pageSize = e;
    this.getList();
  }

  onPageChange(e: number) {
    this.pager.pageIndex = e;
    this.getList();
  }

  addRow() {
    this.insert = true;
    this.newDocument.profile_number = this.profileInfo.profile_number.toString();
    this.formData = this.newDocument;
    this.editForm = this.dialogService.open({
      id: 'edit-dialog',
      width: '1000px',
      maxHeight: '1000px',
      title: 'Thêm tài liệu',
      showAnimate: false,
      contentTemplate: this.EditorTemplate,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [],
    });
  }

  deleteRow(id: string) {
    const results = this.dialogService.open({
      id: 'delete-dialog',
      width: '346px',
      maxHeight: '600px',
      title: 'Xóa tài liệu',
      showAnimate: false,
      content: 'Bạn có chắc chắn muốn xóa?',
      backdropCloseable: true,
      onClose: () => {},
      buttons: [
        {
          cssClass: 'primary',
          text: 'Xóa',
          disabled: false,
          handler: ($event: Event) => {
            this.api.post("api/manager/DocumentRef/DeleteMulti/"+this.userInfo.user_rcd,[id]).subscribe((res:any) => {
              this.showToast("success");
              this.getList();

            });
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: 'Không',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
    });
  }

  onSubmitted(e: any) {
    this.editForm!.modalInstance.hide();
    if(typeof(e.date) != "string") {
      e.date = this.formatDate(e.date);
    }
    e.active_flag = parseInt(e.active_flag);
    e.created_by_user_id = this.userInfo.user_rcd;
    e.lu_user_id = this.userInfo.user_rcd;
    const results = this.loadingService.open();
    if (this.insert) {
      
      e.profile_rcd = this.profile_rcd;
      e.active_flag = parseInt(e.active_flag);
      var input:any = document.getElementById('file_upload') as HTMLInputElement | null;
      this.api.post("api/manager/DocumentRef/Create",{...e}).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        if(a.data) {
          // if(input.files[0]) {
            var file:any = input.files[0];
            const formdata = new FormData();
            formdata.append('file',file);
            const acceptOCR = e.getOCR ? 1 : 0;
            const param = [a.data.document_rcd, this.profileInfo.year, this.profileInfo.profile_number, acceptOCR];
            this.api.post("api/manager/DocumentRef/Upload/" + param.join('_'),formdata).subscribe((resp:any) => {
              this.showToast("success");
              this.getList();
              results.loadingInstance.close();
            });
          // }
        }
        else {
          this.showToast("error");
        }
        
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
        results.loadingInstance.close();
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
          profile_number: this.profileInfo.profile_number,
          acceptOCR: this.getOCR ? 1 : 0,
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
    console.log(source);
    window.open(source);
  }

  subStringFileName(fileName:any) {
    if(fileName.length >10) {
      return fileName.substring(0,10) + "...";
    }
    else return fileName;
  }
  reset() {
    this._search = {
      keyword: ''
    };
    this.pager.pageIndex = 1;
    this.getList();
  }
  exportExcel() {
    // const results = this.loadingService.open();
    this.api.post("api/manager/DocumentRef/ExportToExcel/"+this.profile_rcd, {page : 1 , pageSize: 10000 , document_name_l : this._search.keyword}, true).subscribe((response:any) => {
      // let a = JSON.parse(JSON.stringify(res));
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      link.href = objectUrl;
      link.download = 'document.xlsx';
      link.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

}
