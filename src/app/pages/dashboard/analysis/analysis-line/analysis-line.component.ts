import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { EchartsService } from 'src/app/@core/mock/echarts.service';

@Component({
  selector: 'da-analysis-line',
  templateUrl: './analysis-line.component.html',
  styleUrls: ['./analysis-line.component.scss'],
})
export class AnalysisLineComponent implements OnInit {
  options = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Tổng hồ sơ', 'Tổng hồ sơ đã chỉnh lý', 'Tổng hồ sơ đã số hoá'],
    },

    calculable: true,

    xAxis: [
      {
        axisLabel: {
          rotate: 30,
          interval: 0,
        },
        axisLine: {
          lineStyle: {
            color: '#CECECE',
          },
        },
        type: 'category',
        boundaryGap: true,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#CECECE',
          },
        },
      },
    ],
    series: [
      {
        id: 'total',
        name: 'Tổng hồ sơ',
        type: 'line',
        symbol: 'none',
        smooth: 0.2,
        color: ['#1DD1A1'],
        data: [20222, 10222, 152222, 22222, 30222, 44222, 40222],
        areaStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: 'linear',
            global: false,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(29, 209, 161, 0.2)',
              },
              {
                offset: 1,
                color: 'rgba(29, 209, 161, 0)',
              },
            ],
          },
        },
      },
      {
        id: 'total_edited',
        name: 'Tổng hồ sơ đã chỉnh lý',
        type: 'line',
        symbol: 'none',
        smooth: 0.2,
        color: ['#3F8FEC'],
        data: [10001, 20001, 30010, 40100, 50010, 60100, 70010],
        areaStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: 'linear',
            global: false,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(63, 143, 236, 0.2)',
              },
              {
                offset: 1,
                color: 'rgba(63, 143, 236, 0)',
              },
            ],
          },
        },
      },
      {
        id: 'total_digitized',
        name: 'Tổng hồ sơ đã số hoá',
        type: 'line',
        symbol: 'none',
        smooth: 0.2,
        color: ['#fbe908'],
        data: [10001, 20001, 30010, 40100, 50010, 60100, 70010],
        areaStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: 'linear',
            global: false,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255, 248, 36, 0.2)',
              },
              {
                offset: 1,
                color: 'rgba(255, 248, 36, 0)',
              },
            ],
          },
        },
      },
    ],
  };
  data: any;
  dataChart: any;

  constructor(private echartsService: EchartsService, private api: ApiService) {}

  ngOnInit(): void {
    this.api.get("api/manager/profileRef/statistical_by_department/0").subscribe((res:any) => {
      this.data = res.data;
      this.options.series.forEach((v:any, index: number) => {
        this.options.series[index].data = this.pluck(this.data, v.id);
      })
      this.options.xAxis[0].data = this.pluck(this.data, 'year');
      this.dataChart = this.options;
      console.log(this.options)
    })
    // this.echartsService.getHistorgram().subscribe((option) => {
    //   this.histogramData = option;
    // });
  }
  pluck(arr:any, key:any){
    return arr.map((i:any) => i[key]);
  } 
}
