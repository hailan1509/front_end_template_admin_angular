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
exports.ReportArchivalProfileComponent = void 0;
var core_1 = require("@angular/core");
var ReportArchivalProfileComponent = /** @class */ (function () {
    function ReportArchivalProfileComponent(api) {
        this.api = api;
        this.basicDataSource = [];
        this._search = {
            borrowed_date: null,
            return_date: null,
            staff_name: '',
            mining_purpose: null,
            status: null
        };
        this.pager = {
            total: 0,
            pageIndex: 1,
            pageSize: 10
        };
        this.miningFileStatus = '--Tất cả---';
        this.miningFileStatusOptions = [
            '--Tất cả---',
            'Chờ xét duyệt',
            'Đã duyệt',
            'Từ chối'
        ];
        this.miningFileStatusValue = {
            '--Tất cả--': null,
            'Chờ xét duyệt': 0,
            'Đã duyệt': 1,
            'Từ chối': 2
        };
        this.searchForm = {
            borderType: 'bordered',
            size: 'md',
            layout: 'auto'
        };
    }
    ReportArchivalProfileComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    ReportArchivalProfileComponent.prototype.search = function () {
        this.getList();
    };
    ReportArchivalProfileComponent.prototype.getList = function () {
        var _this = this;
        var data = __assign(__assign({ page: this.pager.pageIndex, pageSize: this.pager.pageSize }, this._search), { status: this.miningFileStatusValue[this.miningFileStatus] });
        this.busy = this.api.post("api/Statistic/ReportMiningFileSearch", data).subscribe(function (res) {
            var a = JSON.parse(JSON.stringify(res));
            _this.basicDataSource = a.data;
            _this.pager.total = a.totalItems;
        });
    };
    ReportArchivalProfileComponent.prototype.reset = function () {
        this.searchForm = {
            borderType: '',
            size: 'md',
            layout: 'auto'
        };
        this.pager.pageIndex = 1;
        this.getList();
    };
    ReportArchivalProfileComponent.prototype.onPageChange = function (e) {
        this.pager.pageIndex = e;
        this.getList();
    };
    ReportArchivalProfileComponent.prototype.onSizeChange = function (e) {
        this.pager.pageSize = e;
        this.getList();
    };
    ReportArchivalProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-report-archival-profile',
            templateUrl: './report-archival-profile.component.html',
            styleUrls: ['./report-archival-profile.component.scss']
        })
    ], ReportArchivalProfileComponent);
    return ReportArchivalProfileComponent;
}());
exports.ReportArchivalProfileComponent = ReportArchivalProfileComponent;
