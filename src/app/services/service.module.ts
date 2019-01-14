import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './service.index';
import { SharedService } from './share/shared.service';
import { SidebarService } from './share/sidebar.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService
  ],
  declarations: []
})
export class ServiceModule { }
