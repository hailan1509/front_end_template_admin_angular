import { Component, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report-profile-document-borrowed',
  templateUrl: './report-profile-document-borrowed.component.html',
  styleUrls: ['./report-profile-document-borrowed.component.scss']
})
export class ReportProfileDocumentBorrowedComponent implements OnInit {

  basicDataSource = [];
  basicDataSource2 = [];
  datepicker1: any;

  _search = {
    borrowed_date: null,
    return_date: null,
    staff_name: '',
    mining_purpose: null,
    status: null
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };

  miningFileStatus = '--Tất cả---';

  miningFileStatusOptions = [
    '--Tất cả---',
    'Đang mượn',
    'Mượn quá hạn',
  ];

  miningFileStatusValue: { [key: string]: any } = {
    '--Tất cả--': null,
    'Đang mượn': 'Đang mượn',
    'Mượn quá hạn': 'Mượn quá hạn',
  };

  typeOfReportOptions = ['Báo cáo hồ sơ đang mượn', 'Báo cáo văn bản đang mượn'];
  typeOfReport = 'Báo cáo hồ sơ đang mượn';

  searchForm: {
    borderType: '' | 'borderless' | 'bordered';
    size: 'sm' | 'md' | 'lg';
    layout: 'auto' | 'fixed';
  } = {
      borderType: 'bordered',
      size: 'md',
      layout: 'auto',
    };

  dataTableOptions = {
    columns: [
      {
        field: 'area_rcd',
        header: 'Mã khu vực',
        fieldType: 'text'
      },
      {
        field: 'area_name',
        header: 'Tên khu vực',
        fieldType: 'text'
      },
      {
        field: 'country_name',
        header: 'Tên đất nước',
        fieldType: 'text'
      },
      {
        field: 'area_note',
        header: 'Ghi chú',
        fieldType: 'date'
      },
      {
        field: 'active_flag',
        header: 'Trạng thái',
        fieldType: 'int'
      }
    ]
  };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: '#',
      width: '50px'
    },
    {
      field: 'area_rcd',
      width: '100px'
    },
    {
      field: 'area_name',
      width: '300px'
    },
    {
      field: 'country_name',
      width: '100px'
    },
    {
      field: 'area_note',
      width: '100px'
    },
    {
      field: 'active_flag',
      width: '100px'
    },
    {
      field: 'Actions',
      width: '100px'
    },
  ];

  busy: Subscription;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.search()
  }

  search() {
    console.log(this.typeOfReport);
    if (this.typeOfReport === 'Báo cáo hồ sơ đang mượn') {
      this.getListProfileBorrowed();
    } else {
      this.getListDocumentBorrowed();
    }
  }

  getListProfileBorrowed() {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
      status: this.miningFileStatusValue[this.miningFileStatus]
    }

    this.busy = this.api.post("api/Statistic/ReportProfileBorrowedSearch", data).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }

  getListDocumentBorrowed() {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
      status: this.miningFileStatusValue[this.miningFileStatus]
    }
    this.busy = this.api.post("api/Statistic/ReportDocumentBorrowedSearch", data).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource2 = a.data;
      this.pager.total = a.totalItems;
    });
  }

  reset() {
    this.searchForm = {
      borderType: '',
      size: 'md',
      layout: 'auto',
    };
    this.pager.pageIndex = 1;
    this.search();
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
