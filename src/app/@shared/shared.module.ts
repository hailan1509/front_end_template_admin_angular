import { CancellationMinutesStatusPipe } from './pipe/cancellation-minutes-status.pipe';
import {ParseSelectPipe} from './pipe/parseFromPipe.pipe';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {
  LayoutModule,
  AccordionModule,
  SearchModule,
  AvatarModule,
  BadgeModule,
  DropDownModule,
  FormModule,
  TabsModule,
  TextInputModule,
  ToggleModule,
  CheckBoxModule,
  ButtonModule,
  DrawerModule,
  DCommonModule,
  AlertModule,
  ToastModule,
  TooltipModule,
  RadioModule,
  CardModule,
  DataTableModule,
  BreadcrumbModule,
  TagsModule,
  SelectModule,
  LoadingModule,
  ModalModule,
} from 'ng-devui';
import { I18nModule } from 'ng-devui/i18n';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SideSettingsComponent } from './components/side-settings/side-settings.component';
import { PersonalizeComponent } from './components/personalize/personalize.component';
import { HeaderOperationComponent } from './components/header/header-operation/header-operation.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { HeaderLogoComponent } from './components/header/header-logo/header-logo.component';
import { DaGridModule } from './layouts/da-grid';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderNoticeComponent } from './components/header/header-operation/header-notice/header-notice.component';

import { MiningFileStatusPipe } from './pipe/mining-file-status.pipe';
import { ProfileStatusPipe } from './pipe/profile-status.pipe';
import { FormUploadComponent } from './components/form-upload/form-upload.component';
import {
  AutoCompletePopupComponent,
  DatepickerComponent,
  DragPreviewComponent,
  DrawerComponent,
  InputNumberComponent,
  LoadingBackdropComponent,
  LoadingComponent,
  ModalComponent,
  ModalContainerComponent,
  PopoverComponent,
  ReadTipComponent,
  SelectComponent,
  StepsGuideComponent,
  ToastComponent,
  TooltipComponent,
  TreeSelectComponent
} from "ng-devui";
import { DevUIModule } from "ng-devui";
import { ProfilePermissionComponent } from './components/modals/profile-permission/profile-permission.component';

const DEVUI_MODULES = [
  LayoutModule,
  AccordionModule,
  SearchModule,
  AvatarModule,
  BadgeModule,
  DropDownModule,
  FormModule,
  TabsModule,
  TextInputModule,
  ToggleModule,
  CheckBoxModule,
  ButtonModule,
  DrawerModule,
  CardModule,
  DataTableModule,
  BreadcrumbModule,
  TagsModule,
  SelectModule,
  RadioModule,
  LoadingModule,
  ModalModule,
];
const COMPONENTS = [HeaderComponent, FooterComponent, NavbarComponent, PersonalizeComponent];
const PIPES = [MiningFileStatusPipe, ProfileStatusPipe, CancellationMinutesStatusPipe, ParseSelectPipe]
@NgModule({
  declarations: [
    LoginComponent,
    SideSettingsComponent,
    HeaderOperationComponent,
    HeaderLogoComponent,
    SideMenuComponent,
    HeaderNoticeComponent,
    RegisterComponent,
    ...COMPONENTS,
    ...PIPES,
    FormUploadComponent,
    ProfilePermissionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    DCommonModule,
    AlertModule,
    ClipboardModule,
    ToastModule,
    TooltipModule,
    I18nModule,
    DaGridModule,
    DevUIModule,
    TranslateModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    HeaderLogoComponent,
    HeaderOperationComponent,
    I18nModule,
    DaGridModule,
    SideMenuComponent,
    ...DEVUI_MODULES,
    ...COMPONENTS,
    ...PIPES
  ],
  entryComponents: [
    AutoCompletePopupComponent,
    DatepickerComponent,
    DragPreviewComponent,
    DrawerComponent,
    InputNumberComponent,
    LoadingBackdropComponent,
    LoadingComponent,
    ModalComponent,
    ModalContainerComponent,
    PopoverComponent,
    ReadTipComponent,
    SelectComponent,
    StepsGuideComponent,
    ToastComponent,
    TooltipComponent,
    TreeSelectComponent,
  ],
  bootstrap: [ FormUploadComponent ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
