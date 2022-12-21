import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
import { Item, Area } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'da-number-list',
  templateUrl: './add-value.component.html',
  styleUrls: ['./add-value.component.scss'],
})
export class AddValueComponent implements OnInit {
  filterAreaShow = false;
  public pdfSrc: any;
  public file: any;
  

  options = ['normal', 'borderless', 'bordered'];

  sizeOptions = ['sm', 'md', 'lg'];

  layoutOptions = ['auto', 'fixed'];

  arr_status = {
    'false' : 'Không hoạt động',
    'true' : 'Hoạt động'
  };

  status = [
    {
      name : 'Không hoạt động',
      id : false
    },
    {
      name : 'Hoạt động',
      id : true
    }
  ];
  numberValue = 0;

  newArea  = {
    area_rcd: "",
    country_rcd: 237,
    country_name_l: "",
    country_name: "",
    country_name_e: "",
    area_name_l: "",
    area_name: "",
    area_name_e: "",
    area_note_l: "",
    area_note: "",
    area_note_e: "",
    sort_order: 1,
    active_flag: 0,
    created_by_user_id: "",
    created_date_time: "",
    lu_updated: "",
    lu_user_id: "",
    area_group: 1,
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

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'area_rcd',
      width: '150px',
    },
    {
      field: 'area_name',
      width: '150px',
    },
    {
      field: 'country_name',
      width: '100px',
    },
    {
      field: 'area_note',
      width: '100px',
    },
    {
      field: 'active_flag',
      width: '100px',
    },
    {
      field: 'Actions',
      width: '100px',
    },
  ];

  basicDataSource: Area[] = [];

values: any=[];
bioSection : any;

callingFunction(e: any) {
  const obj = {
    document_rcd: this.bioSection.get('txt_field').value,
    document_type_rcd: this.bioSection.get('txt_type').value,
    status:  typeof this.bioSection.get('txt_status').value === 'boolean' ? this.bioSection.get('txt_status').value : false,
    document_name_l:'' ,
    document_name_e: '',
    document_note_e: '',
    document_note_l: '',
    document_number: this.bioSection.get('txt_number').value,
  }

  // obj.status=obj.status?1:0;
  this.values = [obj, ...this.values];
}
savechange(){
  this.values.forEach((item: any) => {
    this.api.post("api/manager/DocumentRef/Create",item).subscribe((res:any) => {
      console.log(res)
    });
  })
}

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: [
      {
        label: 'Tên trường dữ liệu',
        prop: 'document_rcd',
        type: 'input',
        primary: true,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Số dữ liệu',
        prop: 'document_number',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Kiểu dữ liệu',
        prop: 'document_type_rcd',
        primary: false,
        type: 'input',
      },
      
      {
        label: 'Trạng thái',
        prop: 'status',
        type: 'select-object',
        options: this.status,
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
    ],
    labelSize: '',
  };

  formData = {};

  editForm: any = null;

  insert = true;

  editRowIndex = -1;

  lstCountry : any;

  _search = {
    keyword: ''
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };

  busy: Subscription;

  @ViewChild('EditorTemplate', { static: true })
  EditorTemplate: TemplateRef<any>;

  constructor(private listDataService: ListDataService, private dialogService: DialogService, private cdr: ChangeDetectorRef,private api: ApiService ) {}

  ngOnInit() {
    let pdfViewer = document.getElementById('pdf');
    if(pdfViewer){
      pdfViewer.style.width = window.innerHeight+"px";
      pdfViewer.style.height = (window.innerHeight/2 - 100)+"px"
    }
    this.getList();
    this.getCountry();
    this.bioSection= new FormGroup({
      txt_field: new FormControl(''),
      txt_type: new FormControl(''),
      txt_status: new FormControl(''),
      txt_number: new FormControl(''),
    });
  }
  public upload(event:any) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
        this.pdfSrc = event.target.result;
        console.log("dit cu may");
        
    }
    // if (reader.result){
      let blob = new Blob([ event.target.files[0]]);
      reader.readAsDataURL(blob);
  
      // }
           
    
    
            
  }

  search() {
    this.getList();
  }

  getList() {
    this.api.post("api/manager/AreaRef/Search",{page : this.pager.pageIndex , pageSize: this.pager.pageSize , area_name : this._search.keyword}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }

  getCountry() {
    this.api.post("api/manager/CountryRef/Search",{page : 1 , pageSize: 1000 }).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.lstCountry = a.data;
      console.log(this.lstCountry);
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
    this.formData = this.newArea;
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

  deleteRow(id: string) {
    const results = this.dialogService.open({
      id: 'delete-dialog',
      width: '346px',
      maxHeight: '600px',
      title: 'Xóa dữ liệu',
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
            const index = this.values.findIndex((item:any) => item.document_rcd === id);
            this.values.splice(index, 1);
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

  onPageChange(e: number) {
    this.pager.pageIndex = e;
    this.getList();
  }

  onSizeChange(e: number) {
    this.pager.pageSize = e;
    this.getList();
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
      // this.api.post("api/manager/AreaRef/Update",{...e}).subscribe((res:any) => {
      //   let a = JSON.parse(JSON.stringify(res));
      //   this.getList();
      // });
      // console.log(e);
      const index = this.values.findIndex((item:any) => item.document_rcd === e.document_rcd);
      console.log(index);
      this.values[index] = e;

        }
  }

  onCanceled() {
    this.editForm!.modalInstance.hide();
    this.editRowIndex = -1;
  }
}
