import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report-mining-file',
  templateUrl: './report-mining-file.component.html',
  styleUrls: ['./report-mining-file.component.scss']
})
export class ReportMiningFileComponent implements OnInit {

  basicDataSource: any[] = [];

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

  miningFileStatus = '--Tất cả--';

  miningFileStatusOptions = [
    '--Tất cả--',
    'Chờ xét duyệt',
    'Đã duyệt',
    'Từ chối'
  ];

  miningFileStatusValue: { [key: string]: any } = {
    '--Tất cả--': null,
    'Chờ xét duyệt': 0,
    'Đã duyệt': 1,
    'Từ chối': 2
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

  busy: Subscription;

  byYearOption: any;
  byMonthOfYearOption: any;
  forDayOfMonthOption: any;

  chartOption: any = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Đã duyệt', 'Từ chối']
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['2012', '2013', '2014', '2015', '2016']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Đã duyệt',
        type: 'bar',
        barGap: 0,
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390],

      },
      {
        name: 'Từ chối',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290],
        color: 'rgb(238 102 102)',
      },
    ]
  };

  year: any = {
    selectedDate: new Date()
  };

  date: any = {
    selectedDate: new Date()
  };

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getList();
    this.byYearChart();
  }

  search() {
    this.getList();
  }

  getList() {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
      status: this.miningFileStatusValue[this.miningFileStatus]
    }

    this.busy = this.api.post("api/Statistic/ReportMiningFileSearch", data).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }

  byMonthOfYearChart(year: any) {
    if (!year|| !year.selectedDate) {
      return false;
    }
    let byMonthOfYearOption = JSON.parse(JSON.stringify(this.chartOption))
    this.busy = this.api.get("api/Statistic/ReportMiningFileByMonthOfYear/" + year?.selectedDate?.getFullYear()).subscribe((res: any) => {
      let result = JSON.parse(res.data);

      byMonthOfYearOption.xAxis[0].data = result.map((item: any) => `Tháng ${item.month}`)
      byMonthOfYearOption.series[0].data = result.map((item: any) => item.number_of_accept)
      byMonthOfYearOption.series[1].data = result.map((item: any) => item.number_of_refuse)

      console.log(byMonthOfYearOption)

      this.byMonthOfYearOption = byMonthOfYearOption;

    });

    return true;
  }

  forDayOfMonthChart(date: any) {
    if (!date|| !date.selectedDate) {
      return false;
    }
    let forDayOfMonthOption = JSON.parse(JSON.stringify(this.chartOption))
    this.busy = this.api.get(`api/Statistic/ReportMiningFileForDayByMonthOfYear/${date?.selectedDate?.getFullYear()}/${date?.selectedDate?.getMonth() + 1}`).subscribe((res: any) => {
      let result = JSON.parse(res.data);

      forDayOfMonthOption.xAxis[0].data = result.map((item: any) => new Date(item.date).getDate())
      forDayOfMonthOption.series[0].data = result.map((item: any) => item.number_of_accept)
      forDayOfMonthOption.series[1].data = result.map((item: any) => item.number_of_refuse)

      console.log(forDayOfMonthOption)

      this.forDayOfMonthOption = forDayOfMonthOption;

    });

    return true;
  }

  byYearChart() {
    let byYearOption :any =  JSON.parse(JSON.stringify(this.chartOption))

    this.busy = this.api.get("api/Statistic/ReportMiningFileByYear").subscribe((res: any) => {
      let result = JSON.parse(res.data);

      byYearOption.xAxis[0].data = result.map((item: any) => item.year.toString())
      byYearOption.series[0].data = result.map((item: any) => item.number_of_accept)
      byYearOption.series[1].data = result.map((item: any) => item.number_of_refuse)

      this.byYearOption = byYearOption;
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

  onPageChange(e: number) {
    this.pager.pageIndex = e;
    this.getList();
  }

  onSizeChange(e: number) {
    this.pager.pageSize = e;
    this.getList();
  }

}
