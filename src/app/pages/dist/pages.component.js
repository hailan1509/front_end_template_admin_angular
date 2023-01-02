"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PagesComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var side_settings_component_1 = require("../@shared/components/side-settings/side-settings.component");
var personalize_component_1 = require("../@shared/components/personalize/personalize.component");
var menu_1 = require("./menu");
var operators_1 = require("rxjs/operators");
var side_menu_component_1 = require("../@shared/components/side-menu/side-menu.component");
var PagesComponent = /** @class */ (function () {
    function PagesComponent(drawerService, dialogService, personalizeService, layoutService, translate, mediaQueryService, render2) {
        var _this = this;
        this.drawerService = drawerService;
        this.dialogService = dialogService;
        this.personalizeService = personalizeService;
        this.layoutService = layoutService;
        this.translate = translate;
        this.mediaQueryService = mediaQueryService;
        this.render2 = render2;
        this.destroy$ = new rxjs_1.Subject();
        this.layoutConfig = { id: 'sidebar', sidebar: {} };
        this.isSidebarShrink = false;
        this.isSidebarFold = false;
        this.personalizeService.initTheme();
        this.layoutService
            .getLayoutConfig()
            .pipe(operators_1.takeUntil(this.destroy$))
            .subscribe(function (config) {
            _this.layoutConfig = config;
            _this.isSidebarShrink = !!_this.layoutConfig.sidebar.shrink;
        });
        this.mediaQueryService
            .getPoint()
            .pipe(operators_1.takeUntil(this.destroy$))
            .subscribe(function (_a) {
            var currentPoint = _a.currentPoint, change = _a.change, compare = _a.compare;
            /* ml：sidebar shrink breakpoint */
            if (change <= 0 && compare['ml'] <= 0) {
                _this.sidebarShrink(true);
            }
            else if (change >= 0 && compare['ml'] > 0) {
                _this.sidebarShrink(false);
            }
            /* mm：sidebar hidden breakpoint */
            if (change <= 0 && compare['mm'] <= 0) {
                _this.sidebarFold(true);
            }
            else if (change >= 0 && compare['mm'] > 0) {
                _this.sidebarFold(false);
            }
        });
    }
    PagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.translate
            .get('page')
            .pipe(operators_1.takeUntil(this.destroy$))
            .subscribe(function (res) {
            console.log(res);
            _this.updateMenu(res);
        });
        this.translate.onLangChange.pipe(operators_1.takeUntil(this.destroy$)).subscribe(function (event) {
            var values = _this.translate.instant('page');
            _this.updateMenu(values);
        });
        this.personalizeService.getUiTheme().subscribe(function (theme) {
            var currentTheme = Object.values(window['devuiThemes']).find(function (i) {
                return i.id === theme;
            });
            if (currentTheme && currentTheme.isDark) {
                _this.render2.addClass(document.body, 'is-dark');
            }
            else {
                _this.render2.removeClass(document.body, 'is-dark');
            }
        });
    };
    PagesComponent.prototype.updateMenu = function (values) {
        var menu_object = {
            dashboard: {
                title: "Dashboard"
            },
            PH1: {
                title: "Quản lý hồ sơ",
                qlhsccl: "Quản lý hồ sơ chờ chỉnh lý",
                bshs: "Bổ sung hồ sơ",
                qlhsdcl: "Quản lý hồ sơ đã chỉnh lý",
                tchs: "Tra cứu hồ sơ",
                tctl: "Tra cứu  tài liệu",
                ihstf: "Import hồ sơ từ file",
                itltf: "Import tài liệu từ file"
            },
            PH2: {
                title: "Quản lý bàn giao hồ sơ",
                lbbbg: "Lập biên bản bàn giao",
                qlbbbg: "Quản lý biên bản bàn giao",
                qlhsdbg: "Quản lý hồ sơ đã bàn giao"
            },
            PH3: {
                title: "Quản lý hủy hồ sơ",
                qlhsch: "Quản lý hồ sơ chờ hủy",
                lbbbghtl: "Lập biên bản bàn giao hủy tài liệu",
                qlbbbghtl: "Quản lý biên bản bàn giao hủy tài liệu",
                lbbthtl: "Lập biên bản tiêu hủy tài liệu",
                qlbbthhtl: "Quản lý biên bản tiêu hủy tài liệu"
            },
            PH4: {
                title: "Quản lý khai thác hồ sơ",
                lpkths: "Lập phiếu khai thác hồ sơ",
                qlpkths: "Quản lý phiếu khai thác hồ sơ",
                dpkths: "Duyệt phiếu khai thác hồ sơ",
                qlsmhs: "Quản lý sổ mượn hồ sơ",
                qltlmqh: "Quản lý tài liệu mượn quá hạn",
                tkslnkttl: "Thống kê số lượng người khai thác tài liệu",
                tkslnkths: "Thống kê số lượng người khai thác hồ sơ",
                bctklspd: "Báo cáo thông kê"
            },
            PH5: {
                title: "Báo cáo thống kê",
                bcdlskdn: "Cảnh báo dữ liệu sau khi đăng nhập",
                bchslt: "Báo cáo hồ sơ lưu trữ",
                bchsh: "Báo cáo hồ sơ hủy",
                bcpkt: "Báo cáo phiếu khai thác",
                bchstldm: "Báo cáo hồ sơ, tài liệu đang mượn",
                tkhsdvlt: "Thống kê hồ sơ đưa vào lưu trữ",
                tkslhstn: "Thống kê số lượng hồ sơ theo năm",
                tksltltn: "Thống kê số lượng tài liệu theo năm",
                tkbctvsh: "Thống kê, báo cáo tác vụ số hóa",
                bcdmvbctlhs: "Báo cáo danh mục văn bản có trong loại hồ sơ"
            }
        };
        this.menu = menu_1["default"](menu_object);
    };
    PagesComponent.prototype.openSideMenuDrawer = function () {
        this.drawerService.open({
            drawerContentComponent: side_menu_component_1.SideMenuComponent,
            width: '240px',
            position: 'left' /* TODO: if destroyOnHide is false, there has some problem, waiting ng-devui bug fix*/,
            // destroyOnHide: false,
            data: {
                data: this.menu
            }
        });
    };
    PagesComponent.prototype.openSettingDrawer = function () {
        var _this = this;
        if (this.settingDrawer) {
            this.settingDrawer.drawerInstance.show();
        }
        else {
            this.settingDrawer = this.drawerService.open({
                drawerContentComponent: side_settings_component_1.SideSettingsComponent,
                width: '350px',
                destroyOnHide: false,
                data: {
                    close: function () {
                        _this.settingDrawer.drawerInstance.hide();
                    }
                }
            });
        }
    };
    PagesComponent.prototype.personalizeConfig = function () {
        this.dialogService.open({
            id: 'theme',
            width: '800px',
            maxHeight: '800px',
            title: '',
            content: personalize_component_1.PersonalizeComponent,
            backdropCloseable: true,
            draggable: false,
            onClose: function () { },
            buttons: []
        });
    };
    PagesComponent.prototype.sidebarShrink = function (isShrink) {
        this.isSidebarShrink = isShrink;
        if (this.layoutConfig.sidebar.firSidebar) {
            this.layoutConfig.sidebar.firSidebar.width = this.isSidebarShrink ? 54 : 240;
        }
        this.layoutConfig.sidebar.shrink = this.isSidebarShrink;
        this.layoutService.updateLayoutConfig(this.layoutConfig);
    };
    PagesComponent.prototype.sidebarFold = function (isFold) {
        this.isSidebarFold = isFold;
        if (this.layoutConfig.sidebar.firSidebar) {
            this.layoutConfig.sidebar.firSidebar.hidden = isFold;
            this.layoutService.updateLayoutConfig(this.layoutConfig);
        }
    };
    PagesComponent.prototype.destroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
        this.settingDrawer.drawerInstance.destroy();
        this.settingDrawer = null;
    };
    PagesComponent = __decorate([
        core_1.Component({
            selector: 'da-pages',
            templateUrl: './pages.component.html',
            styleUrls: ['./pages.component.scss']
        })
    ], PagesComponent);
    return PagesComponent;
}());
exports.PagesComponent = PagesComponent;
