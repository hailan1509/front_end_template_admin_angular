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
exports.ReportProfileDocumentBorrowedComponent = void 0;
var core_1 = require("@angular/core");
var ReportProfileDocumentBorrowedComponent = /** @class */ (function () {
    function ReportProfileDocumentBorrowedComponent(api) {
        this.api = api;
        this.basicDataSource = [];
        this.basicDataSource2 = [];
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
            'Đang mượn',
            'Mượn quá hạn',
        ];
        this.miningFileStatusValue = {
            '--Tất cả--': null,
            'Đang mượn': 'Đang mượn',
            'Mượn quá hạn': 'Mượn quá hạn'
        };
        this.typeOfReportOptions = ['Báo cáo hồ sơ đang mượn', 'Báo cáo văn bản đang mượn'];
        this.typeOfReport = 'Báo cáo hồ sơ đang mượn';
        this.searchForm = {
            borderType: 'bordered',
            size: 'md',
            layout: 'auto'
        };
        this.dataTableOptions = {
            columns: [
                {
                    field: 'area_rcd',
                    header: 'Mã khu vực',
                    fieldType: 'text'
                },
                {
                    field: 'area_name',
                    header: 'Tên khu vực',
                    fieldType: 'text'
                },
                {
                    field: 'country_name',
                    header: 'Tên đất nước',
                    fieldType: 'text'
                },
                {
                    field: 'area_note',
                    header: 'Ghi chú',
                    fieldType: 'date'
                },
                {
                    field: 'active_flag',
                    header: 'Trạng thái',
                    fieldType: 'int'
                }
            ]
        };
        this.tableWidthConfig = [
            {
                field: '#',
                width: '50px'
            },
            {
                field: 'area_rcd',
                width: '100px'
            },
            {
                field: 'area_name',
                width: '300px'
            },
            {
                field: 'country_name',
                width: '100px'
            },
            {
                field: 'area_note',
                width: '100px'
            },
            {
                field: 'active_flag',
                width: '100px'
            },
            {
                field: 'Actions',
                width: '100px'
            },
        ];
    }
    ReportProfileDocumentBorrowedComponent.prototype.ngOnInit = function () {
        this.search();
    };
    ReportProfileDocumentBorrowedComponent.prototype.search = function () {
        console.log(this.typeOfReport);
        if (this.typeOfReport === 'Báo cáo hồ sơ đang mượn') {
            this.getListProfileBorrowed();
        }
        else {
            this.getListDocumentBorrowed();
        }
    };
    ReportProfileDocumentBorrowedComponent.prototype.getListProfileBorrowed = function () {
        var _this = this;
        var data = __assign(__assign({ page: this.pager.pageIndex, pageSize: this.pager.pageSize }, this._search), { status: this.miningFileStatusValue[this.miningFileStatus] });
        this.busy = this.api.post("api/Statistic/ReportProfileBorrowedSearch", data).subscribe(function (res) {
            var a = JSON.parse(JSON.stringify(res));
            _this.basicDataSource = a.data;
            _this.pager.total = a.totalItems;
        });
    };
    ReportProfileDocumentBorrowedComponent.prototype.getListDocumentBorrowed = function () {
        var _this = this;
        var data = __assign(__assign({ page: this.pager.pageIndex, pageSize: this.pager.pageSize }, this._search), { status: this.miningFileStatusValue[this.miningFileStatus] });
        this.busy = this.api.post("api/Statistic/ReportDocumentBorrowedSearch", data).subscribe(function (res) {
            var a = JSON.parse(JSON.stringify(res));
            _this.basicDataSource2 = a.data;
            _this.pager.total = a.totalItems;
        });
    };
    ReportProfileDocumentBorrowedComponent.prototype.reset = function () {
        this.searchForm = {
            borderType: '',
            size: 'md',
            layout: 'auto'
        };
        this.pager.pageIndex = 1;
        this.search();
    };
    ReportProfileDocumentBorrowedComponent.prototype.onPageChange = function (e) {
        this.pager.pageIndex = e;
        this.search();
    };
    ReportProfileDocumentBorrowedComponent.prototype.onSizeChange = function (e) {
        this.pager.pageSize = e;
        this.search();
    };
    ReportProfileDocumentBorrowedComponent = __decorate([
        core_1.Component({
            selector: 'app-report-profile-document-borrowed',
            templateUrl: './report-profile-document-borrowed.component.html',
            styleUrls: ['./report-profile-document-borrowed.component.scss']
        })
    ], ReportProfileDocumentBorrowedComponent);
    return ReportProfileDocumentBorrowedComponent;
}());
exports.ReportProfileDocumentBorrowedComponent = ReportProfileDocumentBorrowedComponent;
