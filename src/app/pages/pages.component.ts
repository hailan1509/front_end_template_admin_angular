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
        /* ml???sidebar shrink breakpoint */
        if (change <= 0 && compare['ml'] <= 0) {
          this.sidebarShrink(true);
        } else if (change >= 0 && compare['ml'] > 0) {
          this.sidebarShrink(false);
        }

        /* mm???sidebar hidden breakpoint */
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
        title: "Qu???n l?? h??? s??",
        qlhsccl : "Qu???n l?? h??? s??",
        bshs : "B??? sung h??? s??",
        qlhsdcl : "Qu???n l?? h??? s??",
        tchs : "Tra c???u h??? s??",
        tctl : "Tra c???u  t??i li???u",
        ihstf : "Import h??? s?? t??? file",
        itltf : "Import t??i li???u t??? file",
      },
      PH2 : {
        title : "Qu???n l?? b??n giao h??? s??",
        lbbbg : "L???p bi??n b???n b??n giao",
        qlbbbg : "Qu???n l?? bi??n b???n b??n giao",
        qlhsdbg : "Qu???n l?? h??? s?? ???? b??n giao"
      },
      PH3 : {
        title : "Qu???n l?? h???y h??? s??",
        qlhsch : "Qu???n l?? h??? s?? ch??? h???y",
        lbbbghtl : "L???p bi??n b???n b??n giao h???y t??i li???u",
        qlbbbghtl : "Qu???n l?? bi??n b???n b??n giao h???y t??i li???u",
        lbbthtl : "L???p bi??n b???n ti??u h???y t??i li???u",
        bbthtlcd :"Bi??n b???n ti??u h???y t??i li???u ch??? duy???t",
        qlbbthtl : "Qu???n l?? bi??n b???n ti??u h???y t??i li???u",
        qlhsdh: "Qu???n l?? h??? s?? ???? h???y",
      },
      PH4 : {
        title : "Qu???n l?? khai th??c h??? s??",
        lpkths : "L???p phi???u khai th??c h??? s??",
        qlpkths : "Qu???n l?? phi???u khai th??c h??? s??",
        dpkths : "Duy???t phi???u khai th??c h??? s??",
        qlsmhs : "Qu???n l?? s??? m?????n h??? s??",
        qltlmqh : "Qu???n l?? t??i li???u m?????n qu?? h???n",
        tkslnkttl : "Th???ng k?? s??? l?????ng ng?????i khai th??c t??i li???u",
        tkslnkths : "Th???ng k?? s??? l?????ng ng?????i khai th??c h??? s??",
        bctklspd : "B??o c??o th??ng k??"
      },

      PH6 : {
        title : "Qu???n tr??? h??? th???ng",
        qlndnb : "Qu???n l?? ng?????i d??ng n???i b???",
        qlnnd : "Qu???n l?? nh??m ng?????i d??ng",
        qlvt : "Qu???n l?? vai tr??",
        qlpb : "Qu???n l?? ph??ng ban",
        qlnk : "Qu???n l?? nh???t k??, ghi log h??? th???ng",     
      },

      PH7 : {
        title : "Qu???n l?? danh m???c",
        qllv : "Qu???n l?? l??nh v???c",
        qlhsvb : "Qu???n l?? h??? s??, v??n b???n",
        qllhsvb : "Qu???n l?? lo???i h??? s??, v??n b???n",
        qlcqbh : "Qu???n l?? c?? quan ban h??nh",
        qldm : "Qu???n l?? ????? m???t",
        thvcdc : "T??ch h???p v???i CSDL d??ng chung",
        qlplt : "Qu???n l?? Ph??ng l??u tr???",
        qlklt : "Qu???n l?? kho l??u tr???",
        qlthlt : "Qu???n l?? th???i h???n l??u tr???",
        qlttvl : "Qu???n l?? t??nh tr???ng v???t l??",
        qlmdkt : "Qu???n l?? M???c ????ch khai th??c",
        qlskt : "Qu???n l?? s??? khai th??c",
       },
      PH5 : {
        title: "B??o c??o th???ng k??",
        bcdlskdn: "C???nh b??o d??? li???u sau khi ????ng nh???p",
        bchslt : "B??o c??o h??? s?? l??u tr???",
        bchsh : "B??o c??o h??? s?? h???y",
        bcpkt : "B??o c??o phi???u khai th??c",
        bchstldm : "B??o c??o h??? s??, t??i li???u ??ang m?????n",
        tkhsdvlt : "Th???ng k?? h??? s?? ????a v??o l??u tr???",
        tkslhstn : "Th???ng k?? s??? l?????ng h??? s?? theo n??m",
        tksltltn : "Th???ng k?? s??? l?????ng t??i li???u theo n??m",
        tkbctvsh : "Th???ng k??, b??o c??o t??c v??? s??? h??a",
        bcdmvbctlhs : "B??o c??o danh m???c v??n b???n c?? trong lo???i h??? s??"
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
