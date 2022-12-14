import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-statistic-quantity-profile-for-year',
  templateUrl: './statistic-quantity-profile-for-year.component.html',
  styleUrls: ['./statistic-quantity-profile-for-year.component.scss']
})
export class StatisticQuantityProfileForYearComponent implements OnInit, AfterViewInit {
  basicDataSource: any[] = [];
  basicDataSource1: any[] = [];
  datepicker1: any;

  serviceData: any = {
    tooltip: {
      trigger: 'axis',
      confine: true,
    },
    legend: {
      type: 'scroll',
      textStyle: {
        fontSize: 14,
        color: '#000',
      },
      data: ["canceled quantity", "corrected quantity", "pending cancel quantity","uncorrected quantity"]
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      name: 'Năm',
      data:[]
    },
    yAxis: {
      type: "value",
      name: 'Số lượng hồ sơ'
    },
    series: [

    ]
  };

  pieChart: any;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getList();
    this.getData();
  }

  ngAfterViewInit() {
  }

  getPieChart(e: any) {
    this.pieChart = e;
    console.log(e)
  }

  _search={
    status:1,
    profile_rcd: ""
    // year:2022
  }
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
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


  miningFileStatusOptions = ['--Tất cả---'];
  quantityProfileStatusOptions=[
    'Đã hủy',
    'Đã chỉnh lý',
    'Chưa chỉnh lý',
    'Chờ hủy'
  ];

  miningFileStatusValue: { [key: string]: any } = {
    '--Tất cả---':null,
    'Đã hủy': -1,
    'Đã chỉnh lý': 0,
    'Chưa chỉnh lý': 1,
    'Chờ hủy':2
  };
  miningFileStatus = '--Tất cả---';
  miningFileStatus1 = '--Tất cả---';
  getList() {
      this.api.get("api/Statistic/get-ProfileQuantityForYear").subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;

      let ct: Array<any>=new Array;

      let bt: Array<any>=new Array;

      console.log(this.basicDataSource);
      console.log(this.serviceData);
      let obj1:any={
        type: 'bar',
        name: "canceled quantity",
        showBackground: true,
        data: []
      }
      let obj2:any={
        type: 'bar',
        name: "corrected quantity",
        showBackground: true,
        data: []
      }
      let obj3:any={
        type: 'bar',
        name: "pending cancel quantity",
        showBackground: true,
        data: []
      }
      let obj4:any={
        type: 'bar',
        name: "uncorrected quantity",
        showBackground: true,
        data: []
      }
      let sortedArray:any[]=this.basicDataSource.sort((n1,n2)=>
      {
        if(n1.year>n2.year){
          return -1;}
        if (n1.year < n2.year){
        return 1;
        }
        return 0;
      }).filter((element, index) =>index<5);

      for(let i=0;i<sortedArray.length;i++){
        ct.unshift(sortedArray[i].year);
        // let o1: Array<any>=new Array;
        obj1.data.unshift(sortedArray[i].canceled_quantity);
        obj2.data.unshift(sortedArray[i].corrected_quantity);
        obj3.data.unshift(sortedArray[i].pending_cancel_quantity);
        obj4.data.unshift(sortedArray[i].uncorrected_quantity);
      }
      bt.unshift(obj1);
      bt.unshift(obj2);
      bt.unshift(obj3);
      bt.unshift(obj4);

      let year: Array<any>=new Array;
      for(let i=0;i<this.basicDataSource.length;i++){
        year.unshift(this.basicDataSource[i].year);
      }

      this.serviceData.xAxis.data=ct;
      this.serviceData.series=bt;
      console.log(this.serviceData);
      this.miningFileStatusOptions=year;
      this.pieChart.setOption(this.serviceData, true);

    });
  }
  busy: Subscription;
  getData(){
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
      status: this.miningFileStatusValue[this.miningFileStatus1]
    }

    if(typeof(this.miningFileStatus)===typeof(12)){
      this.busy = this.api.post("api/Statistic/StatisticProfileSearch", data).subscribe((res:any) => {
        let a = JSON.parse(JSON.stringify(res));
        console.log(a.data);
        this.basicDataSource1 = a.data;
        this.pager.total = a.totalItems;
      });
    }

    if(this.miningFileStatus)
    this.busy = this.api.post("api/Statistic/StatisticProfileSearch", data).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      console.log(a.data);
      this.basicDataSource1 = a.data;
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
    this.getData();
  }

  onPageChange(e: number) {
    this.pager.pageIndex = e;
    this.getData();
  }

  onSizeChange(e: number) {
    this.pager.pageSize = e;
    this.getData();
  }





}
