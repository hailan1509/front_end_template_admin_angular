"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SideSettingsComponent = void 0;
var core_1 = require("@angular/core");
var da_layout_1 = require("../../layouts/da-layout");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var SideSettingsComponent = /** @class */ (function () {
    function SideSettingsComponent(clipboard, layoutService, mediaQueryService, translate) {
        var _this = this;
        this.clipboard = clipboard;
        this.layoutService = layoutService;
        this.mediaQueryService = mediaQueryService;
        this.translate = translate;
        this.destroy$ = new rxjs_1.Subject();
        this.msgs = [];
        this.sidebarNotice = {};
        this.mediaQueryService
            .getPoint()
            .pipe(operators_1.takeUntil(this.destroy$))
            .subscribe(function (_a) {
            var currentPoint = _a.currentPoint, change = _a.change, compare = _a.compare;
            _this.change = change;
            _this.compare = compare;
        });
    }
    SideSettingsComponent.prototype.refreshReactiveLayout = function () {
        /* ml：sidebar shrink breakpoint */
        if (this.change <= 0 && this.compare['ml'] <= 0) {
            this.sidebarShrink(true);
        }
        else if (this.change >= 0 && this.compare['ml'] > 0) {
            this.sidebarShrink(false);
        }
        /* mm：sidebar hidden breakpoint */
        if (this.change <= 0 && this.compare['mm'] <= 0) {
            this.sidebarFold(true);
        }
        else if (this.change >= 0 && this.compare['mm'] > 0) {
            this.sidebarFold(false);
        }
    };
    SideSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initLayoutConfig();
        if (localStorage.getItem('da-layout-id')) {
            this.layout = localStorage.getItem('da-layout-id');
        }
        else {
            this.layout = 'left-right';
        }
        this.translate
            .get('side-setting')
            .pipe(operators_1.takeUntil(this.destroy$))
            .subscribe(function (res) {
            _this.i18nValues = _this.translate.instant('side-setting');
            _this.updateI18nItems(res);
        });
        this.translate.onLangChange.pipe(operators_1.takeUntil(this.destroy$)).subscribe(function (event) {
            _this.i18nValues = _this.translate.instant('side-setting');
            _this.updateI18nItems(_this.i18nValues);
        });
    };
    SideSettingsComponent.prototype.handleLayoutClicked = function (layout) {
        this.layout = layout;
        localStorage.setItem('da-layout-id', layout);
        if (layout === 'topNav') {
            this.layoutConfig = da_layout_1.TOP_NAV_LAYOUT_CONFIG;
        }
        else if (layout === 'sidebar') {
            this.layoutConfig = da_layout_1.SIDEBAR_LAYOUT_CONFIG;
        }
        else if (layout === 'left-right') {
            this.layoutConfig = da_layout_1.LEFT_RIGHT_LAYOUT_CONFIG;
        }
        //làm mới bố cục
        this.refreshReactiveLayout();
        //sửa thành bố cục mới
        this.layoutService.updateLayoutConfig(this.layoutConfig);
        //gửi event
        window.dispatchEvent(new Event('resize'));
    };
    SideSettingsComponent.prototype.initLayoutConfig = function () {
        var _this = this;
        this.layoutService.getLayoutConfig().subscribe(function (layout) {
            _this.layoutConfig = layout;
        });
    };
    SideSettingsComponent.prototype.onCopyClicked = function () {
        var isSucceeded = false;
        var isSupported = !!document.queryCommandSupported && !!document.queryCommandSupported('copy') && !!window;
        if (isSupported) {
            isSucceeded = this.clipboard.copy(JSON.stringify(this.layoutConfig, null, 2));
            if (isSucceeded) {
                this.msgs = [
                    {
                        severity: 'success',
                        summary: this.i18nValues['copy-summary'],
                        content: this.i18nValues['copy-content']
                    },
                ];
            }
        }
    };
    SideSettingsComponent.prototype.updateLayout = function () {
        this.layoutService.updateLayoutConfig(this.layoutConfig);
        window.dispatchEvent(new Event('resize'));
    };
    SideSettingsComponent.prototype.sidebarShrink = function (isShrink) {
        if (this.layoutConfig.sidebar.firSidebar) {
            this.layoutConfig.sidebar.firSidebar.width = isShrink ? 54 : 240;
        }
        this.layoutConfig.sidebar.shrink = isShrink;
    };
    SideSettingsComponent.prototype.sidebarFold = function (isFold) {
        if (this.layoutConfig.sidebar.firSidebar) {
            this.layoutConfig.sidebar.firSidebar.hidden = isFold;
        }
    };
    SideSettingsComponent.prototype.updateI18nItems = function (values) {
        this.helpContent = values['helpContent'];
        this.sidebarNotice['canConfig'] = values['sidebar-notice']['can-config'];
        this.sidebarNotice['cannotConfig'] = values['sidebar-notice']['cannot-config'];
    };
    SideSettingsComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    __decorate([
        core_1.Input()
    ], SideSettingsComponent.prototype, "close");
    SideSettingsComponent = __decorate([
        core_1.Component({
            selector: 'da-side-settings',
            templateUrl: './side-settings.component.html',
            styleUrls: ['./side-settings.component.scss']
        })
    ], SideSettingsComponent);
    return SideSettingsComponent;
}());
exports.SideSettingsComponent = SideSettingsComponent;
