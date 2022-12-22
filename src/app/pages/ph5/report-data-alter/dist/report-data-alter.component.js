"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DataAlterComponent = void 0;
var core_1 = require("@angular/core");
var DataAlterComponent = /** @class */ (function () {
    function DataAlterComponent(api) {
        this.api = api;
        this.dataSourceArchivalProfile = [];
        this.dataSourceProfileDocumentBorrowed = [];
        this.dataSourceMiningFile = [];
        this.dataSourceCancellationProfile = [];
        this.profileData = [];
        this.profileData1 = [];
        this.profileData2 = [];
        this.profileData3 = [];
        this.yearNow = new Date();
        this.year = 0;
        this.generality = {
            P: [],
            PDB: [],
            MF: [],
            CP: []
        };
        this.yearList = {
            ArchivalProfile: {
                data: [
                // {
                //   year:2001,
                //   dataYear:
                //   {
                //     t1:3,t2:4
                //   }
                // }
                ]
            },
            ProfileDocumentBorrowed: {
                data: [
                    {
                        year: 2001,
                        dataYear: {
                            t1: 3, t2: 4
                        }
                    }
                ]
            },
            MiningFile: {
                data: [
                    {
                        year: 2001,
                        dataYear: {
                            t1: 3, t2: 4
                        }
                    }
                ]
            },
            CancellationProfile: {
                data: [
                    {
                        year: 2001,
                        dataYear: {
                            t1: 3, t2: 4
                        }
                    }
                ]
            }
        };
        //vẽ biểu đồ hồ sơ lưu trữ
        this.serviceData = {
            title: {
                text: "Biểu đồ hồ sơ lưu trữ theo tháng",
                textStyle: {
                    fontFamily: 'sans-serif'
                }
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
                ]
            },
            yAxis: {},
            series: [
                {
                    data: [],
                    type: 'line'
                },
            ]
        };
        //year
        this.selectedDate1 = null;
        //  selectedDate2 = null;
        this.maxDate = new Date().setMonth(8);
        //get
        this._search = {
            // borrowed_date: null,
            profile_number: null,
            profile_name: null,
            from_date: null,
            to_date: null,
            // mining_purpose: null,
            profile_rcd: '',
            status: 1
        };
        this.pager = {
            total: 0,
            pageIndex: 0,
            pageSize: 0
        };
        //hồ sơ cho mượn
        this.serviceData1 = {
            title: {
                text: "Biểu đồ hồ sơ mượn theo tháng",
                textStyle: {
                    fontFamily: 'sans-serif'
                }
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
                ]
            },
            yAxis: {},
            series: [
                {
                    data: [],
                    type: 'line'
                },
            ]
        };
        this._search1 = {
            borrowed_date: null,
            return_date: null,
            staff_name: '',
            mining_purpose: null,
            status: null
        };
        this.serviceData2 = {
            title: {
                text: "Biểu đồ hồ sơ khai thác theo tháng",
                textStyle: {
                    fontFamily: 'sans-serif'
                }
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
                ]
            },
            yAxis: {},
            series: [
                {
                    data: [],
                    type: 'line'
                },
            ]
        };
        this._search2 = {
            borrowed_date: null,
            return_date: null,
            staff_name: '',
            mining_purpose: null,
            status: null
        };
        //hồ sơ hủy
        this.serviceData3 = {
            title: {
                text: "Biểu đồ hồ sơ hủy theo tháng",
                textStyle: {
                    fontFamily: 'sans-serif'
                }
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
                ]
            },
            yAxis: {},
            series: [
                {
                    data: [],
                    type: 'line'
                },
            ]
        };
        this._search3 = {
            cancellation_method: null,
            staff_name: '',
            cancellation_minutes_number: null
        };
    }
    DataAlterComponent.prototype.ngOnInit = function () {
        this.year = this.yearNow.getFullYear();
        // console.log(this.year);
        //a
        this.getProfileArchival();
        this.getProfileDocumentBorrowed();
        this.getMiningFile();
        this.getCancellationProfile();
    };
    DataAlterComponent.prototype.getPieChart = function (e) {
        this.pieChart = e;
        console.log(e);
    };
    DataAlterComponent.prototype.getValue = function (value) {
        if (value.selectedDate) {
            this.year = value.selectedDate.getFullYear();
            //console.log(this.year);
            this.getProfileArchival();
            this.getProfileDocumentBorrowed();
            this.getMiningFile();
            this.getCancellationProfile();
        }
    };
    DataAlterComponent.prototype.getProfileArchival = function () {
        var _this = this;
        this.profileData = [];
        var data = __assign({ page: this.pager.pageIndex, pageSize: this.pager.pageSize }, this._search);
        this.api.post('api/Statistic/StatisticProfileSearch', data).subscribe(function (res) {
            var a = JSON.parse(JSON.stringify(res));
            _this.dataSourceArchivalProfile = a.data;
            // console.log(this.dataSourceArchivalProfile);
            var datax = new Array();
            // let datay: Array<any>=new Array;
            for (var i = 0; i < _this.dataSourceArchivalProfile.length; i++) {
                var time = void 0;
                time = new Date(_this.dataSourceArchivalProfile[i].created_date_time);
                var year1 = time.getFullYear();
                // console.log(year1);
                if (year1 == _this.year) {
                    var month = time.getMonth() + 1;
                    if (_this.profileData.length == 0) {
                        _this.profileData.unshift({ month: month, sum: 1 });
                    }
                    else {
                        var check = true;
                        for (var i_1 = 0; i_1 < _this.profileData.length; i_1++) {
                            if (_this.profileData[i_1].month == month) {
                                check = true;
                                _this.profileData[i_1].sum = _this.profileData[i_1].sum + 1;
                                break;
                            }
                            else {
                                check = false;
                            }
                        }
                        if (check == false) {
                            _this.profileData.unshift({ month: month, sum: 1 });
                        }
                    }
                    // this.profileData.unshift(this.dataSourceArchivalProfile[i]);
                }
                else {
                    continue;
                }
                // this.yearList.ArchivalProfile.data[i].year=year1;
                // this.yearList.ArchivalProfile.data[i].dataYear=this.profileData;
                // this.yearList.ArchivalProfile.data.unshift({year:year1,dataYear:this.profileData})
            }
            // console.log()
            console.log(_this.profileData);
            var s = 0;
            for (var j = 0; j < _this.profileData.length; j++) {
                s += _this.profileData[j].sum;
            }
            _this.generality.P.unshift({ sum: s });
            for (var i = 1; i <= 12; i++) {
                for (var j = 0; j < _this.profileData.length; j++) {
                    if (_this.profileData[j].month == i) {
                        datax[i - 1] = _this.profileData[j].sum;
                        break;
                    }
                    else {
                        if (j == _this.profileData.length - 1) {
                            datax[i - 1] = 0;
                        }
                        else {
                            continue;
                        }
                    }
                }
            }
            // console.log(datax);
            _this.serviceData.series[0].data = datax;
            // console.log(this.generality);
            _this.pieChart.setOption(_this.serviceData, true);
        });
    };
    DataAlterComponent.prototype.getPieChart1 = function (e) {
        this.pieChart1 = e;
        // console.log(e);
    };
    DataAlterComponent.prototype.getProfileDocumentBorrowed = function () {
        var _this = this;
        this.profileData1 = [];
        var data = __assign({ page: this.pager.pageIndex, pageSize: this.pager.pageSize }, this._search1);
        this.api.post('api/Statistic/ReportProfileBorrowedSearch', data).subscribe(function (res) {
            var a = JSON.parse(JSON.stringify(res));
            _this.dataSourceProfileDocumentBorrowed = a.data;
            // console.log(this.dataSourceProfileDocumentBorrowed);
            var datax = new Array();
            // let datay: Array<any>=new Array;
            for (var i = 0; i < _this.dataSourceProfileDocumentBorrowed.length; i++) {
                var time = void 0;
                time = new Date(_this.dataSourceProfileDocumentBorrowed[i].created_date_time);
                var year1 = time.getFullYear();
                // console.log(year1);
                if (year1 == _this.year) {
                    var month = time.getMonth() + 1;
                    if (_this.profileData1.length == 0) {
                        _this.profileData1.unshift({ month: month, sum: 1 });
                    }
                    else {
                        var check = true;
                        for (var i_2 = 0; i_2 < _this.profileData1.length; i_2++) {
                            if (_this.profileData1[i_2].month == month) {
                                check = true;
                                _this.profileData1[i_2].sum = _this.profileData1[i_2].sum + 1;
                                break;
                            }
                            else {
                                check = false;
                            }
                        }
                        if (check == false) {
                            _this.profileData1.unshift({ month: month, sum: 1 });
                        }
                    }
                    // this.profileData.unshift(this.dataSourceProfileDocumentBorrowed[i]);
                }
                else {
                    continue;
                }
            }
            // console.log()
            var s = 0;
            for (var j = 0; j < _this.profileData1.length; j++) {
                s += _this.profileData1[j].sum;
            }
            _this.generality.PDB.unshift({ sum: s });
            console.log(_this.profileData1);
            for (var i = 1; i <= 12; i++) {
                for (var j = 0; j < _this.profileData1.length; j++) {
                    if (_this.profileData1[j].month == i) {
                        datax[i - 1] = _this.profileData1[j].sum;
                        break;
                    }
                    else {
                        if (j == _this.profileData1.length - 1) {
                            datax[i - 1] = 0;
                        }
                        else {
                            continue;
                        }
                    }
                }
            }
            // console.log(datax);
            _this.serviceData1.series[0].data = datax;
            _this.pieChart1.setOption(_this.serviceData1, true);
        });
    };
    DataAlterComponent.prototype.getPieChart2 = function (e) {
        this.pieChart2 = e;
        // console.log(e);
    };
    DataAlterComponent.prototype.getMiningFile = function () {
        var _this = this;
        this.profileData2 = [];
        var data = __assign({ page: this.pager.pageIndex, pageSize: this.pager.pageSize }, this._search2);
        this.api.post('api/Statistic/ReportMiningFileSearch', data).subscribe(function (res) {
            var a = JSON.parse(JSON.stringify(res));
            _this.dataSourceMiningFile = a.data;
            console.log(_this.dataSourceMiningFile);
            var datax = new Array();
            // let datay: Array<any>=new Array;
            for (var i = 0; i < _this.dataSourceMiningFile.length; i++) {
                var time = void 0;
                time = new Date(_this.dataSourceMiningFile[i].created_date_time);
                var year1 = time.getFullYear();
                // console.log(year1);
                if (year1 == _this.year) {
                    var month = time.getMonth() + 1;
                    if (_this.profileData2.length == 0) {
                        _this.profileData2.unshift({ month: month, sum: 1 });
                    }
                    else {
                        var check = true;
                        for (var i_3 = 0; i_3 < _this.profileData2.length; i_3++) {
                            if (_this.profileData2[i_3].month == month) {
                                check = true;
                                _this.profileData2[i_3].sum = _this.profileData2[i_3].sum + 1;
                                break;
                            }
                            else {
                                check = false;
                            }
                        }
                        if (check == false) {
                            _this.profileData2.unshift({ month: month, sum: 1 });
                        }
                    }
                    // this.profileData.unshift(this.dataSourceProfileDocumentBorrowed[i]);
                }
                else {
                    continue;
                }
            }
            // console.log()
            var s = 0;
            for (var j = 0; j < _this.profileData2.length; j++) {
                s += _this.profileData2[j].sum;
            }
            _this.generality.MF.unshift({ sum: s });
            console.log(_this.profileData2);
            for (var i = 1; i <= 12; i++) {
                for (var j = 0; j < _this.profileData2.length; j++) {
                    if (_this.profileData2[j].month == i) {
                        datax[i - 1] = _this.profileData2[j].sum;
                        break;
                    }
                    else {
                        if (j == _this.profileData2.length - 1) {
                            datax[i - 1] = 0;
                        }
                        else {
                            continue;
                        }
                    }
                }
            }
            // console.log(datax);
            _this.serviceData2.series[0].data = datax;
            _this.pieChart2.setOption(_this.serviceData2, true);
        });
    };
    DataAlterComponent.prototype.getPieChart3 = function (e) {
        this.pieChart3 = e;
        // console.log(e);
    };
    DataAlterComponent.prototype.getCancellationProfile = function () {
        var _this = this;
        this.profileData3 = [];
        var data = __assign({ page: this.pager.pageIndex, pageSize: this.pager.pageSize }, this._search3);
        this.api.post('api/Statistic/ReportCancellationMinutesSearch', data).subscribe(function (res) {
            var a = JSON.parse(JSON.stringify(res));
            _this.dataSourceCancellationProfile = a.data;
            console.log(_this.dataSourceCancellationProfile);
            var datax = new Array();
            // let datay: Array<any>=new Array;
            for (var i = 0; i < _this.dataSourceCancellationProfile.length; i++) {
                var time = void 0;
                time = new Date(_this.dataSourceCancellationProfile[i].created_date_time);
                var year1 = time.getFullYear();
                // console.log(year1);
                if (year1 == _this.year) {
                    var month = time.getMonth() + 1;
                    if (_this.profileData3.length == 0) {
                        _this.profileData3.unshift({ month: month, sum: 1 });
                    }
                    else {
                        var check = true;
                        for (var i_4 = 0; i_4 < _this.profileData3.length; i_4++) {
                            if (_this.profileData3[i_4].month == month) {
                                check = true;
                                _this.profileData3[i_4].sum = _this.profileData3[i_4].sum + 1;
                                break;
                            }
                            else {
                                check = false;
                            }
                        }
                        if (check == false) {
                            _this.profileData3.unshift({ month: month, sum: 1 });
                        }
                    }
                    // this.profileData.unshift(this.dataSourceProfileDocumentBorrowed[i]);
                }
                else {
                    continue;
                }
            }
            // console.log()
            var s = 0;
            for (var j = 0; j < _this.profileData3.length; j++) {
                s += _this.profileData3[j].sum;
            }
            _this.generality.CP.unshift({ sum: s });
            console.log(_this.profileData3);
            for (var i = 1; i <= 12; i++) {
                for (var j = 0; j < _this.profileData3.length; j++) {
                    if (_this.profileData3[j].month == i) {
                        datax[i - 1] = _this.profileData3[j].sum;
                        break;
                    }
                    else {
                        if (j == _this.profileData3.length - 1) {
                            datax[i - 1] = 0;
                        }
                        else {
                            continue;
                        }
                    }
                }
            }
            // console.log(datax);
            _this.serviceData3.series[0].data = datax;
            _this.pieChart3.setOption(_this.serviceData3, true);
        });
    };
    DataAlterComponent = __decorate([
        core_1.Component({
            selector: 'app-report-data-alter',
            templateUrl: './report-data-alter.component.html',
            styleUrls: ['./report-data-alter.component.scss']
        })
    ], DataAlterComponent);
    return DataAlterComponent;
}());
exports.DataAlterComponent = DataAlterComponent;
