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
  data: any;

  constructor(private echartsService: EchartsService, private api: ApiService) {}

  ngOnInit(): void {
    this.api.get("api/manager/profileRef/statistical_by_department/1").subscribe((res:any) => {
      this.data = res.data;
      this.data.forEach((v:ProfileRefStatistical) => {
      })
      this.histogramData.series.forEach((v:any, index: number) => {
        this.histogramData.series[index].data = this.pluck(this.data, v.id);
      })
      this.histogramData.xAxis.data = this.pluck(this.data, 'department_name_l');
      this.dataChart = this.histogramData;
    })
    // this.echartsService.getHistorgram().subscribe((option) => {
    //   this.histogramData = option;
    // });
  }
  pluck(arr:any, key:any){
    return arr.map((i:any) => i[key]);
  } 
}
