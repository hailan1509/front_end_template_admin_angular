import { Component, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report-data-alter',
  templateUrl: './report-data-alter.component.html',
  styleUrls: ['./report-data-alter.component.scss'],
})
export class DataAlterComponent implements OnInit {
  constructor(private api: ApiService) {}

  dataSourceArchivalProfile: any[] = [];
  dataSourceProfileDocumentBorrowed: any[] = [];
  dataSourceMiningFile: any[] = [];
  dataSourceCancellationProfile: any[] = [];
  profileData: any[] = [];
  profileData1: any[] = [];
  profileData2: any[] = [];
  profileData3: any[] = [];
  yearNow = new Date();
  year = 0;
  datePicker1: any;
  created_date_time: any;

  generality:any={
    P:[],
    PDB:[],
    MF:[],
    CP:[]
  }

  yearList:any={
    ArchivalProfile:{
      data:[
        // {
        //   year:2001,
        //   dataYear:
        //   {
        //     t1:3,t2:4
        //   }
        // }
      ]
    },
    ProfileDocumentBorrowed:{
      data:[
        {
          year:2001,
          dataYear:
          {
            t1:3,t2:4
          }
        }
      ]
    },
    MiningFile:{
      data:[
        {
          year:2001,
          dataYear:
          {
            t1:3,t2:4
          }
        }
      ]
    },
    CancellationProfile:{
      data:[
        {
          year:2001,
          dataYear:
          {
            t1:3,t2:4
          }
        }
      ]
    }
  };
  ngOnInit(): void {
    this.year = this.yearNow.getFullYear();
    // console.log(this.year);
    //a
    this.getProfileArchival();
    this.getProfileDocumentBorrowed();
    this.getMiningFile();
    this.getCancellationProfile();

  }

  //vẽ biểu đồ hồ sơ lưu trữ
  serviceData: any = {
    title: {
      text: "Biểu đồ hồ sơ lưu trữ theo tháng",
      textStyle:{
        fontFamily: 'sans-serif'
      },
    },
    xAxis: {
      type: 'category',
      data: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
    },
    yAxis: {},
    series: [
      {
        data: [],
        type: 'line',
      },
    ],
  };

  pieChart: any;
  getPieChart(e: any) {
    this.pieChart = e;
    console.log(e);
  }

  //year
  selectedDate1 = null;
  //  selectedDate2 = null;
  maxDate = new Date().setMonth(8);
  getValue(value: any) {
    if (value.selectedDate) {
      this.year = value.selectedDate.getFullYear();
      //console.log(this.year);
      this.getProfileArchival();
      this.getProfileDocumentBorrowed();
      this.getMiningFile();
      this.getCancellationProfile();
    }
  }

  //get
  _search = {
    // borrowed_date: null,
    profile_number: null,
    profile_name: null,
    from_date: null,
    to_date: null,
    // mining_purpose: null,
    profile_rcd: '',
    status: 1,
  };

  pager = {
    total: 0,
    pageIndex: 0,
    pageSize: 0,
  };

