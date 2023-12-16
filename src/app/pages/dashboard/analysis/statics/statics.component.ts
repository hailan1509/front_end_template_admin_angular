import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ProfileRefStatistical } from 'src/app/@core/data/listData';
import { EchartsService } from 'src/app/@core/mock/echarts.service';

@Component({
  selector: 'da-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.scss'],
})
export class StaticsComponent implements OnInit {
  dataChart: any;
  _dataChart: any;
  histogramData = { 
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } },
    },
    legend: {
      data: ['Tổng hồ sơ', 'Tổng hồ sơ đã chỉnh lý', 'Tổng hồ sơ đã số hoá'],
      top: 10,
      left: 15,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '1%',
      top: '80',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: [
      ],
      axisLabel: { interval: 'auto', fontSize: 8 },
    },
    yAxis: { type: 'value', axisLabel: { fontSize: 16 } },
    series: [
      {
        id: 'total',
        name: 'Tổng hồ sơ',
        type: 'bar',
        barMaxWidth: 40,
        label: { show: false, color: '#ffffff' },
        emphasis: { focus: 'series' },
        data: [],
        itemStyle: {
          color: '#1DD1A1',
        },
      },
      {
        id: 'total_edited',
        name: 'Tổng hồ sơ đã chỉnh lý',
        type: 'bar',
        barMaxWidth: 40,
        label: { show: false, color: '#ffffff' },
        emphasis: { focus: 'series' },
        data: [],
        itemStyle: {
          color: '#3F8FEC',
        },
      },
      {
        id: 'total_digitized',
        name: 'Tổng hồ sơ đã số hoá',
        type: 'bar',
        barMaxWidth: 40,
        label: { show: false, color: '#ffffff' },
        emphasis: { focus: 'series' },
        data: [],
        itemStyle: {
          color: '#FECA57',
        },
      }
    ],
  };
  _histogramData = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } },
    },
    legend: {
      data: ['Số hồ sơ'],
      top: 10,
      left: 15,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '1%',
      top: '80',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: ['Tổng hồ sơ', 'Tổng hồ sơ đã chỉnh lý', 'Tổng hồ sơ đã số hoá'],
      axisLabel: { interval: 'auto', fontSize: 8 },
    },
    yAxis: { type: 'value', axisLabel: { fontSize: 16 } },
    series: [
      {
        id: 'total',
        name: 'Số hồ sơ',
        type: 'bar',
        barMaxWidth: 40,
        label: { show: false, color: '#ffffff' },
        emphasis: { focus: 'series' },
        data: [0,0,0],
        itemStyle: {
          color: '#1DD1A1',
        },
      },
    ],
  };
  data: any;
  _search = {
    'year' : '0',
    'department_rcd': '',
  };
  // years = [
  //   {
  //     name : 'Tất cả',
  //     id : '0',
  //   }
  // ];
  years: number[] = [];
  currentYear: number;

  constructor(private echartsService: EchartsService, private api: ApiService) {
    this.currentYear = new Date().getFullYear();
    this.years = this.generateYears();
  }

  ngOnInit(): void {
    this.getData();
    // this.echartsService.getHistorgram().subscribe((option) => {
    //   this.histogramData = option;
    // });
  }
  pluck(arr:any, key:any){
    return arr.map((i:any) => i[key]);
  }
  getData() {
    this.dataChart = {};
    // //console.log(this._search.year)
    this.api.post("api/manager/profileRef/statistical_by_department/1", this._search).subscribe((res:any) => {
      this.data = res.data;
      if(this.currentYear) {
        this.data.forEach((v:any) => {
          ['total','total_edited','total_digitized'].forEach((t:any, index:number) => {
            this._histogramData.series[0].data[index] += v[t];
          })
        })
      }
      this.histogramData.series.forEach((v:any, index: number) => {
        this.histogramData.series[index].data = this.pluck(this.data, v.id);
      })
      this.histogramData.xAxis.data = this.pluck(this.data, 'department_name_l');
      this.dataChart = this.histogramData;
      this._dataChart = this._histogramData;
    })
  }
  generateYears(): number[] {
    const startYear = 2010;
    const endYear = this.currentYear;
    return Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
  }
}
