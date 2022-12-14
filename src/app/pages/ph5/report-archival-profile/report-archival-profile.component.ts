import { Component, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report-archival-profile',
  templateUrl: './report-archival-profile.component.html',
  styleUrls: ['./report-archival-profile.component.scss']
})
export class ReportArchivalProfileComponent implements OnInit {
  basicDataSource: any[] = [];
  datepicker1: any;


  serviceData: any = {
    tooltip: {
      trigger: 'axis',
      confine: true,
    },
    legend: {
      type: 'scroll',
      show: false,
      orient: 'horizontal',
      top: '6%',
      right: '6%',
      icon: 'circle',
      itemWidth: 13,
      itemHeight: 6,
      itemGap: 13,
      textStyle: {
        fontSize: 14,
        color: '#E5E5E5',
      },
    },
    xAxis: {
      type: "category",
      data: [2019,2020,2021,2022,2032,2123,1234]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        type: 'bar',
        data: [178,123,234,831]
      },
      {
        type: 'bar',
        data: [211,656,234,785]
      },
      {
        type: 'bar',
        data: [2,1,0,1]
      },
      {
        type: 'bar',
        data: [0,1,2,1]
      }
    ]
  };









  _search = {
    // borrowed_date: null,
    profile_number:null,
    profile_name:null,
    from_date: null,
    to_date: null,
    // mining_purpose: null,
    profile_rcd: "",
    status: 1
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
