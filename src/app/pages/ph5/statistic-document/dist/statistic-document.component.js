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
exports.StatisticDocumentComponent = void 0;
var core_1 = require("@angular/core");
var StatisticDocumentComponent = /** @class */ (function () {
    function StatisticDocumentComponent(api) {
        this.api = api;
        this.basicDataSource = [];
        this.yearNow = new Date();
        this.year = 0;
        this.dataSourceArchivalProfile = [];
        this.profileData = [];
        this.serviceData = {
            title: {
                text: "Thống kê số lượng tài liệu mỗi tháng",
                textStyle: {
                    fontFamily: 'sans-serif'
                }
            },
            xAxis: {
                type: "category",
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
            series: [{
                    data: [120, 200, 150],
                    type: "bar"
                }]
        };
        //year
        this.selectedDate1 = null;
        //  selectedDate2 = null;
        this.maxDate = new Date().setMonth(8);
        this._search = {
            document_rcd: "",
            document_number: ""
        };
        this.pager = {
            total: 0,
            pageIndex: 1,
            pageSize: 10
        };
        this.searchForm = {
            borderType: 'bordered',
            size: 'md',
            layout: 'auto'
        };
    }
    StatisticDocumentComponent.prototype.ngOnInit = function () {
        this.year = this.yearNow.getFullYear();
        this.getList();
    };
    StatisticDocumentComponent.prototype.getPieChart = function (e) {
        this.pieChart = e;
        console.log(e);
    };
    StatisticDocumentComponent.prototype.getValue = function (value) {
        if (value.selectedDate) {
            this.year = value.selectedDate.getFullYear();
            this.getList();
            //console.log(this.year);
        }
    };
    StatisticDocumentComponent.prototype.getList = function () {
        var _this = this;
        this.profileData = [];
        var data = __assign({ page: this.pager.pageIndex, pageSize: this.pager.pageSize }, this._search);
        this.api.post('api/Statistic/ReportDocumentRefSearch', data).subscribe(function (res) {
            var a = JSON.parse(JSON.stringify(res));
            _this.dataSourceArchivalProfile = a.data;
            _this.basicDataSource = _this.dataSourceArchivalProfile;
            console.log(_this.dataSourceArchivalProfile);
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
                }
                else {
                    continue;
                }
            }
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
        // this.busy = this.api.post("api/Statistic/ReportDocumentRefSearch", data).subscribe((res:any) => {
        //   let a = JSON.parse(JSON.stringify(res));
        //   this.basicDataSource = a.data;
        //   console.log(this.basicDataSource);
        // });
    };
    StatisticDocumentComponent.prototype.onPageChange = function (e) {
        this.pager.pageIndex = e;
        this.getList();
    };
    StatisticDocumentComponent.prototype.onSizeChange = function (e) {
        this.pager.pageSize = e;
        this.getList();
    };
    StatisticDocumentComponent = __decorate([
        core_1.Component({
            selector: 'app-statistic-document',
            templateUrl: './statistic-document.component.html',
            styleUrls: ['./statistic-document.component.scss']
        })
    ], StatisticDocumentComponent);
    return StatisticDocumentComponent;
}());
exports.StatisticDocumentComponent = StatisticDocumentComponent;
