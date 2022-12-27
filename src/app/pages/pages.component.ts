import { Component, OnInit, Renderer2 } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import { DrawerService, IDrawerOpenResult } from 'ng-devui/drawer';
import { Subject } from 'rxjs';
import { SideSettingsComponent } from '../@shared/components/side-settings/side-settings.component';
import { PersonalizeComponent } from '../@shared/components/personalize/personalize.component';
import { PersonalizeService } from '../@core/services/personalize.service';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DaLayoutConfig, DaLayoutService } from '../@shared/layouts/da-layout';
import getMenu from './menu';
import { DaScreenMediaQueryService } from '../@shared/layouts/da-grid';
import { takeUntil } from 'rxjs/operators';
import { SideMenuComponent } from '../@shared/components/side-menu/side-menu.component';
import { Theme } from 'ng-devui/theme';

@Component({
  selector: 'da-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  private destroy$ = new Subject();

  menu: any;

  layoutConfig: DaLayoutConfig = { id: 'sidebar', sidebar: {} };
  isSidebarShrink: boolean = false;
  isSidebarFold: boolean = false;

  settingDrawer: any;

  constructor(
    private drawerService: DrawerService,
    private dialogService: DialogService,
    private personalizeService: PersonalizeService,
    private layoutService: DaLayoutService,
    private translate: TranslateService,
    private mediaQueryService: DaScreenMediaQueryService,
    private render2: Renderer2
  ) {
    this.personalizeService.initTheme();
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: DaLayoutConfig) => {
        this.layoutConfig = config;
        this.isSidebarShrink = !!this.layoutConfig.sidebar.shrink;
      });

    this.mediaQueryService
      .getPoint()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ currentPoint, change, compare }) => {
        /* ml：sidebar shrink breakpoint */
        if (change <= 0 && compare['ml'] <= 0) {
          this.sidebarShrink(true);
        } else if (change >= 0 && compare['ml'] > 0) {
          this.sidebarShrink(false);
        }

        /* mm：sidebar hidden breakpoint */
        if (change <= 0 && compare['mm'] <= 0) {
          this.sidebarFold(true);
        } else if (change >= 0 && compare['mm'] > 0) {
          this.sidebarFold(false);
        }
      });
  }

  ngOnInit() {
    this.translate
      .get('page')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
        this.updateMenu(res);
      });

    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: TranslationChangeEvent) => {
      const values = this.translate.instant('page');
      this.updateMenu(values);
    });
    this.personalizeService.getUiTheme()!.subscribe((theme) => {
      const currentTheme = Object.values((window as { [key: string]: any })['devuiThemes']).find((i: Theme | unknown) => {
        return (i as Theme).id === theme;
      });
      if (currentTheme && (<any>currentTheme).isDark) {
        this.render2.addClass(document.body, 'is-dark');
      } else {
        this.render2.removeClass(document.body, 'is-dark');
      }
    });
  }

  updateMenu(values: any) {
    let menu_object = {
      dashboard : {
        title: "Dashboard"
      },
      PH1 : {
        title: "Quản lý hồ sơ",
        qlhsccl : "Quản lý hồ sơ chờ chỉnh lý",
        bshs : "Bổ sung hồ sơ",
        qlhsdcl : "Quản lý hồ sơ đã chỉnh lý",
        tchs : "Tra cứu hồ sơ",
        tctl : "Tra cứu  tài liệu",
        ihstf : "Import hồ sơ từ file",
        itltf : "Import tài liệu từ file",
      },
      PH2 : {
        title : "Quản lý bàn giao hồ sơ",
        lbbbg : "Lập biên bản bàn giao",
        qlbbbg : "Quản lý biên bản bàn giao",
        qlhsdbg : "Quản lý hồ sơ đã bàn giao"
      },
      PH3 : {
        title : "Quản lý hủy hồ sơ",
        qlhsch : "Quản lý hồ sơ chờ hủy",
        lbbbghtl : "Lập biên bản bàn giao hủy tài liệu",
        qlbbbghtl : "Quản lý biên bản bàn giao hủy tài liệu",
        lbbthtl : "Lập biên bản tiêu hủy tài liệu",
        bbthtlcd :"Biên bản tiêu hủy tài liệu chờ duyệt",
        qlbbthtl : "Quản lý biên bản tiêu hủy tài liệu",
        qlhsdh: "Quản lý hồ sơ đã hủy",
      },
      PH4 : {
        title : "Quản lý khai thác hồ sơ",
        lpkths : "Lập phiếu khai thác hồ sơ",
        qlpkths : "Quản lý phiếu khai thác hồ sơ",
        dpkths : "Duyệt phiếu khai thác hồ sơ",
        qlsmhs : "Quản lý sổ mượn hồ sơ",
        qltlmqh : "Quản lý tài liệu mượn quá hạn",
        tkslnkttl : "Thống kê số lượng người khai thác tài liệu",
        tkslnkths : "Thống kê số lượng người khai thác hồ sơ",
        bctklspd : "Báo cáo thông kê"
      },

      PH6 : {
        title : "Quản trị hệ thống",
        qlndnb : "Quản lý người dùng nội bộ",
        qlnnd : "Quản lý nhóm người dùng",
        qlvt : "Quản lý vai trò",
        qlpb : "Quản lý phòng ban",
        qlnk : "Quản lý nhật ký, ghi log hệ thống",     
      },

      PH7 : {
        title : "Quản lý danh mục",
        qllv : "Quản lý lĩnh vực",
        qlhsvb : "Quản lý hồ sơ, văn bản",
        qllhsvb : "Quản lý loại hồ sơ, văn bản",
        qlcqbh : "Quản lý cơ quan ban hành",
        qldm : "Quản lý độ mật",
        thvcdc : "Tích hợp với CSDL dùng chung",
        qlplt : "Quản lý Phông lưu trữ",
        qlklt : "Quản lý kho lưu trữ",
        qlthlt : "Quản lý thời hạn lưu trữ",
        qlttvl : "Quản lý tình trạng vật lý",
        qlmdkt : "Quản lý Mục đích khai thác",
        qlskt : "Quản lý sổ khai thác",
       },
      PH5 : {
        title: "Báo cáo thống kê",
        bcdlskdn: "Cảnh báo dữ liệu sau khi đăng nhập",
        bchslt : "Báo cáo hồ sơ lưu trữ",
        bchsh : "Báo cáo hồ sơ hủy",
        bcpkt : "Báo cáo phiếu khai thác",
        bchstldm : "Báo cáo hồ sơ, tài liệu đang mượn",
        tkhsdvlt : "Thống kê hồ sơ đưa vào lưu trữ",
        tkslhstn : "Thống kê số lượng hồ sơ theo năm",
        tksltltn : "Thống kê số lượng tài liệu theo năm",
        tkbctvsh : "Thống kê, báo cáo tác vụ số hóa",
        bcdmvbctlhs : "Báo cáo danh mục văn bản có trong loại hồ sơ"
      }
    };
    this.menu = getMenu(menu_object);
  }

  openSideMenuDrawer() {
    this.drawerService.open({
      drawerContentComponent: SideMenuComponent,
      width: '240px',
      position: 'left' /* TODO: if destroyOnHide is false, there has some problem, waiting ng-devui bug fix*/,
      // destroyOnHide: false,
      data: {
        data: this.menu,
      },
    });
  }

  openSettingDrawer() {
    if (this.settingDrawer) {
      this.settingDrawer.drawerInstance.show();
    } else {
      this.settingDrawer = this.drawerService.open({
        drawerContentComponent: SideSettingsComponent,
        width: '350px',
        destroyOnHide: false,
        data: {
          close: () => {
            this.settingDrawer.drawerInstance.hide();
          },
        },
      });
    }
  }

  personalizeConfig() {
    this.dialogService.open({
      id: 'theme',
      width: '800px',
      maxHeight: '800px',
      title: '',
      content: PersonalizeComponent,
      backdropCloseable: true,
      draggable: false,
      onClose: () => {},
      buttons: [],
    });
  }

  sidebarShrink(isShrink: boolean) {
    this.isSidebarShrink = isShrink;

    if (this.layoutConfig.sidebar.firSidebar) {
      this.layoutConfig.sidebar.firSidebar.width = this.isSidebarShrink ? 54 : 240;
    }
    this.layoutConfig.sidebar.shrink = this.isSidebarShrink;
    this.layoutService.updateLayoutConfig(this.layoutConfig);
  }

  sidebarFold(isFold: boolean) {
    this.isSidebarFold = isFold;

    if (this.layoutConfig.sidebar.firSidebar) {
      this.layoutConfig.sidebar.firSidebar.hidden = isFold;
      this.layoutService.updateLayoutConfig(this.layoutConfig);
    }
  }

  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.settingDrawer.drawerInstance.destroy();
    this.settingDrawer = null;
  }
}