  getProfileArchival() {
    this.profileData = [];
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
    };
    this.api.post('api/Statistic/StatisticProfileSearch', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.dataSourceArchivalProfile = a.data;
      // console.log(this.dataSourceArchivalProfile);
      let datax: Array<any> = new Array();
      // let datay: Array<any>=new Array;
      for (let i = 0; i < this.dataSourceArchivalProfile.length; i++) {
        let time: any;
        time = new Date(this.dataSourceArchivalProfile[i].created_date_time);
        let year1 = time.getFullYear();
        // console.log(year1);
        if (year1 == this.year) {
          let month = time.getMonth() + 1;
          if (this.profileData.length == 0) {
            this.profileData.unshift({ month: month, sum: 1 });
          } else {
            let check = true;
            for (let i = 0; i < this.profileData.length; i++) {
              if (this.profileData[i].month == month) {
                check = true;
                this.profileData[i].sum = this.profileData[i].sum + 1;
                break;
              } else {
                check = false;
              }
            }
            if (check == false) {
              this.profileData.unshift({ month: month, sum: 1 });
            }
          }
          // this.profileData.unshift(this.dataSourceArchivalProfile[i]);
        } else {
          continue;
        }

        // this.yearList.ArchivalProfile.data[i].year=year1;
        // this.yearList.ArchivalProfile.data[i].dataYear=this.profileData;
        // this.yearList.ArchivalProfile.data.unshift({year:year1,dataYear:this.profileData})
      }

      // console.log()
      console.log(this.profileData);
      let s=0;
      for (let j = 0; j < this.profileData.length; j++) {
        s+=this.profileData[j].sum;
      }
      this.generality.P.unshift({sum:s})

      for (let i = 1; i <= 12; i++) {
        for (let j = 0; j < this.profileData.length; j++) {
          if (this.profileData[j].month == i) {
            datax[i - 1] = this.profileData[j].sum;
            break;
          } else {
            if (j == this.profileData.length - 1) {
              datax[i - 1] = 0;
            } else {
              continue;
            }
          }
        }
      }
      // console.log(datax);
      
      this.serviceData.series[0].data = datax;

      // console.log(this.generality);

      this.pieChart.setOption(this.serviceData, true);
    });
  }


  //hồ sơ cho mượn
  serviceData1: any = {
    title: {
      text: "Biểu đồ hồ sơ mượn theo tháng",
      textStyle:{
        fontFamily: 'sans-serif'
      },
    },
    xAxis: {
      type: 'category',
      data: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
    },
    yAxis: {},
    series: [
      {
        data: [],
        type: 'line',
      },
    ],
  };

  _search1 = {
    borrowed_date: null,
    return_date: null,
    staff_name: '',
    mining_purpose: null,
    status: null
  };

  pieChart1: any;
  getPieChart1(e: any) {
    this.pieChart1 = e;
    // console.log(e);
  }

  getProfileDocumentBorrowed() {
    this.profileData1 = [];
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search1,
    };
    this.api.post('api/Statistic/ReportProfileBorrowedSearch', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.dataSourceProfileDocumentBorrowed = a.data;
      // console.log(this.dataSourceProfileDocumentBorrowed);
      let datax: Array<any> = new Array();
      // let datay: Array<any>=new Array;

      for (let i = 0; i < this.dataSourceProfileDocumentBorrowed.length; i++) {
        let time: any;
        time = new Date(this.dataSourceProfileDocumentBorrowed[i].created_date_time);
        let year1 = time.getFullYear();
        // console.log(year1);
        if (year1 == this.year) {
          let month = time.getMonth() + 1;
          if (this.profileData1.length == 0) {
            this.profileData1.unshift({ month: month, sum: 1 });
          } else {
            let check = true;
            for (let i = 0; i < this.profileData1.length; i++) {
              if (this.profileData1[i].month == month) {
                check = true;
                this.profileData1[i].sum = this.profileData1[i].sum + 1;
                break;
              } else {
                check = false;
              }
            }
            if (check == false) {
              this.profileData1.unshift({ month: month, sum: 1 });
            }
          }
          // this.profileData.unshift(this.dataSourceProfileDocumentBorrowed[i]);
        } else {
          continue;
        }
      }

      // console.log()
      let s=0;
      for (let j = 0; j < this.profileData1.length; j++) {
        s+=this.profileData1[j].sum;
      }
      this.generality.PDB.unshift({sum:s})

      console.log(this.profileData1);
      for (let i = 1; i <= 12; i++) {
        for (let j = 0; j < this.profileData1.length; j++) {
          if (this.profileData1[j].month == i) {
            datax[i - 1] = this.profileData1[j].sum;
            break;
          } else {
            if (j == this.profileData1.length - 1) {
              datax[i - 1] = 0;
            } else {
              continue;
            }
          }
        }
      }
      // console.log(datax);

      this.serviceData1.series[0].data = datax;

      this.pieChart1.setOption(this.serviceData1, true);
    });
  }

  serviceData2: any = {
    title: {
      text: "Biểu đồ hồ sơ khai thác theo tháng",
      textStyle:{
        fontFamily: 'sans-serif'
      },
    },
    xAxis: {
      type: 'category',
      data: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
    },
    yAxis: {},
    series: [
      {
        data: [],
        type: 'line',
      },
    ],
  };

  _search2 = {
    borrowed_date: null,
    return_date: null,
    staff_name: '',
    mining_purpose: null,
    status: null
  };

  pieChart2: any;
  getPieChart2(e: any) {
    this.pieChart2 = e;
    // console.log(e);
  }

  getMiningFile() {
    this.profileData2 = [];
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search2,
    };
    this.api.post('api/Statistic/ReportMiningFileSearch', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.dataSourceMiningFile = a.data;
      console.log(this.dataSourceMiningFile);
      let datax: Array<any> = new Array();
      // let datay: Array<any>=new Array;

      for (let i = 0; i < this.dataSourceMiningFile.length; i++) {
        let time: any;
        time = new Date(this.dataSourceMiningFile[i].created_date_time);
        let year1 = time.getFullYear();
        // console.log(year1);
        if (year1 == this.year) {
          let month = time.getMonth() + 1;
          if (this.profileData2.length == 0) {
            this.profileData2.unshift({ month: month, sum: 1 });
          } else {
            let check = true;
            for (let i = 0; i < this.profileData2.length; i++) {
              if (this.profileData2[i].month == month) {
                check = true;
                this.profileData2[i].sum = this.profileData2[i].sum + 1;
                break;
              } else {
                check = false;
              }
            }
            if (check == false) {
              this.profileData2.unshift({ month: month, sum: 1 });
            }
          }
          // this.profileData.unshift(this.dataSourceProfileDocumentBorrowed[i]);
        } else {
          continue;
        }
      }

      // console.log()

      let s=0;
      for (let j = 0; j < this.profileData2.length; j++) {
        s+=this.profileData2[j].sum;
      }
      this.generality.MF.unshift({sum:s})

      console.log(this.profileData2);
      for (let i = 1; i <= 12; i++) {
        for (let j = 0; j < this.profileData2.length; j++) {
          if (this.profileData2[j].month == i) {
            datax[i - 1] = this.profileData2[j].sum;
            break;
          } else {
            if (j == this.profileData2.length - 1) {
              datax[i - 1] = 0;
            } else {
              continue;
            }
          }
        }
      }
      // console.log(datax);

      this.serviceData2.series[0].data = datax;

      this.pieChart2.setOption(this.serviceData2, true);
    });
  }

  //hồ sơ hủy
  serviceData3: any = {
    title: {
      text: "Biểu đồ hồ sơ hủy theo tháng",
      textStyle:{
        fontFamily: 'sans-serif'
      },
    },
    xAxis: {
      type: 'category',
      data: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
    },
    yAxis: {},
    series: [
      {
        data: [],
        type: 'line',
      },
    ],
  };

  _search3 = {
    cancellation_method: null,
    staff_name: '',
    cancellation_minutes_number: null,
    // status: -1
  };

  pieChart3: any;
  getPieChart3(e: any) {
    this.pieChart3 = e;
    // console.log(e);
  }

  getCancellationProfile(){
    this.profileData3 = [];
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search3,
    };
    this.api.post('api/Statistic/ReportCancellationMinutesSearch', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.dataSourceCancellationProfile = a.data;
      console.log(this.dataSourceCancellationProfile);
      let datax: Array<any> = new Array();
      // let datay: Array<any>=new Array;

      for (let i = 0; i < this.dataSourceCancellationProfile.length; i++) {
        let time: any;
        time = new Date(this.dataSourceCancellationProfile[i].created_date_time);
        let year1 = time.getFullYear();
        // console.log(year1);
        if (year1 == this.year) {
          let month = time.getMonth() + 1;
          if (this.profileData3.length == 0) {
            this.profileData3.unshift({ month: month, sum: 1 });
          } else {
            let check = true;
            for (let i = 0; i < this.profileData3.length; i++) {
              if (this.profileData3[i].month == month) {
                check = true;
                this.profileData3[i].sum = this.profileData3[i].sum + 1;
                break;
              } else {
                check = false;
              }
            }
            if (check == false) {
              this.profileData3.unshift({ month: month, sum: 1 });
            }
          }
          // this.profileData.unshift(this.dataSourceProfileDocumentBorrowed[i]);
        } else {
          continue;
        }
      }

      // console.log()
      let s=0;
      for (let j = 0; j < this.profileData3.length; j++) {
        s+=this.profileData3[j].sum;
      }
      this.generality.CP.unshift({sum:s})

      console.log(this.profileData3);
      for (let i = 1; i <= 12; i++) {
        for (let j = 0; j < this.profileData3.length; j++) {
          if (this.profileData3[j].month == i) {
            datax[i - 1] = this.profileData3[j].sum;
            break;
          } else {
            if (j == this.profileData3.length - 1) {
              datax[i - 1] = 0;
            } else {
              continue;
            }
          }
        }
      }
      // console.log(datax);

      this.serviceData3.series[0].data = datax;

      this.pieChart3.setOption(this.serviceData3, true);
    });
  }








  // option = {
  //   baseOption: {
  //     timeline: {
  //       axisType: 'category',
  //       autoPlay: false,
  //       data: ['2001', '2002', '2003', '2004'],
  //     },
  //     tooltip: {},
  //     calculable: true,
  //     grid: {
  //       top: 80,
  //       bottom: 100,
  //     },
  //     xAxis: [
  //       {
  //         type: 'category',
  //         axisLabel: {
  //           interval: 0,
  //         },
  //         data: ['t1', 't2', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't11', 't12'],
  //         splitLine: {
  //           show: false,
  //         },
  //       },
  //     ],
  //     yAxis: [
  //       {
  //         type: 'value',
  //         name: 'số lượng',
  //         max: 30000,
  //       },
  //     ],
  //     series: [
  //       {
  //         name: 'số lượng lưu trữ',
  //         type: 'bar',
  //       },
  //       {
  //         name: 'số lượng khai thác',
  //         type: 'bar',
  //       },
  //       {
  //         name: 'số lượng hủy',
  //         type: 'bar',
  //       },
  //     ],
  //   },
  //   options: [

  //     {
  //       title: {
  //         text: '2001',
  //         left:"right"
  //       },
  //       series: [
  //         //năm 1
  //         {
  //           //cột đầu năm đầu
  //           data: [
  //             {
  //               name: '1',
  //               value: 4315,
  //             },
  //             {
  //               name: '2',
  //               value: 2150.76,
  //             },
  //             {
  //               name: '3',
  //               value: 6018.28,
  //             },
  //             {
  //               name: '4',
  //               value: 2324.8,
  //             },
  //             {
  //               name: '5',
  //               value: 1940.94,
  //             },
  //             {
  //               name: '6',
  //               value: 5458.22,
  //             },
  //             {
  //               name: '7',
  //               value: 2348.54,
  //             },
  //             {
  //               name: '8',
  //               value: 3637.2,
  //             },
  //             {
  //               name: '9',
  //               value: 5741.03,
  //             },
  //             {
  //               name: '10',
  //               value: 10606.85,
  //             },
  //             {
  //               name: '11',
  //               value: 8003.67,
  //             },
  //           ],
  //         },
  //         //cột 2 năm đầu
  //         {
  //           data: [
  //             {
  //               name: '1.1',
  //               value: 561.91,
  //             },
  //             {
  //               name: '1.2',
  //               value: 76.86,
  //             },
  //             {
  //               name: '1.3',
  //               value: 179.6,
  //             },
  //             {
  //               name: '1.4',
  //               value: 124.1,
  //             },
  //             {
  //               name: '1.5',
  //               value: 48.39,
  //             },
  //             {
  //               name: '1.6',
  //               value: 137.18,
  //             },
  //             {
  //               name: '1.7',
  //               value: 75.45,
  //             },
  //             {
  //               name: '1.8',
  //               value: 31.6,
  //             },
  //             {
  //               name: '1.9',
  //               value: 485.25,
  //             },
  //             {
  //               name: '1.10',
  //               value: 368.86,
  //             },
  //             {
  //               name: '1.11',
  //               value: 347.53,
  //             },
  //           ],
  //         },
  //         //cột 3 năm đầu
  //         {
  //           data: [
  //             {
  //               name: '3',
  //               value: 298.02,
  //             },
  //             {
  //               name: '3',
  //               value: 73.04,
  //             },
  //             {
  //               name: '3',
  //               value: 140.89,
  //             },
  //             {
  //               name: '3',
  //               value: 65.83,
  //             },
  //             {
  //               name: '3',
  //               value: 51.48,
  //             },
  //             {
  //               name: '3',
  //               value: 130.94,
  //             },
  //             {
  //               name: '3',
  //               value: 76.11,
  //             },
  //             {
  //               name: '3',
  //               value: 118.7,
  //             },
  //             {
  //               name: '3',
  //               value: 384.86,
  //             },
  //             {
  //               name: '3',
  //               value: 371.09,
  //             },
  //             {
  //               name: '3',
  //               value: 360.63,
  //             },
  //           ],
  //         }
  //       ],
  //     },
  //     {
  //       title: {
  //         text: '2002',
  //         left:"right"
  //       },
  //       series: [
  //         {
  //           data: [
  //             {
  //               name: '北京',
  //               value: 5007.21,
  //             },
  //             {
  //               name: '天津',
  //               value: 2578.03,
  //             },
  //             {
  //               name: '河北',
  //               value: 6921.29,
  //             },
  //             {
  //               name: '山西',
  //               value: 2855.23,
  //             },
  //             {
  //               name: '内蒙古',
  //               value: 2388.38,
  //             },
  //             {
  //               name: '辽宁',
  //               value: 6002.54,
  //             },
  //             {
  //               name: '吉林',
  //               value: 2662.08,
  //             },
  //             {
  //               name: '黑龙江',
  //               value: 4057.4,
  //             },
  //             {
  //               name: '上海',
  //               value: 6694.23,
  //             },
  //             {
  //               name: '江苏',
  //               value: 12442.87,
  //             },
  //             {
  //               name: '浙江',
  //               value: 9705.02,
  //             },
  //             {
  //               name: '安徽',
  //               value: 3923.11,
  //             },
  //             {
  //               name: '福建',
  //               value: 4983.67,
  //             },
  //             {
  //               name: '江西',
  //               value: 2807.41,
  //             },
  //             {
  //               name: '山东',
  //               value: 12078.15,
  //             },
  //             {
  //               name: '河南',
  //               value: 6867.7,
  //             },
  //             {
  //               name: '湖北',
  //               value: 4757.45,
  //             },
  //             {
  //               name: '湖南',
  //               value: 4659.99,
  //             },
  //             {
  //               name: '广东',
  //               value: 15844.64,
  //             },
  //             {
  //               name: '广西',
  //               value: 2821.11,
  //             },
  //             {
  //               name: '海南',
  //               value: 713.96,
  //             },
  //             {
  //               name: '重庆',
  //               value: 2555.72,
  //             },
  //             {
  //               name: '四川',
  //               value: 5333.09,
  //             },
  //             {
  //               name: '贵州',
  //               value: 1426.34,
  //             },
  //             {
  //               name: '云南',
  //               value: 2556.02,
  //             },
  //             {
  //               name: '西藏',
  //               value: 185.09,
  //             },
  //             {
  //               name: '陕西',
  //               value: 2587.72,
  //             },
  //             {
  //               name: '甘肃',
  //               value: 1399.83,
  //             },
  //             {
  //               name: '青海',
  //               value: 390.2,
  //             },
  //             {
  //               name: '宁夏',
  //               value: 445.36,
  //             },
  //             {
  //               name: '新疆',
  //               value: 1886.35,
  //             },
  //           ],
  //         },
  //         {
  //           data: [
  //             {
  //               name: '北京',
  //               value: 635.56,
  //             },
  //             {
  //               name: '天津',
  //               value: 112.79,
  //             },
  //             {
  //               name: '河北',
  //               value: 199.87,
  //             },
  //             {
  //               name: '山西',
  //               value: 118.48,
  //             },
  //             {
  //               name: '内蒙古',
  //               value: 55.89,
  //             },
  //             {
  //               name: '辽宁',
  //               value: 145.38,
  //             },
  //             {
  //               name: '吉林',
  //               value: 73.15,
  //             },
  //             {
  //               name: '黑龙江',
  //               value: 32.2,
  //             },
  //             {
  //               name: '上海',
  //               value: 517.97,
  //             },
  //             {
  //               name: '江苏',
  //               value: 392.11,
  //             },
  //             {
  //               name: '浙江',
  //               value: 451.54,
  //             },
  //             {
  //               name: '安徽',
  //               value: 87.45,
  //             },
  //             {
  //               name: '福建',
  //               value: 150.09,
  //             },
  //             {
  //               name: '江西',
  //               value: 64.31,
  //             },
  //             {
  //               name: '山东',
  //               value: 329.71,
  //             },
  //             {
  //               name: '河南',
  //               value: 165.11,
  //             },
  //             {
  //               name: '湖北',
  //               value: 107.31,
  //             },
  //             {
  //               name: '湖南',
  //               value: 99.35,
  //             },
  //             {
  //               name: '广东',
  //               value: 534.28,
  //             },
  //             {
  //               name: '广西',
  //               value: 61.59,
  //             },
  //             {
  //               name: '海南',
  //               value: 10.68,
  //             },
  //             {
  //               name: '重庆',
  //               value: 147.04,
  //             },
  //             {
  //               name: '四川',
  //               value: 206.24,
  //             },
  //             {
  //               name: '贵州',
  //               value: 48.01,
  //             },
  //             {
  //               name: '云南',
  //               value: 105.48,
  //             },
  //             {
  //               name: '西藏',
  //               value: 4.74,
  //             },
  //             {
  //               name: '陕西',
  //               value: 77.87,
  //             },
  //             {
  //               name: '甘肃',
  //               value: 42.31,
  //             },
  //             {
  //               name: '青海',
  //               value: 17.98,
  //             },
  //             {
  //               name: '宁夏',
  //               value: 24.8,
  //             },
  //             {
  //               name: '新疆',
  //               value: 64.92,
  //             },
  //           ],
  //         },
  //         {
  //           data: [
  //             {
  //               name: '北京',
  //               value: 341.88,
  //             },
  //             {
  //               name: '天津',
  //               value: 92.31,
  //             },
  //             {
  //               name: '河北',
  //               value: 185.19,
  //             },
  //             {
  //               name: '山西',
  //               value: 78.73,
  //             },
  //             {
  //               name: '内蒙古',
  //               value: 61.05,
  //             },
  //             {
  //               name: '辽宁',
  //               value: 188.49,
  //             },
  //             {
  //               name: '吉林',
  //               value: 91.99,
  //             },
  //             {
  //               name: '黑龙江',
  //               value: 127.2,
  //             },
  //             {
  //               name: '上海',
  //               value: 487.82,
  //             },
  //             {
  //               name: '江苏',
  //               value: 447.47,
  //             },
  //             {
  //               name: '浙江',
  //               value: 473.16,
  //             },
  //             {
  //               name: '安徽',
  //               value: 162.63,
  //             },
  //             {
  //               name: '福建',
  //               value: 215.84,
  //             },
  //             {
  //               name: '江西',
  //               value: 138.02,
  //             },
  //             {
  //               name: '山东',
  //               value: 418.21,
  //             },
  //             {
  //               name: '河南',
  //               value: 217.58,
  //             },
  //             {
  //               name: '湖北',
  //               value: 176.8,
  //             },
  //             {
  //               name: '湖南',
  //               value: 186.49,
  //             },
  //             {
  //               name: '广东',
  //               value: 955.66,
  //             },
  //             {
  //               name: '广西',
  //               value: 100.93,
  //             },
  //             {
  //               name: '海南',
  //               value: 25.14,
  //             },
  //             {
  //               name: '重庆',
  //               value: 113.69,
  //             },
  //             {
  //               name: '四川',
  //               value: 231.72,
  //             },
  //             {
  //               name: '贵州',
  //               value: 59.86,
  //             },
  //             {
  //               name: '云南',
  //               value: 103.79,
  //             },
  //             {
  //               name: '西藏',
  //               value: 4.35,
  //             },
  //             {
  //               name: '陕西',
  //               value: 83.9,
  //             },
  //             {
  //               name: '甘肃',
  //               value: 48.09,
  //             },
  //             {
  //               name: '青海',
  //               value: 11.41,
  //             },
  //             {
  //               name: '宁夏',
  //               value: 16.85,
  //             },
  //             {
  //               name: '新疆',
  //               value: 47.84,
  //             },
  //           ],
  //         }
  //       ],
  //     },
  //     {
  //       title: {
  //         text: '2003',
  //         left:"right"
  //       },
  //       series: [
  //         {
  //           data: [
  //             {
  //               name: '北京',
  //               value: 6033.21,
  //             },
  //             {
  //               name: '天津',
  //               value: 3110.97,
  //             },
  //             {
  //               name: '河北',
  //               value: 8477.63,
  //             },
  //             {
  //               name: '山西',
  //               value: 3571.37,
  //             },
  //             {
  //               name: '内蒙古',
  //               value: 3041.07,
  //             },
  //             {
  //               name: '辽宁',
  //               value: 6672,
  //             },
  //             {
  //               name: '吉林',
  //               value: 3122.01,
  //             },
  //             {
  //               name: '黑龙江',
  //               value: 4750.6,
  //             },
  //             {
  //               name: '上海',
  //               value: 8072.83,
  //             },
  //             {
  //               name: '江苏',
  //               value: 15003.6,
  //             },
  //             {
  //               name: '浙江',
  //               value: 11648.7,
  //             },
  //             {
  //               name: '安徽',
  //               value: 4759.3,
  //             },
  //             {
  //               name: '福建',
  //               value: 5763.35,
  //             },
  //             {
  //               name: '江西',
  //               value: 3456.7,
  //             },
  //             {
  //               name: '山东',
  //               value: 15021.84,
  //             },
  //             {
  //               name: '河南',
  //               value: 8553.79,
  //             },
  //             {
  //               name: '湖北',
  //               value: 5633.24,
  //             },
  //             {
  //               name: '湖南',
  //               value: 5641.94,
  //             },
  //             {
  //               name: '广东',
  //               value: 18864.62,
  //             },
  //             {
  //               name: '广西',
  //               value: 3433.5,
  //             },
  //             {
  //               name: '海南',
  //               value: 819.66,
  //             },
  //             {
  //               name: '重庆',
  //               value: 3034.58,
  //             },
  //             {
  //               name: '四川',
  //               value: 6379.63,
  //             },
  //             {
  //               name: '贵州',
  //               value: 1677.8,
  //             },
  //             {
  //               name: '云南',
  //               value: 3081.91,
  //             },
  //             {
  //               name: '西藏',
  //               value: 220.34,
  //             },
  //             {
  //               name: '陕西',
  //               value: 3175.58,
  //             },
  //             {
  //               name: '甘肃',
  //               value: 1688.49,
  //             },
  //             {
  //               name: '青海',
  //               value: 466.1,
  //             },
  //             {
  //               name: '宁夏',
  //               value: 537.11,
  //             },
  //             {
  //               name: '新疆',
  //               value: 2209.09,
  //             },
  //           ],
  //         },
  //         {
  //           data: [
  //             {
  //               name: '北京',
  //               value: 713.79,
  //             },
  //             {
  //               name: '天津',
  //               value: 136.97,
  //             },
  //             {
  //               name: '河北',
  //               value: 209.1,
  //             },
  //             {
  //               name: '山西',
  //               value: 110.29,
  //             },
  //             {
  //               name: '内蒙古',
  //               value: 55.89,
  //             },
  //             {
  //               name: '辽宁',
  //               value: 188.04,
  //             },
  //             {
  //               name: '吉林',
  //               value: 77.17,
  //             },
  //             {
  //               name: '黑龙江',
  //               value: 32.2,
  //             },
  //             {
  //               name: '上海',
  //               value: 612.45,
  //             },
  //             {
  //               name: '江苏',
  //               value: 440.5,
  //             },
  //             {
  //               name: '浙江',
  //               value: 523.49,
  //             },
  //             {
  //               name: '安徽',
  //               value: 94.1,
  //             },
  //             {
  //               name: '福建',
  //               value: 171,
  //             },
  //             {
  //               name: '江西',
  //               value: 65.1,
  //             },
  //             {
  //               name: '山东',
  //               value: 343.37,
  //             },
  //             {
  //               name: '河南',
  //               value: 170.82,
  //             },
  //             {
  //               name: '湖北',
  //               value: 118.85,
  //             },
  //             {
  //               name: '湖南',
  //               value: 118.64,
  //             },
  //             {
  //               name: '广东',
  //               value: 602.68,
  //             },
  //             {
  //               name: '广西',
  //               value: 74,
  //             },
  //             {
  //               name: '海南',
  //               value: 11.56,
  //             },
  //             {
  //               name: '重庆',
  //               value: 162.38,
  //             },
  //             {
  //               name: '四川',
  //               value: 236.5,
  //             },
  //             {
  //               name: '贵州',
  //               value: 60.3,
  //             },
  //             {
  //               name: '云南',
  //               value: 118.4,
  //             },
  //             {
  //               name: '西藏',
  //               value: 5.4,
  //             },
  //             {
  //               name: '陕西',
  //               value: 90.1,
  //             },
  //             {
  //               name: '甘肃',
  //               value: 42.99,
  //             },
  //             {
  //               name: '青海',
  //               value: 19,
  //             },
  //             {
  //               name: '宁夏',
  //               value: 27.92,
  //             },
  //             {
  //               name: '新疆',
  //               value: 70.3,
  //             },
  //           ],
  //         },
  //         {
  //           data: [
  //             {
  //               name: '北京',
  //               value: 436.11,
  //             },
  //             {
  //               name: '天津',
  //               value: 106.14,
  //             },
  //             {
  //               name: '河北',
  //               value: 231.08,
  //             },
  //             {
  //               name: '山西',
  //               value: 95.1,
  //             },
  //             {
  //               name: '内蒙古',
  //               value: 73.81,
  //             },
  //             {
  //               name: '辽宁',
  //               value: 203.1,
  //             },
  //             {
  //               name: '吉林',
  //               value: 97.93,
  //             },
  //             {
  //               name: '黑龙江',
  //               value: 137.74,
  //             },
  //             {
  //               name: '上海',
  //               value: 666.3,
  //             },
  //             {
  //               name: '江苏',
  //               value: 534.17,
  //             },
  //             {
  //               name: '浙江',
  //               value: 587.83,
  //             },
  //             {
  //               name: '安徽',
  //               value: 188.28,
  //             },
  //             {
  //               name: '福建',
  //               value: 248.44,
  //             },
  //             {
  //               name: '江西',
  //               value: 167.2,
  //             },
  //             {
  //               name: '山东',
  //               value: 473.27,
  //             },
  //             {
  //               name: '河南',
  //               value: 236.44,
  //             },
  //             {
  //               name: '湖北',
  //               value: 204.8,
  //             },
  //             {
  //               name: '湖南',
  //               value: 191.5,
  //             },
  //             {
  //               name: '广东',
  //               value: 1103.75,
  //             },
  //             {
  //               name: '广西',
  //               value: 122.52,
  //             },
  //             {
  //               name: '海南',
  //               value: 30.64,
  //             },
  //             {
  //               name: '重庆',
  //               value: 129.12,
  //             },
  //             {
  //               name: '四川',
  //               value: 264.3,
  //             },
  //             {
  //               name: '贵州',
  //               value: 68.3,
  //             },
  //             {
  //               name: '云南',
  //               value: 116.54,
  //             },
  //             {
  //               name: '西藏',
  //               value: 5.8,
  //             },
  //             {
  //               name: '陕西',
  //               value: 95.9,
  //             },
  //             {
  //               name: '甘肃',
  //               value: 56.84,
  //             },
  //             {
  //               name: '青海',
  //               value: 13,
  //             },
  //             {
  //               name: '宁夏',
  //               value: 20.78,
  //             },
  //             {
  //               name: '新疆',
  //               value: 53.55,
  //             },
  //           ],
  //         }
  //       ],
  //     },
  //     {
  //       title: {
  //         text: '2004',
  //         left:"right"
  //       },
  //       series: [
  //         {
  //           data: [
  //             {
  //               name: '北京',
  //               value: 6969.52,
  //             },
  //             {
  //               name: '天津',
  //               value: 3905.64,
  //             },
  //             {
  //               name: '河北',
  //               value: 10012.11,
  //             },
  //             {
  //               name: '山西',
  //               value: 4230.53,
  //             },
  //             {
  //               name: '内蒙古',
  //               value: 3905.03,
  //             },
  //             {
  //               name: '辽宁',
  //               value: 8047.26,
  //             },
  //             {
  //               name: '吉林',
  //               value: 3620.27,
  //             },
  //             {
  //               name: '黑龙江',
  //               value: 5513.7,
  //             },
  //             {
  //               name: '上海',
  //               value: 9247.66,
  //             },
  //             {
  //               name: '江苏',
  //               value: 18598.69,
  //             },
  //             {
  //               name: '浙江',
  //               value: 13417.68,
  //             },
  //             {
  //               name: '安徽',
  //               value: 5350.17,
  //             },
  //             {
  //               name: '福建',
  //               value: 6554.69,
  //             },
  //             {
  //               name: '江西',
  //               value: 4056.76,
  //             },
  //             {
  //               name: '山东',
  //               value: 18366.87,
  //             },
  //             {
  //               name: '河南',
  //               value: 10587.42,
  //             },
  //             {
  //               name: '湖北',
  //               value: 6590.19,
  //             },
  //             {
  //               name: '湖南',
  //               value: 6596.1,
  //             },
  //             {
  //               name: '广东',
  //               value: 22557.37,
  //             },
  //             {
  //               name: '广西',
  //               value: 3984.1,
  //             },
  //             {
  //               name: '海南',
  //               value: 918.75,
  //             },
  //             {
  //               name: '重庆',
  //               value: 3467.72,
  //             },
  //             {
  //               name: '四川',
  //               value: 7385.1,
  //             },
  //             {
  //               name: '贵州',
  //               value: 2005.42,
  //             },
  //             {
  //               name: '云南',
  //               value: 3462.73,
  //             },
  //             {
  //               name: '西藏',
  //               value: 248.8,
  //             },
  //             {
  //               name: '陕西',
  //               value: 3933.72,
  //             },
  //             {
  //               name: '甘肃',
  //               value: 1933.98,
  //             },
  //             {
  //               name: '青海',
  //               value: 543.32,
  //             },
  //             {
  //               name: '宁夏',
  //               value: 612.61,
  //             },
  //             {
  //               name: '新疆',
  //               value: 2604.19,
  //             },
  //           ],
  //         },
  //         {
  //           data: [
  //             {
  //               name: '北京',
  //               value: 840.2,
  //             },
  //             {
  //               name: '天津',
  //               value: 147.4,
  //             },
  //             {
  //               name: '河北',
  //               value: 213.47,
  //             },
  //             {
  //               name: '山西',
  //               value: 135.07,
  //             },
  //             {
  //               name: '内蒙古',
  //               value: 72.52,
  //             },
  //             {
  //               name: '辽宁',
  //               value: 232.85,
  //             },
  //             {
  //               name: '吉林',
  //               value: 83.63,
  //             },
  //             {
  //               name: '黑龙江',
  //               value: 35.03,
  //             },
  //             {
  //               name: '上海',
  //               value: 675.12,
  //             },
  //             {
  //               name: '江苏',
  //               value: 492.4,
  //             },
  //             {
  //               name: '浙江',
  //               value: 686.32,
  //             },
  //             {
  //               name: '安徽',
  //               value: 127.05,
  //             },
  //             {
  //               name: '福建',
  //               value: 186.12,
  //             },
  //             {
  //               name: '江西',
  //               value: 69.55,
  //             },
  //             {
  //               name: '山东',
  //               value: 448.36,
  //             },
  //             {
  //               name: '河南',
  //               value: 181.74,
  //             },
  //             {
  //               name: '湖北',
  //               value: 127.32,
  //             },
  //             {
  //               name: '湖南',
  //               value: 162.37,
  //             },
  //             {
  //               name: '广东',
  //               value: 661.81,
  //             },
  //             {
  //               name: '广西',
  //               value: 91.93,
  //             },
  //             {
  //               name: '海南',
  //               value: 13.16,
  //             },
  //             {
  //               name: '重庆',
  //               value: 185.18,
  //             },
  //             {
  //               name: '四川',
  //               value: 262.26,
  //             },
  //             {
  //               name: '贵州',
  //               value: 73.67,
  //             },
  //             {
  //               name: '云南',
  //               value: 130.5,
  //             },
  //             {
  //               name: '西藏',
  //               value: 7.57,
  //             },
  //             {
  //               name: '陕西',
  //               value: 127.58,
  //             },
  //             {
  //               name: '甘肃',
  //               value: 44.73,
  //             },
  //             {
  //               name: '青海',
  //               value: 20.36,
  //             },
  //             {
  //               name: '宁夏',
  //               value: 32.25,
  //             },
  //             {
  //               name: '新疆',
  //               value: 80.34,
  //             },
  //           ],
  //         },
  //         {
  //           data: [
  //             {
  //               name: '北京',
  //               value: 493.73,
  //             },
  //             {
  //               name: '天津',
  //               value: 122.67,
  //             },
  //             {
  //               name: '河北',
  //               value: 330.87,
  //             },
  //             {
  //               name: '山西',
  //               value: 106,
  //             },
  //             {
  //               name: '内蒙古',
  //               value: 98.75,
  //             },
  //             {
  //               name: '辽宁',
  //               value: 256.77,
  //             },
  //             {
  //               name: '吉林',
  //               value: 112.29,
  //             },
  //             {
  //               name: '黑龙江',
  //               value: 163.34,
  //             },
  //             {
  //               name: '上海',
  //               value: 715.97,
  //             },
  //             {
  //               name: '江苏',
  //               value: 799.73,
  //             },
  //             {
  //               name: '浙江',
  //               value: 688.86,
  //             },
  //             {
  //               name: '安徽',
  //               value: 231.66,
  //             },
  //             {
  //               name: '福建',
  //               value: 331.8,
  //             },
  //             {
  //               name: '江西',
  //               value: 171.88,
  //             },
  //             {
  //               name: '山东',
  //               value: 664.9,
  //             },
  //             {
  //               name: '河南',
  //               value: 298.19,
  //             },
  //             {
  //               name: '湖北',
  //               value: 217.17,
  //             },
  //             {
  //               name: '湖南',
  //               value: 215.63,
  //             },
  //             {
  //               name: '广东',
  //               value: 1430.37,
  //             },
  //             {
  //               name: '广西',
  //               value: 165.05,
  //             },
  //             {
  //               name: '海南',
  //               value: 38.2,
  //             },
  //             {
  //               name: '重庆',
  //               value: 143.88,
  //             },
  //             {
  //               name: '四川',
  //               value: 286.23,
  //             },
  //             {
  //               name: '贵州',
  //               value: 76.38,
  //             },
  //             {
  //               name: '云南',
  //               value: 148.69,
  //             },
  //             {
  //               name: '西藏',
  //               value: 10.02,
  //             },
  //             {
  //               name: '陕西',
  //               value: 108.62,
  //             },
  //             {
  //               name: '甘肃',
  //               value: 63.78,
  //             },
  //             {
  //               name: '青海',
  //               value: 14.1,
  //             },
  //             {
  //               name: '宁夏',
  //               value: 22.97,
  //             },
  //             {
  //               name: '新疆',
  //               value: 55.79,
  //             },
  //           ],
  //         }
  //       ],
  //     },
  //   ],
  // };


}
