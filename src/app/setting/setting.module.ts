import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { SettingRoutingModule } from "./setting-routing.module";
import { SettingComponent } from "./components/setting.component";

@NgModule({
  declarations: [SettingComponent],
  imports: [CommonModule, SettingRoutingModule, SharedModule]
})
export class SettingModule {}
