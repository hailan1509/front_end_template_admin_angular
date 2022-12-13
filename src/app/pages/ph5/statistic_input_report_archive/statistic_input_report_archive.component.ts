import { Component, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-statistic_input_report_archive',
  templateUrl: './statistic_input_report_archive.component.html',
  styleUrls: ['./statistic_input_report_archive.component.scss']
})
export class StatisticInputReportArchiveComponent implements OnInit {
  basicDataSource: any[] = [];
  datepicker1: any;







  _search = {
    // borrowed_date: null,
    profile_number:null,
    profile_name:null,
    from_date: null,
    to_date: null,
    // mining_purpose: null,
    profile_rcd: "",
    status: 0
  };
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };

  miningFileStatus = '--Tất cả---';

  miningFileStatusOptions = [
    '--Tất cả---',
    'Chờ xét duyệt',
    'Đã duyệt',
    'Từ chối'
  ];


  // miningFileStatusValue: { [key: string]: any } = {
  //   '--Tất cả--': null,
  //   'Chờ xét duyệt': 0,
  //   'Đã duyệt': 1,
  //   'Từ chối': 2
  // };

  searchForm: {
    borderType: '' | 'borderless' | 'bordered';
    size: 'sm' | 'md' | 'lg';
    layout: 'auto' | 'fixed';
  } = {
      borderType: 'bordered',
      size: 'md',
      layout: 'auto',
    };

  busy: Subscription;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getList()
  }

  search() {
    this.getList();
  }

  getList() {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search
      //status: this.miningFileStatusValue[this.miningFileStatus]
    }

    this.busy = this.api.post("api/Statistic/StatisticProfileSearch", data).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      console.log(a.data);
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
    this.getList();
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
